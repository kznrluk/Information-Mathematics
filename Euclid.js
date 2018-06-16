const GCD = (x, y) => !(x % y) ? y : GCD(y, x % y);

console.log(GCD(3355, 2379));
// => 61