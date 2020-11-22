// 捕获键盘事件
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://向左
            if (moveLeft()) {
                setTimeout('generateOneNumber()', 200);
                setTimeout('isGameover()', 500);
            }
            break;
        case 38://向上
            if (moveUp()) {
                setTimeout('generateOneNumber()', 200);
                setTimeout('isGameover()', 500);
            }
            break;
        case 39://向右
            if (moveRight()) {
                setTimeout('generateOneNumber()', 200);
                setTimeout('isGameover()', 500);
            }
            break;
        case 40://向下
            if (moveDown()) {
                setTimeout('generateOneNumber()', 200);
                setTimeout('isGameover()', 500);
            }
            break;
        default:
            break;
    }
});