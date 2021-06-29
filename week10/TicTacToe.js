let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let color = 1;

const show = () => {
  let board = document.getElementById("board");

  board.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText =
        pattern[i][j] == 2 ? "❌" : pattern[i][j] == 1 ? "⭕️" : "";
      cell.addEventListener("click", () => useMove(j, i));
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
};

function useMove(x, y) {
  if (!pattern[y][x]) {
    pattern[y][x] = color;
    const result = check(pattern, color);
    if (result) {
      color === 1 ? alert("⭕️ win") : alert("❌ win");
    }
    color = 3 - color;
    show();
    computeMove();
  }
}

function computeMove() {
  let choice = bastChoice(pattern, color);
  if (choice.point) {
    pattern[choice.point[1]][choice.point[0]] = color;
  }
  const result = check(pattern, color);
  if (result) {
    color === 1 ? alert("⭕️ win") : alert("❌ win");
  }
  color = 3 - color;
  show();
}

function check(pattern, color) {
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== color) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j][i] !== color) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j][j] !== color) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j][2 - j] !== color) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function clone(pattern) {
  return JSON.parse(JSON.stringify(pattern));
}

function willWin(pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j]) {
        continue;
      }
      let tmp = clone(pattern);
      tmp[i][j] = color;
      if (check(tmp, color)) {
        return [j, i];
      }
    }
  }
  return null;
}

let oppenings = new Map();
oppenings.set(
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ].toString() + "1",
  {
    point: [1, 1],
    result: 0,
  }
);

function bastChoice(pattern, color) {
  if (oppenings.has(pattern.toString() + "1")) {
    return oppenings.get(pattern.toString() + "1");
  }
  let point = willWin(pattern, color);
  if (point) {
    return {
      point,
      result: 1,
    };
  }

  let result = -1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== 0) continue;
      let tmp = clone(pattern);
      tmp[i][j] = color;
      let opp = bastChoice(tmp, 3 - color);
      if (-opp.result >= result) {
        point = [j, i];
        result = -opp.result;
      }
    }
  }
  return {
    point,
    result: point ? result : 0, //-1输，0平，1赢
  };
}

show();
console.log(pattern);
