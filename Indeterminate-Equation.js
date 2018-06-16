const GCD = (x, y) => !(x % y) ? y : GCD(y, x % y);


/*
 * generateFormulaOfGCD (int, int)
 * 2つの数を受け取り、GCDを算出するまでの過程を2次元配列で返します。
 */
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


/*
 * getSolutionOfEquation (int a, int b, int c)
 * ax + by = c の方程式の解を返します。存在しない場合はnullを返します。
 */
const getSolutionOfEquation = (a, b, c) => {
    for(let i = 0; i * a <= 10000000000; i++) {
        if((c - (i * a)) % b == 0) {
            return [i, (c - (i * a)) / b];
        }
    }
    return null;
}

/*
 * getParticularSolution (Array)
 * generateFormulaOfGCD()の結果を拡張ユークリッド互除法で解き、特殊解を返します。
 */
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
        const solutions = getSolutionOfEquation(a, b, answer);
        console.log(`${answer} = ${a} * ${solutions[0]} + ${b} * ${solutions[1]}`);
    });
    return [a, b];
}
console.log(getParticularSolution(generateFormulaOfGCD(1428, 1105)));
