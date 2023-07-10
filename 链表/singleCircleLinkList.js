// 单向环形链表

// 节点类
class Node {
  id;
  next;
  // 构造函数初始化
  constructor(id) {
    this.id = id;
    this.next = null;
  }
}

// 单向环形链表
class singleCircleLinkedList {
  // 准备一个头指针
  headPointer = null;

  // 添加节点，num表示要添加节点的个数
  addNode(nums) {
    // 数据校验
    if (nums < 2) return;
    // 准备一个辅助指针
    let tempPointer = null;
    // 循环创建节点
    for (let i = 1; i < nums; i++) {
      // 根据编号创建节点
      let node = new Node(i);
      if (i == 1) {
        // 是头节点
        // 将头指针指向该节点
        this.headPointer = node;
        // 自形成环形
        this.headPointer.next = this.headPointer;
        // 初始化辅助指针
        tempPointer = this.headPointer;
      } else {
        // 不是头节点(头指针不能移动)
        tempPointer.next = node;
        node.next = this.headPointer;
        // 辅助指针后移
        tempPointer = node;
      }
    }
  }

  // 遍历节点
  showNodes() {
    if (this.headPointer == null) return;
    let tempPointer = this.headPointer;
    while (true) {
      // 当辅助指针.next==头指针时说明遍历结束
      console.log("编号为：", tempPointer.id);
      if (tempPointer.next == this.headPointer) return;
      tempPointer = tempPointer.next;
    }
  }

  // 根据输入，输出节点输出顺序
  // startId:从第几个节点开始， countNum:计数多少个,nums表示环形链最初有多少个节点
  exitLinkList(startId, countNum, nums) {
    // 数据校验
    if (startId < 1 || countNum < 1 || startId > nums) return;
    // 创建初始节点
    this.addNode(nums)
    // 准备一个辅助指针
    let tempPointer = this.headPointer;
    // 将辅助指针指向节点最后
    while (true) {
      if (tempPointer.next == this.headPointer) break;
      tempPointer = tempPointer.next;
    }
    // 将赋值指针和头指针同时移动startId-1次（从第几个开始）
    for (let i = 0; i < startId - 1; i++) {
      this.headPointer = this.headPointer.next;
      tempPointer = tempPointer.next;
    }
    // 节点开始报数出链表
    while (true) {
      // 只剩一个节点
      if (tempPointer == this.headPointer) break;
      // 让辅助指针和头指针同时移动countNum-1次
      for (let i = 0; i < countNum - 1; i++) {
        this.headPointer = this.headPointer.next;
        tempPointer = tempPointer.next;
      }
      // 此时头指针指向的节点就是待出链表的节点
      console.log("本次出圈节点为：", this.headPointer.id);
      // 将该节点出圈
      this.headPointer = this.headPointer.next;
      tempPointer.next = this.headPointer;
    }
    // 最后出圈的节点
    console.log("最后出圈节点为：", this.headPointer.id);
  }
}

let sinCircleLinkList = new singleCircleLinkedList();


sinCircleLinkList.exitLinkList(1, 2,6);
