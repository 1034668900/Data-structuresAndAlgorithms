// 线索化二叉树--以中序线索化为例

// heroNode节点
class HeroNode {
  #name;
  #id;
  #left = null; // 左指针
  #right = null; // 右指针
  #leftType = 0; // 左指针的类型，0表示指向节点，1表示指向前驱节点
  #rightType = 0; // 右指针的类型，0表示指向节点，1表示指向前驱节点
  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  setLeftType(type) {
    this.#leftType = type;
  }
  setRightType(type) {
    this.#rightType = type;
  }
  getLeftType() {
    return this.#leftType;
  }
  getRightType() {
    return this.#rightType;
  }
  getLeft() {
    return this.#left;
  }
  getRight() {
    return this.#right;
  }
  setLeft(node) {
    this.#left = node;
  }
  setRight(node) {
    this.#right = node;
  }
  toString() {
    return `{id:${this.#id},Name:${this.#name}}}`;
  }
}

// 线索化二叉树
class ThreadedBinaryTree {
  #root = null;
  // 当前节点指向前驱节点的指针（prePointer总是指向当前节点的前一个节点）
  prePointer = null;
  constructor(root) {
    this.#root = root;
  }

  // 线索化二叉树 node:当前需要线索化的节点
  threadedNodes(node) {
    // 如果当前节点为null则无法线索化
    if (node == null) return;

    // 先线索化左子树
    this.threadedNodes(node.getLeft());

    // 线索化当前节点
    // 1. 处理当前节点的前驱节点
    if (node.getLeft() == null) {
      // 让当前节点的左指针指向前驱节点
      node.setLeft(this.prePointer);
      // 修改当前节点左指针的类型
      node.setLeftType(1);
    }
    // 2. 处理后继节点（是在下一次递归处理上一次的后继节点，下次递归的prePointer就是上次的node）
    if (this.prePointer != null && this.prePointer.getRight() == null) {
      this.prePointer.setRight(node);
      this.prePointer.setRightType(1);
    }
    // 让prePointer指针指向这次的node节点
    this.prePointer = node;

    // 线索化右子树
    this.threadedNodes(node.getRight());
  }

  // 中序线索化二叉树的遍历
  threadedList() {
    let node = this.#root;
    // 当node不为空便一直找
    while (node != null) {
      // 循环找到leftType == 1的节点，第一个找到的就是id为8的节点
      // node后面会随着遍历而变化
      while (node.getLeftType() == 0) {
        node = node.getLeft()
      }
      // 出了上面循环后，此时node就是id为8的节点
      console.log(node.toString());

      // 如果当前节点的右指针指向的是后继节点，就一直输出
      while(node.getRightType() == 1){
        // 获取到当前节点的后继节点
        node = node.getRight()
        console.log(node.toString());
      }
      // 替换这个遍历的节点
      node = node.getRight()
    }
  }
}

// 实例几个节点
const rootNode = new HeroNode(1, "fc");
const heroNode2 = new HeroNode(3, "ly");
const heroNode3 = new HeroNode(6, "fy");
const heroNode4 = new HeroNode(8, "John");
const heroNode5 = new HeroNode(10, "Milk");
const heroNode6 = new HeroNode(14, "King");

const threadedBinaryNodes = new ThreadedBinaryTree(rootNode);
rootNode.setLeft(heroNode2);
rootNode.setRight(heroNode3);
heroNode2.setLeft(heroNode4);
heroNode2.setRight(heroNode5);
heroNode3.setLeft(heroNode6);

threadedBinaryNodes.threadedNodes(rootNode);
threadedBinaryNodes.threadedList()