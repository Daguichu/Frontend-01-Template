function convertNumberToString(number) {
  var integer = Math.floor(number);
  var fraction = number - integer;
  var string = integer === 0 ? "0" : "";
  var strFraction = ".";
  while (integer > 0) {
    string = String(integer % 10) + string;
    integer = Math.floor(integer / 10);
  }
  while (fraction > 0) {
    fraction = fraction * 10;
    let int = Math.floor(fraction);
    strFraction = strFraction + int;
    fraction = fraction - int;
  }

  return strFraction === "." ? string : string + strFraction;
}

console.log(convertNumberToString(0b0000));
console.log(convertNumberToString(0b0111));
console.log(convertNumberToString(0o71));
console.log(convertNumberToString(0o46));
console.log(convertNumberToString(0xa));
console.log(convertNumberToString(0x1f));
console.log(convertNumberToString(0));
console.log(convertNumberToString(1234));
console.log(convertNumberToString(1234.3));
console.log(convertNumberToString(0.5));
console.log(convertNumberToString(1E3));

