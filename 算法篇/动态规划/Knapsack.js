// 01背包问题

function knapsack() {
  // 物品的重量
  let w = [1, 4, 3];
  // 物品的价值，对应公式里的v[i]
  let val = [1500, 3000, 2000];
  // 背包的容量
  let m = 4;
  // 物品的个数
  let n = val.length;
  // 记录往背包里方物品的路径,二维数组
  let path = [];

  // 二维数组
  let v = [];
  // 初始化二维数组--添加行
  for (let i = 0; i < n + 1; i++) {
    v.push([]);
    path.push([]);
  }
  // 初始化二维数组值
  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < m + 1; j++) {
      v[i][j] = 0;
      path[i][j] = 0;
    }
  }

  // 动态规划处理，i和j从1开始表示不处理第一行和第一列
  for (let i = 1; i < v.length; i++) {
    for (let j = 1; j < v[0].length; j++) {
      // 判断 这里w得从0开始，而我们索引从1开始的，因此需要-1
      if (w[i - 1] > j) {
        // 当前新增商品重量w[i] > 当前背包容量j
        // 则直接取当前背包容量下的上一次的值
        v[i][j] = v[i - 1][j];
      } else {
        // 当前新增商品重量w[i] <= 当前背包容量j
        // v[i][j] = Math.max(v[i-1][j],val[i-1] + v[i-1][j-w[i-1]])
        // 为了记录放入的路径，不能直接用工具函数求两者较大的值
        if (v[i - 1][j] < val[i - 1] + v[i - 1][j - w[i - 1]]) {
          v[i][j] = val[i - 1] + v[i - 1][j - w[i - 1]];
          // 记录当前情况
          path[i][j] = 1;
        } else {
          v[i][j] = v[i - 1][j];
        }
      }
    }
  }
  // 不能直接遍历path找到最优情况，因为并不只是最优解能进入path赋值那个判断
  // 需要倒叙判断
  // 获取path矩阵行和列的最大索引
  let i = path.length - 1,
    j = path[0].length - 1;
  while (i > 0 && j > 0) {
    if (path[i][j] == 1) {
      console.log(`第${i}个商品放入到背包中`);
      // 更新j的索引
      j = j - w[i - 1];
    }
    i--;
  }
  console.log(path);
}
knapsack();
