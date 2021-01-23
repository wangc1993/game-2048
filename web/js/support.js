// 获取每个小盒子距离顶端的距离
function getPosTop(i, j) {
  return 20 + 120 * i;
}

// 获取每个小盒子距离左边的距离
function getPosLeft(i, j) {
  return 20 + (gridContainerWidth / 4) * j;
}

function updateScore(score) {
  $("#currentScore").text(score);
}

function updateMaxHighScore(score) {
  $("#bestScore").text(score);
}

// 设置数字的背景色
function getNumberBackgroundColor(number) {
  switch (number) {
    case 2:
      return "#eee4da";
    case 4:
      return "#ede0c8";
    case 8:
      return "#f2b179";
    case 16:
      return "#f59563";
    case 32:
      return "#f67c5f";
    case 64:
      return "#f65e3b";
    case 128:
      return "#edcf72";
    case 256:
      return "#edcc61";
    case 512:
      return "#9c0";
    case 1024:
      return "#33b5e5";
    case 2048:
      return "#09c";
    case 4096:
      return "#a6c";
    case 8192:
      return "#93c";
  }
}

// 设置数字的颜色
function getNumberColor(number) {
  if (number <= 4) {
    return "#776e65";
  }
  return "white";
}

// 判断有无空格
function noSpace(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
}

//判断是否可以向左移
function canMoveLeft(board) {
  for (let i = 0; i < 4; i++) {
    //第二列开始检查
    for (let j = 1; j < 4; j++) {
      //判断依据：当前不为0的值左边值为0的或者与当前值相等
      if (board[i][j] != 0) {
        if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveRight(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveUp(board) {
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveDown(board) {
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

//判断2横向坐标之间有无值不为0的
function noBlokHorizontalCol(row, col1, col2, board) {
  for (let i = col1 + 1; i < col2; i++) {
    if (board[row][i] != 0) {
      return false;
    }
  }
  return true;
}

function noBlokHorizontalRow(row1, row2, col, board) {
    for (let i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function noMove(board) {
  if (
    canMoveDown(board) ||
    canMoveLeft(board) ||
    canMoveRight(board) ||
    canMoveUp(board)
  ) {
    return false;
  }
  return true;
}

function isGameover() {
    //判断依据：棋盘格中没有空的格子了，并且棋盘格中没有可以移动的格子了
  if (noSpace(board) && noMove(board)) {
    gameOver();
  }
}
