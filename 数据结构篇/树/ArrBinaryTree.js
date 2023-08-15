// 顺序存储二叉树
class ArrBinaryTree {
  arr;
  constructor(arr) {
    this.arr = arr;
  }

  // 前序遍历
  preOrder(index = 0) {
    // 判断当前数组是否为空
    if (this.arr.length != 0) {
      // 输出当前元素
      console.log(this.arr[index]);
      // 向左节点递归遍历并判断下标是否越界
      if (2 * index + 1 < this.arr.length) {
        this.preOrder(2 * index + 1);
      }
      // 向右递归遍历并判断下标是否越界
      if (2 * index + 2 < this.arr.length) {
        this.preOrder(2 * index + 2);
      }
    } else {
      console.log("数组为空，无法前序遍历");
    }
  }
}


let arr = [1,2,3,4,5,6,7]
let arrBinaryTree = new ArrBinaryTree(arr)
arrBinaryTree.preOrder()
