// 捕获键盘事件
$(document).keydown(function (event) {
  if (!gameoverFlag) {
    switch (event.keyCode) {
      case 37: //向左
        if (moveLeft()) {
          setTimeout("generateOneNumber()", 210);
          setTimeout("isGameover()", 500);
          gameOver();
        }
        break;
      case 38: //向上
        if (moveUp()) {
          setTimeout("generateOneNumber()", 210);
          setTimeout("isGameover()", 500);
        }
        break;
      case 39: //向右
        if (moveRight()) {
          setTimeout("generateOneNumber()", 210);
          setTimeout("isGameover()", 500);
        }
        break;
      case 40: //向下
        if (moveDown()) {
          setTimeout("generateOneNumber()", 210);
          setTimeout("isGameover()", 500);
        }
        break;
      default:
        break;
    }
  }
});

function moveLeft() {
  if (!canMoveLeft(board)) {
    return false;
  }
  //可以移动
  //step1:判断除第一列外有哪些数字格的值是不为0的
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        //step2:遍历当前值不为0的数字格左边数字格
        for (let k = 0; k < j; k++) {
          //step3：能够左移的2种情况；
          //1、当前值不为0的数字格左边的数字格必须有0并且中间的数字格必须值也为0
          //2、当前值不为0的数字格与左边的数字格值有相等并且中间的数字格必须值也为0
          if (board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
            //move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (
            board[i][k] == board[i][j] &&
            noBlokHorizontalCol(i, k, j, board) &&
            !hasConflicted[i][k]
          ) {
            //move
            showMoveAnimation(i, j, i, k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            //add score
            score += board[i][k];
            updateScore(score);

            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveRight() {
  if (!canMoveRight(board)) {
    return false;
  }
  //moveRight
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (let k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
            //move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;

            continue;
          } else if (
            board[i][k] == board[i][j] &&
            noBlokHorizontalCol(i, j, k, board) &&
            !hasConflicted[i][k]
          ) {
            //move
            showMoveAnimation(i, j, i, k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;

            //add score
            score += board[i][k];
            updateScore(score);

            hasConflicted[i][k] = true;
            continue;
          }
        }
      }
    }
  }

  setTimeout("updateBoardView()", 200);
  return true;
}

function moveUp() {
  if (!canMoveUp(board)) {
    return false;
  }
  //moveUp
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 0; k < i; k++) {
          if (board[k][j] == 0 && noBlokHorizontalRow(k, i, j, board)) {
            //move
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;

            continue;
          } else if (
            board[k][j] == board[i][j] &&
            noBlokHorizontalRow(k, i, j, board) &&
            !hasConflicted[k][j]
          ) {
            //move
            showMoveAnimation(i, j, k, j);
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;

            //add score
            score += board[k][j];
            updateScore(score);

            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }

  setTimeout("updateBoardView()", 200);
  return true;
}

function moveDown() {
  if (!canMoveDown(board)) {
    return false;
  }
  //moveDown
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
            //move
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;

            continue;
          } else if (
            board[k][j] == board[i][j] &&
            noBlokHorizontalRow(i, k, j, board) &&
            !hasConflicted[k][j]
          ) {
            //move
            showMoveAnimation(i, j, k, j);
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;

            //add score
            score += board[k][j];
            updateScore(score);

            hasConflicted[k][j] = true;
            continue;
          }
        }
      }
    }
  }

  setTimeout("updateBoardView()", 200);
  return true;
}

function gameOver() {
  gameoverFlag = true;
  if(score > maxHighScore) {
    localStorage.setItem('maxHighScore', score)
    maxHighScore = score
    updateMaxHighScore(maxHighScore)
  }
  $("#grid-container").append(
    "<div id='gameover' class='game-over'><p>本次得分</p><span>" +
      score +
      "</span><a href='javascript:restartGame();' id='restartGameButton'>Restart</a></div>"
  );
}
