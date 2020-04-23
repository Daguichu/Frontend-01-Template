//转义字符
const escape = /(\\['"\\bfnrtv])/;
//空格符
const espace = /[(\\u000A)(\\u000D)(\\u2028)(\\u2029)]/;
//十六进制
const hex = /\\x[0-9a-fA-F]{2}/;
const unicode = /\\u[0-9a-fA-F]{4}/;

const string = /^"[^"\\]*[(\\u000A)(\\u000D)(\\u2028)(\\u2029)]*(\\['"\\bfnrtv])*(\\x[0-9a-fA-F]{2})*(\\u[0-9a-fA-F]{4})*"$/;
