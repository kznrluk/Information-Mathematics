/*
 * Indeterminate-Equation.js
 * 拡張ユークリッドの互除法を利用しax + by = GCD(a, b)の答えを求めます。
 */

/*
 * extGCD (int a, int b)
 * この関数はextendedEuclidAlgorithm()の短縮版です。
 */
const extGCD = (a, b) => !b ? [1, 0, a] : (x => [x[1], x[0]-x[1]*Math.floor(a/b), x[2]])(extGCD(b, a%b));

/*
 * extendedEuclidAlgorithm (int a, int b)
 * a, cのGCDを求めた後、特殊解を求めます。
 */
const extendedEuclidAlgorithm = (a, b) => {
    if (b === 0) {
        // (2) GCDが求まる
        console.log(`GCD is ${a}`)
        return [1, b, a];
    } else {
        console.log(`${a} = ${b} * ${Math.floor(a/b)} + ${a%b}`)
        // (1) GCDが求まるまで再帰する
        const result = extendedEuclidAlgorithm(b, a % b);
        x = result[0];
        y = result[1];
        // (3) GCDを元に遡り解を求める
        console.log(`${result[2]} = ${a} * ${y} + ${b} * ${x - y * Math.floor(a/b)}`)
        return [y, x - y * Math.floor(a/b), result[2]];
    }
}

extendedEuclidAlgorithm(12707, 12319)
// => 
// 12707 = 12319 * 1 + 388
// 12319 = 388 * 31 + 291
// 388 = 291 * 1 + 97
// 291 = 97 * 3 + 0
// GCD is 97
// 97 = 291 * 0 + 97 * 1
// 97 = 388 * 1 + 291 * -1
// 97 = 12319 * -1 + 388 * 32
// 97 = 12707 * 32 + 12319 * -33

console.log(extGCD(12707, 12319))
// => [ 32, -33, 97 ]