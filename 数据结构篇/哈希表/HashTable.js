// 哈希表

// 雇员类
class Emplayee {
  id = "";
  name = "";
  // 指向下一个节点
  next = null;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// 雇员链表类
class EmplayeeLinkList {
  #head = null; // 头指针，执行第一个Emplayee，因此这个链表的head，是直接指向第一个Emplayee的

  // 添加雇员到链表
  /* 1.假定当添加雇员时，id是自增长的，即id的分配从小到大，因此我们直接将该雇员加入到本链表的最后
   */
  add(emplayee) {
    // 如果是第一个雇员
    if (this.#head == null) {
      this.#head = emplayee;
      return;
    }
    // 如果不是第一个雇员
    let emplayeePointer = this.#head;
    while (true) {
      if (emplayeePointer.next == null) {
        break;
      }
      emplayeePointer = emplayeePointer.next;
    }
    // 退出循环时就已经指向了链表的最后一个数据
    emplayeePointer.next = emplayee;
  }

  // 遍历雇员信息
  list(index) {
    if (this.#head == null) {
      console.log(index + "号链表为空，无法遍历");
      return;
    }
    let emplayeePointer = this.#head; // 辅助指针，用于遍历
    console.log(index + "号链表的信息为：");
    while (true) {
      console.log(`id=${emplayeePointer.id}|name=${emplayeePointer.name}`);
      if (emplayeePointer.next == null) break;
      emplayeePointer = emplayeePointer.next;
    }
  }
  // 根据id查找雇员
  find(id) {
    let headPointer = this.#head;
    while (true) {
      if (headPointer.id == id) {
        console.log("找到了" + headPointer.name);
        return;
      }
      if (headPointer.next == null) break;
      headPointer = headPointer.next;
    }
    console.log("查无此人");
  }
  // 根据id删除雇员
  remove(id) {
    // 获取到该id应该在哪一条链表上
    let headPointer = this.#head;
    while (true) {
      if (headPointer.next.id == id) {
        let temp = headPointer.next;
        if (headPointer.next.next != null) {
          headPointer.next = headPointer.next.next;
        } else {
          headPointer.next = null;
        }
        console.log("成功删除" + temp.name);
        return;
      }
      if (headPointer.next == null) break;
      headPointer = headPointer.next;
    }
    // 如果执行到这里，说明找完了也没找到
    console.log("查无此人");
  }
  // 获得头节点
  getHead() {
    return this.#head;
  }
}

// 哈希表，用于管理多条链表
class HashTable {
  #EmplayeeLinkListArray = []; // 存储多条链表
  #size = 0; // 表示有多少条链表

  constructor(size) {
    this.#size = size;
    // 初始化EmplayeeLinkListArray
    for (let i = 0; i < size; i++) {
      this.#EmplayeeLinkListArray[i] = new EmplayeeLinkList();
    }
  }

  // 添加雇员
  add(emplayee) {
    // 根据员工的id，得到该员工应该添加到哪条链表
    let emplayeePosition = this.hashFun(emplayee.id);
    // 将emplayeePosition添加到对应的链表中
    this.#EmplayeeLinkListArray[emplayeePosition].add(emplayee);
  }
  // 遍历哈希表
  list() {
    for (let i = 0; i < this.#size; i++) {
      this.#EmplayeeLinkListArray[i].list(i);
    }
  }
  // 根据id查找雇员
  find(id) {
    // 获取到该id应该在哪一条链表上
    let emplayeePosition = this.hashFun(id);
    this.#EmplayeeLinkListArray[emplayeePosition].find(id);

  }
  // 根据id移除雇员
  remove(id) {
    // 获取到该id应该在哪一条链表上
    let emplayeePosition = this.hashFun(id);
    this.#EmplayeeLinkListArray[emplayeePosition].remove(id);
  }
  // 散列函数（有多种写法，这是最简单的一种，根据id为其分配链表）
  hashFun(id) {
    return id % this.#size;
  }
}

const hashTable = new HashTable(5);
const emplayeeLinkList = new EmplayeeLinkList();
const emplayee1 = new Emplayee(1, "fc");
const emplayee2 = new Emplayee(2, "ly");
const emplayee3 = new Emplayee(3, "fy");
const emplayee4 = new Emplayee(6, "lyBB");
const emplayee5 = new Emplayee(11, "fyBB");
const emplayee6 = new Emplayee(16, "fcBB");

hashTable.add(emplayee1);
hashTable.add(emplayee2);
hashTable.add(emplayee3);
hashTable.add(emplayee4);
hashTable.add(emplayee5);
hashTable.add(emplayee6);
//hashTable.list();
hashTable.find(16);
//hashTable.remove(11);
