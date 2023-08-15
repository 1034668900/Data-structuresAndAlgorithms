// 双向链表
class heroNode {
  // data域
  id;
  name;
  skin;
  // next域--指向下一个节点
  next;
  // pre域--指向前一个节点
  pre;

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

class doubleLinkList{
    // 初始化双向链表的头
    head = new heroNode(0,'','')

    // 遍历双向链表
    showDoubleList(head){
        if(this.head.next==null){
            console.log("链表为空");
            return
        }
        let temp = head
        while(true){
            console.log(temp.toString());
            if(temp.next == null)break
            temp = temp.next
        }
    }
    
    // 获取表头
    getHead(){
        return this.head
    }

    // 双向链表的添加--只考虑末尾添加
    addNode(node){
        let temp = this.head
        while(true){
            if(temp.next == null)break
            temp = temp.next
        }
        // 出了while循环后就说明已经找到最后一个节点
        // 双向绑定
        temp.next = node
        node.pre = temp
    }

    // 双向链表的添加--顺序添加
    addNodeByOrder(node){
        let temp = this.head
        // 添加的节点是否存在的标志，默认为false
        let flag = false
        while(true){
            if(temp.next == null)break
            if(temp.next.id > node.id){
                break
            }else if(temp.next.id == node.id){
                flag = true
                break
            }
            temp = temp.next
        }
        if(flag){
            console.log("节点已存在，无法重复添加");
        }else{
            if(typeof temp.next == 'undefined' || temp.next == null){
                temp.next = node
                node.pre = temp
            }else{
            // 先将node.next指向temp.next
            node.next = temp.next
            // 再将temp.next.pre指向node
            temp.next.pre = node
            // 然后将temp.next指向node
            temp.next = node
            // 最后将node.pre指向temp
            node.pre = temp
            }

        }
    }

    // 双向链表的修改
    changeNode(id,name,skin){
        if(this.head.next == null){
            console.log("链表为空");
            return
        }
        let temp = this.head.next
        while(true){
            if(temp.id == id)break
            temp = temp.next
        }
        temp.name = name
        temp.skin = skin
    }

    // 双向链表的删除
    deleteNode(id){
        if(this.head.next == null || id==0){
            console.log("链表为空或删除的对象为链表的头节点，无法删除");
            return
        }
        let temp = this.head.next
        while(true){
            if(temp.id == id)break
            temp = temp.next
        }
        // 此时的temp就是待删除节点
        // 自我删除
        temp.pre.next = temp.next
        // 这里如果temp是最后一个节点就会出现问题
        // temp.next.pre = temp.pre
        if(temp.next!=null)temp.next.pre = temp.pre
    }


}

// 创建节点
let node1 = new heroNode(1, "元歌", "午夜歌剧院");
let node2 = new heroNode(2, "韩信", "街头霸王");
let node3 = new heroNode(3, "李白", "千年之狐");
let node4 = new heroNode(4, "孙悟空", "美猴王");

let doubleList = new doubleLinkList()


doubleList.addNodeByOrder(node3)
doubleList.addNodeByOrder(node4)
doubleList.addNodeByOrder(node2)
doubleList.addNodeByOrder(node1)


doubleList.showDoubleList(doubleList.getHead())
