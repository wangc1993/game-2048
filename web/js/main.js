// 新建一个二维坐标数组
let board = new Array();
// 获取外层容器（变化的）的宽度
let gridContainerWidth = 0

$(function () {
    gridContainerWidth = $('#grid-container').width();
    newGame();
});

// 棋盘初始化
function newGame() {
    // 初始化布局
    init();
    /*生成随机格子的随机数字*/
    generateOneNumber();
    generateOneNumber();
}

// 初始化
function init() {
    // i表示4乘4的格子中的行
    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        // j表示4乘4的格子中的列
        for (let j = 0; j < 4; j++) {
            // 将每个格子的值初始化为0，0表示当前无数字
            board[i][j] = 0;
            // 通过双重遍历获取每个格子元素
            let gridCell = $(`#grid-cell-${i}-${j}`);
            // 通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css('top', getPosTop(i, j));
            // 通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    // 初始化棋盘数字
    updateBoardView()
}

function updateBoardView() {
    //首先清空之前的数字格布局内容
    $(".number-cell").remove();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //向棋盘格上增加数字格
            $('#grid-container').append(`<div class='number-cell' id='number-cell-${i}-${j}'></div>`)
            let numberCell = $(`#number-cell-${i}-${j}`)
            //判断当前格子是否有值
            if (board[i][j] === 0) {
                numberCell.css('display', 'none');
                numberCell.css('top', getPosTop(i, j));
                numberCell.css('left', getPosLeft(i, j));
            } else {
                numberCell.css('top', getPosTop(i, j));
                numberCell.css('left', getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
        }
    }
}

// 选中随机格子的随机数字
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