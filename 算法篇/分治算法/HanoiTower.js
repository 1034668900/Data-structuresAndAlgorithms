// 分治算法解决汉诺塔移动问题

/**
 * 游戏规则：将A塔的所有盘移动到C塔，可以借助B塔
 * @param {Number} dishNums // 需要移动的盘数
 * @param {*} A A塔
 * @param {*} B B塔
 * @param {*} C C塔
 */
function hanoiTower(dishNums, A, B, C) {
  // 如果只有一个盘(直接从A -> C)
  if (dishNums == 1) {
    console.log("第1个盘从" + A + "->" + C);
  } else {
    // dishNums>=2的情况
    // 1. 将上面所有盘从A -> B, 中途会借助C
    hanoiTower(dishNums - 1, A, C, B);
    // 2. 将最下面的盘从A -> C
    console.log("第" + dishNums + "个盘从" + A + "->" + C);
    // 3. 将B塔的所有盘从B -> C ，移动途中会借助A塔
    hanoiTower(dishNums - 1, B, A, C);
  }
}

hanoiTower(2,"A","B","C")
