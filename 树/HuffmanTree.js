// 赫夫曼树

// 创建节点类
class Node {
  // 节点的权值
  value;
  // 指向左子节点
  left;
  // 指向右子节点
  right;

  constructor(value) {
    this.value = value;
  }
}

class HuffmanTree {
  /**
   * 根据传入的数组，将其从小到大排序后，
   * 将每个数据都转换为节点存储在新数组中返回
   * 注意：只有第一次传入的数组内部是数字，后面传入的都是节点数组，排序要区别处理
   * @param {Array} arr
   */
  creatOrderlyNodeList(arr) {
    if (!(arr instanceof Array)) return;
    if (typeof arr[0] == "number") {
      // 首次传入的是数字数组时的处理
      // 从小到大排序
      arr.sort((a, b) => a - b);
      let newArr = [];
      arr.forEach((item) => newArr.push(new Node(item)));
      return newArr;
    } else {
      // 传入的是节点数组时的排序处理（选择排序）
      let minNode = 0;
      let minIndex = 0;
      for (let i = 0; i < arr.length; i++) {
        minNode = arr[i];
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (minNode.value > arr[j].value) {
            minNode = arr[j];
            minIndex = j;
          }
        }
        if (minIndex != i) {
          arr[minIndex] = arr[i];
          arr[i] = minNode;
        }
      }
      return arr;
    }
  }

  /**
   * 创建赫夫曼树
   * @param {Array} arr
   */
  createHuffmanTree(arr) {
    if (!(arr instanceof Array)) return;
    // 1.将数据从小到大排序，并将每个数据转换为节点
    let orderlyArr = this.creatOrderlyNodeList(arr);
    // 2.取出根节点权值最小的两颗二叉树,并将其组成一颗新的二叉树
    let parentNode = null;
    let leftNode = null;
    let rightNode = null;
    let value = 0;
    while (true) {
      if (orderlyArr.length == 1) break;
      leftNode = orderlyArr.shift();
      rightNode = orderlyArr.shift();
      value = leftNode.value + rightNode.value;
      parentNode = new Node(value);
      parentNode.left = leftNode;
      parentNode.right = rightNode;
      orderlyArr.push(parentNode);
      // 重新排序
      orderlyArr = this.creatOrderlyNodeList(orderlyArr);
    }
    // 处理完后便得到一颗赫夫曼树,将其前序遍历打印看看
    this.preOrder(orderlyArr[0]);
  }

  /**
   * 赫夫曼树的前序遍历
   * @param {Node} huffmanTree
   */
  preOrder(huffmanTree) {
    if (huffmanTree == null) return;
    console.log(huffmanTree.value);
    this.preOrder(huffmanTree.left);
    this.preOrder(huffmanTree.right);
  }
}

let huffmanTree = new HuffmanTree();
let arr = [13, 7, 8, 3, 29, 6, 1];
huffmanTree.createHuffmanTree(arr);
// result: 67 29 38 15 7 8 23 10 4 1 3 6
