function solveComplexEquation2(a, b, c) {
    const A = Complex.div(b, a);
    const B = Complex.div(c, a);

    const D = Complex.sum(Complex.div(Complex.mult(A, A), new Complex(4)), B.min());

    let ans = Complex.takeRoot(D, 2);

    for (var i = 0; i < ans.length; i++) {
        ans[i] = Complex.sum(ans[i], Complex.div(A, new Complex(-2)));
    }
    
    return ans;
}
