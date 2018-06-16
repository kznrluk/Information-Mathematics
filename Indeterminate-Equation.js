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
    // TODO ループ範囲を適切な形に修正
    for(let i = 0; i <= c * a; i++) {
        if((c - (i * a)) % b == 0) {
            return [i, (c - (i * a)) / b];
        }
    }
    return null;
}

/*
 * getParticularSolution (Array)
 * generateFormulaOfGCD()の結果を拡張ユークリッド互除法で解き、1つの解を返します。
 */
const getParticularSolution = (resultArray) => {
    // 配列を逆転する
    formulas = resultArray.reverse();
    // 自明であるので一番始めを削除
    formulas.shift();

    let a, b, solutions = [0, 0];
    formulas.forEach((formula, index, array) => {
        if(index === 0){
            a = formula[1];
            b = formula[3];
        } else if (index%2 === 1){
            b = array[index][1];
        } else {
            a = array[index][1]
        }
        solutions = getSolutionOfEquation(a, b, array[0][0]);
        if(!solutions) throw '解がありません。';
        console.log(`${array[0][0]} = ${a} * ${solutions[0]} + ${b} * ${solutions[1]}`);
    });
    return solutions;
}

console.log(getParticularSolution(generateFormulaOfGCD(1428, 1105)));
// => [24, 31]