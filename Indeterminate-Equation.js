const GCD = (x, y) => !(x % y) ? y : GCD(y, x % y);

const generateFormulaOfGCD = (x, y) => {
    const histry = [];
    while(1){
        const result = [x, y, Math.floor(x / y), x % y];
        x = result[1];
        y = result[3];
        histry.push(result);
        if(y === 0) break;
    }
    return histry.map((value) => [value[3], value[0], value[2], value[1]]);
}

const getSolutionOfEquation = (a, b, n) => {
    for(let i = 0; i * a <= 10000000000; i++) {
        if((n - (i * a)) % b == 0) {
            return [i, (n - (i * a)) / b];
        }
    }
    return null;
}

const getParticularSolution = (GCDresult) => {
    GCDresult = GCDresult.reverse();
    // 自明である一番上を削除
    GCDresult.shift();

    const answer = GCDresult[0][0];

    let a, b;

    const result = GCDresult.map((value, i, array) => {
        if(i === 0){
            a = value[1];
            b = value[3];
        } else if (i%2 === 1){
            b = array[i][1];
        } else {
            a = array[i][1]
        }
        const solutions = getSolution(a, b, answer);
        console.log(`${answer} = ${a} * ${solutions[0]} + ${b} * ${solutions[1]}`);
    });
    return [a, b];
}

console.log(GenerateFormulaOfGCD(1428, 1105))

console.log(getSolution(51, 136, 17));

solution2(GenerateFormulaOfGCD(1428, 1105))
