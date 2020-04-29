function convertNumberToString(number, x = 10) {
  var integer = Math.floor(number);
  var fraction = number - integer;
  var string = "";
  if (x === 2 || x === 8 || x === 16) {
    return integer + "";
  }
  while (integer > 0) {
    string = String(integer % x) + string;
    integer = Math.floor(integer / x);
  }

  return number + "";
}

console.log(convertNumberToString(0b0000, 2));
console.log(convertNumberToString(0b0111, 2));
console.log(convertNumberToString(0o71, 8));
console.log(convertNumberToString(0o46, 8));
console.log(convertNumberToString(0xa, 2));
console.log(convertNumberToString(0x1f, 2));
console.log(convertNumberToString(0));
console.log(convertNumberToString(1234, 10));
console.log(convertNumberToString(1234.123, 10));
console.log(convertNumberToString(0.1234, 10));
