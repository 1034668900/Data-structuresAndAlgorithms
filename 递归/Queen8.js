// 八皇后问题
/* 
    代码书写思路：
        1. 需要打印出所有解法
        2. 需要判断皇后放置是否合理
        3. 放置皇后
*/
class Queen8 {
  // 皇后的最大个数
  max = 8;
  // 存储解法的数组
  arr = [];
  // 统计有多少种解法
  count = 0;

  // 判断是否冲突 -- 判断冲突的算法和数组选择一维还是二维有关
  // 接收当前是第n个皇后--需要判断之前所有的皇后的位置
  judge(n) {
    for (let i = 0; i < n; i++) {
      /* 
                this.arr[i] == this.arr[n]  判断是否在同一列
                Math.abs(n-1) == (Math.abs(this.arr[n]) - Math.abs(this.arr[i])) 判断是否在同一斜线
             */
      if (
        this.arr[i] == this.arr[n] ||
        Math.abs(n - i) == Math.abs(this.arr[n] - this.arr[i])
      ) {
        return false;
      }
    }
    // 没有冲突
    return true;
  }

  // 打印解法
  print() {
    console.log(this.arr.toString());
  }
  // 输出一共有多少种解法
  outPutAll() {
    console.log(`一共有${this.count}解法`);
  }

  // 放置皇后,接收一个参数，即放置第n+1个皇后
  setQueen(n) {
    // 首先判断放置完毕的情况
    if (n == this.max) {
      // 此时n = 8 ，即正准备放第九个皇后，说明皇后已经放置完毕
      this.print();
      this.count++;// 统计解法
      return;
    }
    // 还没放置完毕--依次放入皇后并判断是否冲突
    for (let i = 0; i < this.max; i++) {
      // 先把第n个皇后放在当前行的第i列
      this.arr[n] = i;
      if (this.judge(n)) {
        // 没有冲突就放置下一个
        this.setQueen(n + 1);
      }
      // 进入这里说明有冲突，则i++，继续在本行将皇后放置到i+1列
    }
  }
}

let queen8 = new Queen8();
queen8.setQueen(0);// 从第一个皇后开始摆放
queen8.outPutAll();// 输出一共有多少解法
