// 单链表
// 不考虑排序问题

// 创建英雄节点类
class heroNode {
  // data域
  id;
  name;
  skin;
  // next域
  next;

  // 构造函数
  constructor(id, name, skin) {
    this.id = id;
    this.name = name;
    this.skin = skin;
  }

  // 重写toString方法，便于显示
  toString() {
    return [`id:${this.id} name:${this.name} skin:${this.skin}`];
  }
}

// 创建单链表类
class singleLinkList {
  // 创建一个头节点，这个头节点不能被修改，也不存储数据
  head = new heroNode(0, "", "");

  // 向链表添加节点--添加节点需要先找到链表中最后一个节点，
  // 而且由于头节点不能被修改，因此需要准备一个临时变量来存储头节点的数据来进行后续遍历操作
  // 末尾插入
  addNode(node) {
    let temp = this.head;
    // 遍历链表
    while (true) {
      // 找到最后一个节点退出循环
      if (temp.next == null) {
        break;
      }
      // 没找到，节点后移
      temp = temp.next;
    }
    // 当退出while循环后，说明temp已经指向了最后一个节点,因此将最后这个节点的next指向传入的节点node
    temp.next = node;
  }

  // 顺序插入
  addNodeByOrder(node) {
    let temp = this.head;
    // 添加的英雄编号是否存在的标识，默认为false
    let flag = false;
    // 遍历链表
    while (true) {
      // 下一个节点为null退出循环
      if (temp.next == null) {
        break;
      }
      // temp.next.id大于node.id，说明就应该将新节点添加到temp和temp.next之间
      if (temp.next.id > node.id) {
        break;
      } else if (temp.next.id == node.id) {
        // 说明编号已经存在，flag为true
        flag = true;
        break;
      }

      // 不满足上述条件，节点后移
      temp = temp.next;
    }
    if (flag) {
      console.log("该数据已存在，不能再添加");
    } else {
      // 当退出while循环后，说明temp已经指向新添加节点的上一个节点
      // 先将新添加的节点指向其上一个节点原本指向的下一个节点
      node.next = temp.next;
      // 再将上一个节点的next指向新添加的节点
      temp.next = node;
    }
  }

  // 显示链表--遍历
  showNode() {
    // 先判断链表是否为空
    if (this.head.next == null) {
      console.log("链表为空");
      return;
    }
    // 准备临时变量
    let temp = this.head;
    while (true) {
      // 打印节点信息
      console.log(temp.toString());
      // 判断下一个节点是否为空
      if (temp.next == null) {
        break;
      }
      // 后移next
      temp = temp.next;
    }
  }

  // 节点修改
  changeNode(id,newName,newSkin){
    if(this.head.next == null){
        console.log("链表为空，无法修改");
        return
    }
    let temp = this.head
    let flag = false // 是否找到节点的标志位，默认false
    while(true){
        if(temp.id == id){
            // 找到节点，flag = true
            flag = true
            break
        }
        if(temp.next == null){
            break
        }
        temp = temp.next
    }
    // 根据flag判断是否找到要修改的节点
    if(flag){
      temp.name = newName
      temp.skin = newSkin      
    }else{
        console.log(`修改失败，链表中不存在id为：${id}的节点`);
    }
  }

  // 节点删除
  deleteNode(id){
    let temp = this.head
    let flag = false// 是否找到目标节点，默认为false
    while(true){
        if(this.head.next == null){
            break
        }
        if(temp.next.id == id){
            flag = true
            break
        }
        temp = temp.next
    }
    if(flag){
        temp.next = temp.next.next
    }else{
        console.log("没找到目标节点，删除失败");
    }
  }
}

// 创建节点
let node1 = new heroNode(1, "元歌", "午夜歌剧院");
let node2 = new heroNode(2, "韩信", "街头霸王");
let node3 = new heroNode(3, "李白", "千年之狐");
let node4 = new heroNode(4, "孙悟空", "美猴王");

// 创建单链表
let singleLinkedList = new singleLinkList();

// 向单链表添加节点
singleLinkedList.addNode(node1);
singleLinkedList.addNode(node2);
singleLinkedList.addNode(node3);
singleLinkedList.addNode(node4);

// 修改节点
singleLinkedList.changeNode(4,'橘右京','修罗')

// 删除节点
singleLinkedList.deleteNode(3)

// 打印节点信息
singleLinkedList.showNode();
