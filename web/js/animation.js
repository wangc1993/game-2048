function showNumberWitnAnimation(i,j,randNumber){
    // 获取当前的数字格
    const numberCell = $("#number-cell-" + i + "-" + j);
    // 设置属性值
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);
    // 设置数字格的显示动画
    numberCell.animate({
        display: 'block',
        top: getPosTop(i,j),
        left: getPosLeft(i,j)
    }, 500);
}

/*数字格移动的动画效果*/
function showMoveAnimation(fromx, fromy, tox, toy){
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}
