/*
 * Euclidean-Algorithm.js
 * ユークリッドの互除法を利用しGCDを求めます。
 */

/*
 * GCD (int, int)
 * 再帰関数を利用し、x % yが0になるまで自身にyとxとyの商のあまりを渡し続けます。
 */
const GCD = (x, y) => !(x % y) ? y : GCD(y, x % y);

console.log(GCD(3355, 2379));
// => 61