function match(str) {
  let state = start;
  for (let c of str) {
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if (c === "a") {
    return fundA;
  } else {
    return start;
  }
}

function fundA(c) {
  if (c === "b") {
    return fundB;
  } else {
    return start(c);
  }
}

function fundB(c) {
  if (c === "a") {
    return fundA2;
  } else {
    return start(c);
  }
}

function fundA2(c) {
  if (c === "b") {
    return fundB2;
  } else {
    return start(c);
  }
}

function fundB2(c) {
  if (c === "a") {
    return fundA3;
  } else {
    return start(c);
  }
}

function fundA3(c) {
  if (c === "b") {
    return fundB3;
  } else {
    return start(c);
  }
}

function fundB3(c) {
  if (c === "x") {
    return end;
  } else {
    return fundB2(c);
  }
}

function end() {
  return end;
}

console.log(match("ababababababababababaabababababx"));
console.log(match("aaaabababx"));
console.log(match("abababc"));
console.log(match("ababababx"));
