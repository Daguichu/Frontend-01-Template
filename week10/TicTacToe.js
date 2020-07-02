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
      cell.addEventListener("click", () => move(j, i));
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
};

function move(x, y) {
  if (!pattern[y][x]) {
    pattern[y][x] = color;
    const result = check(pattern, color);
    if (result) {
      color === 1 ? alert("⭕️ win") : alert("❌ win");
    }
    color = 3 - color;
    show();
  }
}

function check(pattern, color) {
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; (j = 3); j++) {
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

show();
console.log(pattern);
