//十六进制转二进制
function xTob(str) {
  const map = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    a: "1010",
    b: "1011",
    c: "1100",
    d: "1101",
    e: "1110",
    f: "1111",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
    ".": ".",
  };
  return map[str];
}

//处理科学计数法
function eToTen(charts) {}

function convertStringToNumber(string, x = 10) {
  if (x !== 2 && x !== 8 && x !== 10 && x !== 16) return NaN;
  var charts = string.split("");
  var number = 0;
  let i = 0,
    len = charts.length;
  if (x === 16) {
    for (let j = 0; j < len; j++) {
      charts[j] = xTob(charts[j]);
    }
    charts = charts.join("").split("");
    x = 2;
  }
  while (i < charts.length) {
    if (charts[i] === ".") {
      i++;
      break;
    }
    number = number * x;
    number += charts[i].codePointAt(0) - "0".codePointAt(0);
    i++;
  }
  var fraction = 1;
  while (i < charts.length) {
    fraction = fraction / x;
    number += (charts[i].codePointAt(0) - "0".codePointAt(0)) * fraction;
    i++;
  }
  return number;
}

console.log(convertStringToNumber("100", 2));
console.log(convertStringToNumber("1011", 2));
console.log(convertStringToNumber("100.001", 2));
console.log(convertStringToNumber("100.0111", 2));
console.log(convertStringToNumber("10.01"));
console.log(convertStringToNumber("10101010", 2));
console.log(convertStringToNumber("aa", 16)); //170
console.log(convertStringToNumber("1a", 16)); //26
console.log(convertStringToNumber("10.f", 16)); //16.9375
