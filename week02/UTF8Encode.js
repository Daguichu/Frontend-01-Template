//获取不同字节补位码
const getCode = (code) => {
  const one = [0, -1, -1, -1, -1, -1, -1, -1];
  const two = [1, 1, 0, -1, -1, -1, -1, -1, 1, 0, -1, -1, -1, -1, -1, -1];
  const three = [
    1,
    1,
    1,
    0,
    -1,
    -1,
    -1,
    -1,
    1,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
  ];
  if (code >= 0 && code < 128) return one;
  if (code >= 128 && code < 2048) return two;
  if (code >= 2048 && code < 0xffff) return three;
};

function UTF8Encoding(string) {
  const strArr = string.split("");
  const strCode = strArr.map((v) => v.codePointAt());
  const result = strCode.map((v) => {
    const template = getCode(v);
    const codeForBinary = v
      .toString(2)
      .split("")
      .map((v) => Number(v));
    const codeToTemplate = template.reverse().map((v, i) => {
      if (v === -1) {
        return codeForBinary.pop() || 0;
      } else {
        return v;
      }
    });
    return codeToTemplate.reverse().join("");
  });
  console.log(result);
  return result;
}

UTF8Encoding("A");
UTF8Encoding("中");
UTF8Encoding("A中");
