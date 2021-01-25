单机版 2048--[在线访问](https://wangc1993.github.io/game-2048/web/view/home.html)

#### 游戏主要文件

1. css 样式文件
2. js/main.js 游戏入口逻辑 js/game.js 游戏逻辑 js/support.js 功能函数 js/animation.js 动画函数
3. view 游戏页面

#### 游戏主要逻辑

1. 初始化布局，简单的 4X4 布局，我们可以用一个二维数组来进行绘图。不过为了区分当前格是否已被使用（有数字），需要为每个二维数组的增加一个值来表示当前格是否被利用。

```js
for (let i = 0; i < 4; i++) {
  board[i] = new Array();
  hasConflicted[i] = new Array();
  // j表示4乘4的格子中的列
  for (let j = 0; j < 4; j++) {
    // 将每个格子的值初始化为0，0表示当前无数字
    board[i][j] = 0;
    hasConflicted[i][j] = false;
    // 通过双重遍历获取每个格子元素
    let gridCell = $(`#grid-cell-${i}-${j}`);
    // 通过getPosTop()方法设置每个格子距顶端的距离
    gridCell.css("top", getPosTop(i, j));
    // 通过getPosLeft()方法设置每个格子距左端的距离
    gridCell.css("left", getPosLeft(i, j));
  }
}
```
2. 随机生成数字，即在剩余board数组不为0的格子任选一个。注意：选之前需要判断当前是否还有空格。
```js
function generateOneNumber() {
    if (noSpace(board)) {
        return false
    }

    // 随机生成一个坐标
    let randX = 0;
    let randY = 0;

    // 定义一个死循环，完成随机内空格子的生成
    while (true) {
        if (board[randX][randY] == 0) {
            break;
        }
        // 否则重新随机一个位置
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
    }

    // 随机生成一个数字
    const randNumber = Math.random() < 0.5 ? 2 : 4;

    // 在随机位置显示随机数字
    board[randX][randY] = randNumber;
    
    // 实现随机数字显示的动画
    showNumberWitnAnimation(randX, randY, randNumber);
}
```
3. 移动逻辑（以向左为例）
    1. 首先判断是否还能向左
    ```js
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
    ```
    2. 左移又分2种情况：当前值不为0的数字格左边的数字格必须有0并且中间的数字格必须值也为0；当前值不为0的数字格与左边的数字格值有相等并且中间的数字格必须值也为0。
    ```js
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
    ```
4. 优化
    1. 游戏结束的判断
    ```js
    function isGameover() {
        //判断依据：棋盘格中没有空的格子了，并且棋盘格中没有可以移动的格子了
        if (noSpace(board) && noMove(board)) {
            gameOver();
        }
    }
    ```
    2. 记录分数
    ```js
    score += board[i][k];
    updateScore(score);
    ```
    3. 增加冲突坐标，为了后期解决一次操作无限相加的bug，比如，想左操作一次之后其实变化之后的还能满足向左的逻辑，这样会无限向左，但是我们要的是左移一次。这时就要增加表识位。
    ```js
    // 冲突二维坐标，为了后期解决一次操作无限相加的bug
    let hasConflicted = new Array();
    ```
    4. 最高分，每次游戏结束的时候判断一下
    ```js
    if(score > maxHighScore) {
        localStorage.setItem('maxHighScore', score)
        maxHighScore = score
        updateMaxHighScore(maxHighScore)
    }
    ```
[游戏代码](https://github.com/wangc1993/game-2048/tree/master/web)

