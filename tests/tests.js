describe("Тесты на сайт \"Решение комплексных уравнений\"", function() {

  function countInArray(value, array) {
    return array.filter(n => Complex.areEqual(n, value)).length;
  }

  function assertThatArraysAreEqual(result, expecting) {
    assert.equal(result.length, expecting.length, "Количество решений неверно");

    result.forEach(item => {
      assert.equal(
        countInArray(item, result), 
        countInArray(item, expecting),
        "Как минимум одно из решений не сходится"
      );
    });
  }

  function random() {
    return Math.round( Math.random() * 10000 - 5000 );
  }

  describe("Комплексные числа", function() {
    
    it("Вычисление аргумента комплексного числа", function() {
      assert.equal(new Complex(0, 11).Arg, Math.PI / 2);
      assert.equal(new Complex(0, -100).Arg, -Math.PI / 2);
  
      assert.equal(new Complex(117, -1).Arg, Math.atan(-1 / 117));
  
      assert.equal(new Complex(-708, 19).Arg, Math.PI + Math.atan(-19 / 708));
      assert.equal(new Complex(-78, -13).Arg, -Math.PI + Math.atan(13 / 78));
    });
  
    it("Сложение комплексных чисел", function() {
      const n1 = new Complex(1, 3);
      const n2 = new Complex(4, -5);
  
      assert.deepEqual(Complex.sum(n1, n2), new Complex(5, -2));
    });
  
    it("Вычитание комплексных чисел", function() {
      const n1 = new Complex(-2, 1);
      const n2 = new Complex(Math.sqrt(3), 5);
  
      assert.deepEqual(Complex.sum(n1, n2.min()), new Complex(-2 - Math.sqrt(3), -4));
      assert.deepEqual(Complex.sum(n2, n1.min()), new Complex(2 + Math.sqrt(3), 4));
    });
  
    it("Произведение комплексных чисел", function() {
      const n1 = new Complex(1, -1);
      const n2 = new Complex(3, 6);
  
      assert.deepEqual(Complex.mult(n1, n2), new Complex(9, 3));
    });
  
    it("Деление комплексных чисел", function() {
      let n1 = new Complex(13, 1);
      let n2 = new Complex(7, -6);
  
      assert.deepEqual(Complex.div(n1, n2), new Complex(1, 1));
  
      n1 = new Complex(1);
      n2 = new Complex(Math.sqrt(3), 1);
  
      assert.deepEqual(Complex.div(n1, n2).round(), new Complex(Math.sqrt(3) / 4, -1 / 4).round());
    });
  
    it("Возведение в степень комплексных чисел", function() {
      const n = new Complex(2, -Math.sqrt(3));
  
      assert.deepEqual(n.pow(10).round(), new Complex(11041, -7316 * Math.sqrt(3)).round());
    });
  
    it("Комплексный корень", function() {
      const expecting = [ 
        new Complex(1), 
        new Complex(-1 / 2, Math.sqrt(3) / 2), 
        new Complex(-1 / 2, -Math.sqrt(3) / 2) 
      ];
      const result = Complex.takeRoot(new Complex(1), 3);

      assertThatArraysAreEqual(result, expecting);
    });
  
  });

  describe("Комплексные уравнения", function() {
    
    describe("...второй степени", function() {

      function testEquation(r0, r1, r2, ...answers) {
        const result = solveComplexEquation2(
          new Complex(r0), new Complex(r1), new Complex(r2)
        );

        const expecting = answers.map(answer => {
          return typeof answer == 'object' ? answer : new Complex(answer);
        });
        
        assertThatArraysAreEqual(result, expecting);
      }

      it("Положительный дискриминант", function() {
        testEquation(6, 11, -35, 5 / 3, -7 / 2);
        testEquation(2, -4, -2, 1 + Math.sqrt(2), 1 - Math.sqrt(2));
        testEquation(-4, -7, 12, (-7 + Math.sqrt(241)) / 8, (-7 - Math.sqrt(241)) / 8);
      });

      it("Дискриминант равный нулю", function() {
        testEquation(1, 2, 1, -1, -1);
        testEquation(1, -2, 1, 1, 1);
        testEquation(1, -6, 9, 3, 3);
        testEquation(3, -6 / 17, 3 / 289, 1 / 17, 1 / 17);
      });

      it("Отрицательный дискриминант", function() {
        testEquation(1, 1, 9, new Complex(-1 / 2, Math.sqrt(35) / 2), new Complex(-1 / 2, -Math.sqrt(35) / 2));
      });

      it("Рандомные тесты с действительными коэффициентами", function() {

        name: for (let i = 0; i < 100000; i++) {
          const r0 = new Complex( random() );
          if (r0.re == 0) {
            continue name;
          }
          const r1 = new Complex( random() );
          const r2 = new Complex( random() );
          
          const result = solveComplexEquation2(r0, r1, r2);
          
          result.forEach(ans => {
            assert.equal(
              Complex.sum( Complex.mult(r0, ans.pow(2)), Complex.mult(r1, ans), r2 ),
              0
            );
          });
        }

      });

      it("Рандомные тесты с комплексными коэффициентами", function() {

        for (let i = 0; i < 100000; i++) {
          const r0 = new Complex( random(), random() );
          if (r0.round() == new Complex(0)) {
            continue;
          }
          const r1 = new Complex( random(), random() );
          const r2 = new Complex( random(), random() );

          const result = solveComplexEquation2(r0, r1, r2);
          
          result.forEach(ans => {
            assert.equal(
              Complex.sum( Complex.mult(r0, ans.pow(2)), Complex.mult(r1, ans), r2 ),
              0
            );
          });
        }

      });

    });

    describe("...третьей степени", function() {

      function testEquation(r0, r1, r2, r3, ...answers) {
        const result = solveComplexEquation3(
          new Complex(r0), new Complex(r1), new Complex(r2), new Complex(r3)
        );

        const expecting = answers.map(answer => {
          return typeof answer == 'object' ? answer : new Complex(answer);
        });
        
        assertThatArraysAreEqual(result, expecting);
      }

      it("Дискриминант равный нулю", function() {
        testEquation(1, 0, -12, 16, -4, 2, 2);
        testEquation(1, -5, 7, -3, 1, 1, 3);
      });

      it("Отрицательный дискриминант", function() {
        testEquation(1, -7, 14, -8, 1, 2, 4);
        testEquation(2, -5, -2, 2, -0.7320508076, 2.7320508076, 0.5);
        testEquation(5, -8, -8, 5, -1, 0.46933761, 2.13066238);
        testEquation(1, -3, -13, 15, -3, 1, 5);
        testEquation(1, 1, -4, -4, -2, -1, 2);
      });

      it("Положительный дискриминант", function() {
        let n;
        
        n = new Complex(-1.5, Math.sqrt(3) / 2);
        testEquation(1, 4, 6, 3, -1, n, n.conjugate());

        n = new Complex(-1.62996052, 1.09112364);
        testEquation(1, 3, 3, -1, 0.25992105, n, n.conjugate());

        n = new Complex(-2.07721735, 1.86579517);
        testEquation(1, 3, 3, -9, 1.15443469, n, n.conjugate());

        n = new Complex(-2.72112479, 1.24902477);
        testEquation(1, 6, 12, 5, -0.55775043, n, n.conjugate());

        n = new Complex(-0.5, 1.93649167);
        testEquation(1, 0, 3, -4, 1, n, n.conjugate());

        n = new Complex(-0.5, 1.32287566);
        testEquation(1, 0, 1, -2, 1, n, n.conjugate());

        n = new Complex(-0.23278562, 0.79255199);
        testEquation(1, -1, 0, -1, 1.46557123, n, n.conjugate());
      });

      /*it("Рандомные тесты с действительными коэффициентами", function() {

        name: for (let i = 0; i < 100000; i++) {
          const r0 = new Complex( random() );
          if (r0.re == 0) {
            continue name;
          }
          const r1 = new Complex( random() );
          const r2 = new Complex( random() );
          const r3 = new Complex( random() );
          
          const result = solveComplexEquation3(r0, r1, r2, r3);
          
          result.forEach(ans => {
            assert.equal(
              Complex.sum( Complex.mult(r0, ans.pow(3)), Complex.mult(r1, ans.pow(2)), Complex.mult(r2, ans), r3 ).round(2),
              0,
              Complex.sum( Complex.mult(r0, ans.pow(3)), Complex.mult(r1, ans.pow(2)), Complex.mult(r2, ans), r3 ).round(2) + `  ${r0} ${r1} ${r2} ${r3}`
            );
          });
        }

      });*/

    });

  });

});

console.log(typeof new Complex());
console.log(typeof new Complex() == 'object');