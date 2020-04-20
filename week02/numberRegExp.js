const number = /^((\-)?[1-9]\d*(\.(\d*)?)?([eE](-)?[1-9]\d*)?)|((\-)?(0\.|\.){1}[0-9]+([eE](-)?[1-9]\d*)?)$/;

console.log(number.test("956454"));
console.log(number.test("-23232"));
console.log(number.test(".32323"));
console.log(number.test("-.23232"));
console.log(number.test("0.323232"));
console.log(number.test("-0.4323232"));
console.log(number.test("43.434343"));
console.log(number.test("-34.43424"));
console.log(number.test("1.334E10"));
console.log(number.test("-1.232E7"));
console.log(number.test("0.232e10"));
console.log(number.test("-.232e10"));
console.log(number.test("121e-4"));
console.log(number.test("121E-4"));
console.log(number.test("121e4"));
console.log(number.test("121E10"));
