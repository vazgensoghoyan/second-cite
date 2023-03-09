function solveComplexEquation4(a, b, c, d, e) {
    const A = Complex.div(b, a);
    const B = Complex.div(c, a);
    const C = Complex.div(d, a);
    const D = Complex.div(e, a);

    const m = Complex.sum(B, Complex.mult(new Complex(-3/8), A.pow(2)));
    const n = Complex.sum(C, Complex.mult(Complex.mult(A, B), new Complex(-1/2)), Complex.div(A.pow(3), new Complex(8)));
    const p = Complex.sum(
        D, 
        Complex.div(Complex.mult(A, C), new Complex(-4)), 
        Complex.div(Complex.mult(A.pow(2), B), new Complex(16)), 
        Complex.mult(new Complex(-3/256), A.pow(4))
    );
    const shift = Complex.div(A, new Complex(-4));

    if (m.re == 0 & m.im == 0 & n.re == 0 & n.im == 0 & p.re == 0 & p.im == 0) {
        return [shift, shift, shift, shift];
    }

    const cubicAnswers = solveComplexEquation3(
        new Complex(1), 
        m, 
        Complex.sum(Complex.div(m.pow(2), new Complex(4)), p.min()), Complex.div(n.pow(2), new Complex(-8))
    );
    
    let t = new Complex();
    cubicAnswers.every(i => {
        if (i.re != 0 | i.im != 0) {
            t = i;
            return false;
        }
        return true;
    });

    const s = Complex.takeRoot(Complex.mult(new Complex(2), t), 2)[0];

    const one = solveComplexEquation2(new Complex(1), s.min(), Complex.sum(Complex.div(m, new Complex(2)), t, Complex.div(n, Complex.mult(new Complex(2), s))));
    const two = solveComplexEquation2(new Complex(1), s, Complex.sum(Complex.div(m, new Complex(2)), t, Complex.div(n, Complex.mult(new Complex(-2), s))));
    
    let answers = [...one, ...two];
    for (var i = 0; i < answers.length; i++) {
        answers[i] = Complex.sum(answers[i], shift);
    }
    
    return answers;
}

/*console.log(solveComplexEquation4(
    stringToComplex("1"), 
    stringToComplex("1+i"), 
    stringToComplex("1"), 
    stringToComplex("17-13i"), 
    stringToComplex("1")));*/