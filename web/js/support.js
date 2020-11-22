// 获取每个小盒子距离顶端的距离
function getPosTop(i, j) {
    return 20 + 120 * i;
}

// 获取每个小盒子距离左边的距离
function getPosLeft(i, j) {
    return 20 + gridContainerWidth / 4 * j;
}

// 设置数字的背景色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#9c0";
        case 1024: return "#33b5e5";
        case 2048: return "#09c";
        case 4096: return "#a6c";
        case 8192: return "#93c";
    }
}

// 设置数字的颜色
function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65';
    }
    return 'white';
}

// 判断有无空格
function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}