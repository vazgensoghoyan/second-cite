let input1 = document.getElementById('a');
let input2 = document.getElementById('b');
let input3 = document.getElementById('c');
let input4 = document.getElementById('d');

let answers = document.querySelector('.answers dl');

const button = document.querySelector('.solveIt');

function printResult() {
    const ans = solveComplexEquation3(
        stringToComplex(input1.value),
        stringToComplex(input2.value),
        stringToComplex(input3.value),
        stringToComplex(input4.value)
    );

    let html = "";

    let index = 0;

    ans.every(i => {
        if (isNaN(i.re) | isNaN(i.im)) {
            html = '<p>Упс! Что то пошло не так. Вероятно, ошибка в водимых данных.</p>'
            return false;
        }
        index++;
        html += '<dt>x' + index + '</dt>'
        html += '<dd>' + new Complex(i.re, i.im, 5) + '</dd>';
        return true;
    })
    
    answers.innerHTML = html;
}

button.addEventListener('click', printResult);