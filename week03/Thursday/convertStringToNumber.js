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
function eToTen(charts) {
  let indexE = charts.indexOf("e");
  if (indexE === -1) indexE = charts.indexOf("E");
  const isNegative = charts.includes("-");
  const base = charts.slice(0, indexE).join("");
  const index = isNegative
    ? charts.slice(indexE + 2).join("")
    : charts.slice(indexE + 1).join("");
  let numberBase = convertStringToNumber(base);
  const numberIndex = convertStringToNumber(index);
  for (let i = 0; i < numberIndex; i++) {
    numberBase = isNegative ? numberBase / 10 : numberBase * 10;
  }
  return numberBase;
}

function convertStringToNumber(string, x = 10) {
  if (x !== 2 && x !== 8 && x !== 10 && x !== 16) return NaN;
  var charts = string.split("");
  var isNegative = charts[0] === "-";
  if (isNegative) {
    charts = charts.slice(1);
  }
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
  if (charts.includes("e") || charts.includes("E")) {
    const result = eToTen(charts);
    return isNegative ? -result : result;
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
  return isNegative ? -number : number;
}

console.log(convertStringToNumber("189")); //189
console.log(convertStringToNumber("1011")); //1011
console.log(convertStringToNumber("100.001", 2)); //4.125
console.log(convertStringToNumber("100.0111", 2)); //4.4375
console.log(convertStringToNumber("173", 8)); //123
console.log(convertStringToNumber("73", 8)); //59
console.log(convertStringToNumber("aa", 16)); //170
console.log(convertStringToNumber("1B", 16)); //27
console.log(convertStringToNumber("10.f", 16)); //16.9375
console.log(convertStringToNumber("1.25E3")); //1250
console.log(convertStringToNumber("12E9")); //12000000000
console.log(convertStringToNumber('123e-2')) //1.23
console.log(convertStringToNumber('1234E-4')) //0.1234
console.log(convertStringToNumber("-189")); //-189
console.log(convertStringToNumber("-1011")); //-1011
console.log(convertStringToNumber("-100.001", 2)); //-4.125
console.log(convertStringToNumber("-100.0111", 2)); //-4.4375
console.log(convertStringToNumber("-173", 8)); //-123
console.log(convertStringToNumber("-73", 8)); //-59
console.log(convertStringToNumber("-aa", 16)); //-170
console.log(convertStringToNumber("-1B", 16)); //-27
console.log(convertStringToNumber("-10.f", 16)); //-16.9375
console.log(convertStringToNumber("-1.25E3")); //-1250
console.log(convertStringToNumber("-12E9")); //-12000000000
console.log(convertStringToNumber('-123e-2')) //-1.23
console.log(convertStringToNumber('-1234E-4')) //-0.1234