# 数据结构篇

## 数组和稀疏数组

### 稀疏数组的结构

|      |            row             |            col             |           value            |
| :--: | :------------------------: | :------------------------: | :------------------------: |
| [0]  |     原始数据的**行**数     |     原始数组的**列**数     | 原始数组**有效数据**的个数 |
| [1]  | 原始数组**有效值**的**行** | 原始数组**有效值**的**列** | 原始数组**有效值**的**值** |
| [2]  |            ...             |            ...             |            ...             |
| ...  |                            |                            |                            |



### 数组和稀疏数组的转换

- **数组转稀疏数组的思路**：

  1. 遍历**原始数组**，得到有效数据个数**sum**

  2. 根据sum创建对应的**稀疏数组**（稀疏数组的列肯定是确定的）
  3. 将二维数组的有效数据存入稀疏数组

  ```js
  function toSparseArr(arr) {
    // 数据校验
    if (!(arr instanceof Array)) return;
    // 记录原始数组中有效数据个数
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] != 0) sum++;
      }
    }
    // 创建稀疏数组
    let sparseArr = new Array(sum + 1);
    sparseArr[0] = new Array(3);
    // 记录原始数组的行数、列数以及有效数据的个数
    sparseArr[0][0] = rawArr.length;
    sparseArr[0][1] = rawArr[0].length;
    sparseArr[0][2] = sum;
    let m = 1;// 稀疏数组有效数据的索引
    // 将原始数据的有效值赋值给稀疏数组
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] != 0) {
          // 如果查询到不为0的数则创建一个数组存储对应数据
          sparseArr[m] =  Array(3);
          sparseArr[m][0] = i;// 行
          sparseArr[m][1] = j;// 列
          sparseArr[m][2] = arr[i][j];// 值
          m++;
        }
      }
    }
    return sparseArr
  }
  ```

  

- **稀疏数组转原始二维数组的思路**：

  1. **先**读取稀疏数组的第一行，获取到原始数组的大小并创建
  2. **再**读取稀疏数组的后几行，将稀疏数组中记录的的有效数据**赋值**给**原始数组**

  ```js
  function toArray(sparseArr){
      // 合法性判断
      if(!(sparseArr instanceof Array))return
      // 读取稀疏数组第一行创建原始数组
      let row = sparseArr[0][0]// 行
      let col = sparseArr[0][1]// 列
      let val = sparseArr[0][2]// 有效数据个数
      // 创建原始数组
      let rawArr = []
      for(let i=0;i<row;i++){
          rawArr[i] =new Array(col)
      }
      // 记录稀疏数组索引
      let m=1
      // 读取稀疏数组的值将其赋给原始数组
      for(let i=0;i<row;i++){
          for(let j=0;j<col;j++){
              // 如果稀疏数组的行和列分别同时与i，j相等，表示找到对应位置
              if(sparseArr[m][0]==i && sparseArr[m][1]==j){
                  if(m>val)return
                  rawArr[i][j] = sparseArr[m][2]
                  m++;
              }else{
                  rawArr[i][j] = 0
              }
          }
      }
      return rawArr
  }
  ```

  

## 队列（queue）

### 队列基础

- **特点**：**先进先出**

- 只能从队列**尾部插入**数据，从队列**头部取出**数据，队列装载数据的个数有一个最大值**maxSIze**

- 队列有两个**指针**，**front**指向**头部**，**rear**指向**尾部**，队列的操作本质就是对这两个指针的操作

- 图示

  <img src="C:\Users\Administrator\Desktop\数据结构和算法\img\lineQueue.png" style="zoom: 67%;" />

### 数组模拟队列

- 队列构造函数**初始化**

- 初始化队列**最大容量**`maxSize`、**头部指针**`front`、**尾部指针**`rear`、数组模拟队列的**容器**`arr`

- 判断队列为**空**

  - 当`front==rear`时队列为空

- 判断队列为**满**

- 当`rear == maxSize-1`时队列满

- 添加数据到队列

- 出队列

- 显示队列的所有数据

- 显示队列的头部数据

- **目前存在问题**：队列使用一次后就不能再使用了，没有**复用**的效果

- 代码示例

  ```js
  // 数组模拟队列
  class arrayQueue{
       #maxSize=0   // 数组的最大容量
       #front     // 队列头
       #rear      // 队列尾
       #arr       // 数组存储数据，模拟队列
  
       // 队列的构造器
       constructor(maxSize){
          // 初始化队列
          this.#maxSize = maxSize
          this.#arr = new Array(maxSize)
          this.#front = -1 // 指向队列头部，front指向队列头的前一个位置
          this.#rear = -1  // 指向队列尾部，real指向队列列尾的数据
       }
  
       // 判断队列是否满
       isFull(){
          return this.#rear == this.#maxSize-1
       }
  
       // 判断队列是否为空
       isEmpty(){
          return this.#front == this.#rear
       }
  
       // 添加数据到队列
       addData(data){
          if(this.isFull()){
              console.log("队列已满，无法加入数据");
              return
          }
          // 添加数据-->操作尾部指针后移一个
          this.#rear++
          this.#arr[this.#rear] = data
       }
  
       // 出队列
       getData(){
          if(this.isEmpty()){
              throw new Error('队列为空')
          }
          // 取出数据-->front后移,并将数据返回
          this.#front++
          return this.#arr[this.#front]
       }
  
       // 显示队列的所有数据
       showArrQueue(){
          if(this.isEmpty())return
          for(let i=this.#front;i<this.#arr.length;i++){
              console.log(this.#arr[i]);
          }
       }
  
       // 显示队列的头数据
       showHeadQueue(){
          if(this.isEmpty())return
          return this.#arr[this.#front+1]
       }
  }
  ```

  

### 数组模拟环形队列

### 环形队列模拟思路

- 调整两个指针的含义：

  1. **front**头部指针的含义做出调整：此时**front**就指向队列的第一个元素，即`arr[front]`就是队列的第一个元素,初始值为0
  2. **rear**尾部指针的含义做出调整：此时**rear**指向队列的**最后**一个元素的**后**一个位置，初始值为**0**

- 为什么调整两个指针的含义？

  - 希望总是在队列的**最后一个位置**预留一个位置作为**约定**，这个约定**是为了区分空队列和满队列**的，也就是说，**下图**中当数据**存储到8**时，我们就认为这个队列已经存储**满**了

  <img src="C:\Users\Administrator\Desktop\数据结构和算法\img\队列\circleQueue.png" style="zoom:80%;" />

- 调整后的判断条件

  1. 队列**满**的条件：`(rear+1) % maxSize == front`如图：**(9+1) % 9 == 1**
  2. 队列为**空**的条件：`rear == front`
  3. 队列中**有效数据**个数：`(rear + maxSize - front) % maxSize`

- 环形队列实现

  - **初始化**构造函数

  - 写判断队列为**空**的方法

  - 写判断队列**满**的方法的

  - 添加数据到队列

  - 出队列

    - 出队列时要注意需要用一个临时变量存储**front**，因为如果直接`return arr[front]`的话，后续**将front后移**的操作就无法实现
    - 同时**front的后移也要考虑取模**，不然也可能出现**数组越界**;   `this.#front = (this.#front + 1) % this.#maxSize`

  - 显示队列全部数据

  - 显示队列头部数据

  - 代码示例

    ```js
    class circleQueue{
        #maxSize    // 数组的大小（包含预留位）
        #front      // 头指针，指向第一个元素
        #rear       // 尾指针，指向最后一个元素的下一个元素
        #arr    // 模拟队列的数组
    
        // 队列的构造函数
        constructor (maxSize){
            this.#maxSize = maxSize
            this.#front = 0
            this.#rear = 0
            this.#arr = new Array(maxSize)
        }
    
        // 判断是否满
        isFull(){
            return (this.#rear+1) % this.#maxSize == this.#front
        }
    
        // 是否为空
        isEmpty(){
            return this.#rear == this.#front
        }
    
        // 添加数据到队列
        addData(data){
            //合法性判断
            if(this.isFull()){
                console.log("队列已满，无法再添加数据");
                return
            }
            // 添加数据
            this.#arr[this.#rear] = data
            // 将rear后移，必须考虑取模才能循环，不然数组可能会越界
            this.#rear = (this.#rear + 1) % this.#maxSize
        }
    
        // 出队列
        getData(){
            if(this.isEmpty()){
                console.log("队列不能为空");
                return
            }
            // 环形队列中，这里令front指向的就是第一个元素，
            //但是不能直接返回，因为出队列后front还要后移，因此需要准备一个临时变量
            let newFront = this.#front
            this.#front = (this.#front + 1) % this.#maxSize
            return this.#arr[newFront]
        }
    
        // 显示队列的所有数据--环形队列显示全部数据就是从front开始，到front+有效数据个数 处结束
        showArrQueue(){
            if(this.isEmpty()){
                console.log("队列为空");
                return
            }
            for(let i=this.#front; i<this.#front + this.getEffSize();i++){
                // 在环形队列中，此时的下标并不直接是i，而是 i % maxSize
                console.log(this.#arr[i % this.#maxSize]);
            }
        }
    
        // 获取当前环形队列有效数据的大小
        getEffSize(){
            return (this.#rear + this.#maxSize - this.#front) % this.#maxSize
        }
    
        // 显示队列的头元素
        showHeadQueue(){
            if(this.isEmpty())return
            return this.#arr[this.#front]
        }
    }
    ```

    



## 链表（Linked List）

### 单向链表特点

1. 链表是以**节点**的方式来存储的
2. **每个**节点包含**data**域，**next**域，**节点**的**next**指向的是**下一个节点**
3. 链表的各个节点**不一定**是**连续存储**的
4. **链表**分**带头节点**的和**不带头节点**的，根据**实际的需求**来确定

![单链表示意图](C:\Users\Administrator\Desktop\数据结构和算法\img\链表\singleLinkList.png)

### 单项链表注意事项

1. **一定注意头节点不能修改，也不能存储数据**，因此需要**遍历**操作时需准备一个**临时变量存储头节点信息**然后进行遍历操作

2. 在节点中为了**直观显示**可以**重写toString方法**

3. **节点信息**可以写一个**类**来进行节点信息**初始化**

4. **单链表**（不考虑**排序**，即**直接添加到链表的尾部**）代码演示

   ```js
   // 单链表
   // 暂不考虑排序问题
   
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
   
   // 打印节点信息
   singleLinkedList.showNode();
   
   ```



### 单链表顺序插入实现思路

1. 找到**新添加节点id**的**上**一个节点

2. 先将**新**添加节点的**next**指向**上**一个节点**原本的下一个节点**

3. 再将**上**一个节点的**next**指向**新**添加节点

4. **注意事项**：和**末尾插入只有添加数据时**有**区别**，添加数据时需要考虑

   1. 下一个节点**不存在**时退出循环`temp.next == null`
   2. **下一个节点的id大于添加节点的id时**，退出循环`temp.next.id > node.id`
   3. **下一个节点的id和添加节点的id相同时**，说明该节点已**存在**，退出循环，同时**flag**为**true**

5. 单链表**顺序插入**代码示例

   ```js
   // 向链表添加节点--添加节点需要先找到链表中最后一个节点，
     // 而且由于头节点不能被修改，因此需要准备一个临时变量来存储头节点的数据来进行后续遍历操作
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
   ```



### 链表节点的修改及其注意事项

- **实现思路**：

  1. 修改时传入需要修改节点的**id**，以及**需要修改的数据**
  2. 遍历节点查找目标节点，此时有两种情况，一是**链表遍历完毕**而结束遍历，二是**找到目标节点**而结束遍历，因此为了区分这两种情况需要定义一个**标志位**判断**是否找到目标节点**，遍历结束后再**根据标志位执行对应操作**

- **注意事项**：

  - 节点的修改**id**不能变，不然就变成添加节点了

- **代码实现**：

  ```js
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
  ```



### 单链表节点的删除

- **节点删除实现思路**：
  1. 根据传入的**id**找到**对应的节点**，但是**temp**对应的一定得是**上一个节点**，因为**单链表**的**temp**如果**指向了目标节点**的话就**删除不了**了
  2. 将**temp**节点的**next**指向目标节点的下一个节点`temp.next = temp.next.next`
- **注意事项**：
  - 上述删除操作是**直接改变next的指向**，**被删除的节点**由于**没有变量指向其对应的内存地址**，会**被垃圾回收机制回收**

### 单链表面试题

- 腾讯面试题：单链表的反转

- 实现思路：
      1. 先定义一个节点作为反转节点的头部：`reverseHead = new HeroNode( )`
          2. 遍历原来的链表，每遍历一个节点，就将其取出放在新链表`reverseHead`的最前端
          3. 将原来的链表的`head.next = reverseHead.next`

  ```js
  // 腾讯面试题，单链表的反转
  /* 
      实现思路：
          1. 先定义一个节点作为反转节点的头部：reverseHead = new HeroNode()
          2. 遍历原来的链表，每遍历一个节点，就将其取出放在新链表reverseHead的最前端
          3. 将原来的链表的head.next = reverseHead.next
  */
  
  function reverseLinkList(headNode){
      // 有效节点为空或只有一个有效节点直接返回
      if(headNode.next == null || headNode.next.next == null)return
      // 准备临时变量保存第一个有效节点
      let temp = headNode.next
      // 准备临时变量保存temp的下一个节点
      let next = null
      // 准备用于反转的链表头节点
      let reverseHead = new heroNode()
      // 遍历旧链表
      while(temp != null){
          // 先保存当前节点的下一个节点
          next = temp.next
          // 将当前节点的下一个节点指向新链表的最前端
          temp.next = reverseHead.next
          // 将新链表的第一个节点指向temp节点(此时的temp.next = reverseHead.next)
          reverseHead.next = temp
          // 将当前节点后移
          temp = next
      }
      // 将原链表头节点的next指向新链表头节点的next
      headNode.next = reverseHead.next
  }
  ```





### 双向链表的特点

- 单向链表只能沿着一个方向查找，而**双向链表**可以**双向查找**

- 双向链表的**删除**可以**直接找到待删除节点**，然后将其上下节点相连，使其自我删除`temp.pre.next = temp.next | temp.next.pre = temp.pre`,这里要注意如果**temp是最后一个节点**，那么**temp.next就是null**，此时执行`temp.next.pre = temp.pre`就会出错，因此这中情况要先判断，`temp.next ！= null`才执行

- **注意**双向链表的**顺序添加**

  ```js
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
  ```

  

- **全部代码示例**

  ```js
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
  // 创建双向链表
  let doubleList = new doubleLinkList()
  // 添加节点
  doubleList.addNode(node3)
  doubleList.addNode(node2)
  doubleList.addNode(node4)
  doubleList.addNode(node1)
  // 删除节点
  doubleList.deleteNode(4)
  // 遍历节点
  doubleList.showDoubleList(doubleList.getHead())
  
  ```




### 单向环形链表

### 约瑟夫问题(Josephu问题)说明

- 设编号为**1,2，...n**的n个人围坐一圈，约定编号为**k**(1<=k<=n)的人**从1**开始报数，数到**m**的那个人**出列**，它的**下一位**又从**1**开始报数，数到**m**的那个人又**出列**，以此类推，直到所有人出列为止，由此**产生一个出队编号的序列**。

- 图示

  ![单向环形链表](C:\Users\Administrator\Desktop\数据结构和算法\img\链表\singleCircleLinkedList.jpg)

### 单向环形链表完成约瑟夫问题

- 单向环形链表**构建思路**

  1. 先创建一个节点，让头指针指向该节点，并**自形成**一个环形
  2. 后面每创建一个新的节点就把该节点加入到已有的环形链表中

- 单向环形链表的**遍历**

  1. 定义一个辅助指针先指向头节点
  2. 通过一个循环遍历环形链表，当**辅助指针.next == 头指针**时，遍历结束

- 单向环形链表的**创建**和**遍历**代码实现

  ```js
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
      let tempPointer = this.headPointer;
      while (true) {
        // 当辅助指针.next==头指针时说明遍历结束
        console.log("编号为：", tempPointer.id);
        if (tempPointer.next == this.headPointer) return;
        tempPointer = tempPointer.next;
      }
    }
  }
  
  let sinCircleLinkList = new singleCircleLinkedList();
  
  sinCircleLinkList.addNode(5);
  sinCircleLinkList.showNodes();
  
  ```

- 单向环形链表节点**出圈**

  - 实现思路：

    1. 创建一个**辅助指针**，事先指向环形链表的**最后一个节点**
    2. 头指针和辅助指针**同时移动k-1**次，到达开始计数的节点
    3. 开始报数，让头指针和辅助指针**同时移动m-1**（节点自己也要报数一次）**次**
    4. 使**head指针指向的节点出链表**`head= head.next   temp.next = head`

  - **代码实现**：

    ```js
      // 根据输入，输出节点输出顺序
      // startId:从第几个节点开始， countNum:计数多少个
      exitLinkList(startId,countNum){
        // 数据校验
        if(startId<1 || countNum<1)return
        // 准备一个辅助指针
        let tempPointer = this.headPointer
        // 将辅助指针指向节点最后
        while(true){
            if(tempPointer.next == this.headPointer)break
            tempPointer = tempPointer.next
        }
        // 将赋值指针和头指针同时移动startId-1次（从第几个开始）
        for(let i=0;i<startId-1;i++){
            this.headPointer = this.headPointer.next
            tempPointer = tempPointer.next
        }
        // 节点开始报数出链表
        while(true){
            // 只剩一个节点
            if(tempPointer==this.headPointer)break
            // 让辅助指针和头指针同时移动countNum-1次
            for(let i=0;i<countNum-1;i++){
                this.headPointer = this.headPointer.next
                tempPointer = tempPointer.next
            }
            // 此时头指针指向的节点就是待出链表的节点
            console.log("本次出圈节点为：",this.headPointer.id);
            // 将该节点出圈
            this.headPointer = this.headPointer.next
            tempPointer.next = this.headPointer
        }
            // 最后出圈的节点
        console.log("最后出圈节点为：", this.headPointer.id);
      }
    ```



## 栈(stack)

### 栈的定义

1. 栈是一个**后入先出**的有序列表
2. 栈(stack)是**限制线性表中元素的插入和删除只能在一端**的数据结构，这一端在**变化**，可插入和删除，叫做**栈顶**，另一端叫**栈底**

### 数组模拟栈的思路

1. 初始化一个数组(stack)，定义一个**top**指针，初始时为**-1**
2. **入栈**（push）时，先将`top++`,然后赋值`stack[i] = data`
3. **出栈**（pop）时，由于需要**返回出栈的数据**，因此**先**创建一个临时变量存储栈顶的数据`temp = stack[top]`,**然后**`top--`，**最后**`return temp`即可
4. 栈的**遍历**，遍历时，注意数据是从**栈顶开始遍历**

### 数组模拟栈的代码实现

```js
// 数组模拟栈
class arrayStack {
  top; // top指针,初始为-1
  stack; // 数组模拟的栈
  maxSize; // 栈的大小

  // 构造函数初始化
  constructor(maxSize) {
    this.top = -1;
    this.stack = [];
    this.maxSize = maxSize;
  }

  // 判断栈满
  isFull() {
    return this.top == this.maxSize - 1;
  }
  // 判断栈空
  isEmpty() {
    return this.top == -1;
  }

  // 入栈（push）
  push(data) {
    if (this.isFull()) {
      console.log("栈满，无法入栈");
      return;
    }
    this.top++;
    this.stack[this.top] = data;
  }

  // 出栈（pop）
  pop() {
    if (this.isEmpty()) {
      console.log("栈空，无法出栈");
      return;
    }
    let value = this.stack[this.top];
    this.top--;
    return value;
  }

  // 栈的遍历（注意数据从栈顶开始显示）
  list() {
    if (this.isEmpty()) {
      console.log("栈空，无法遍历");
      return;
    }
    for (let i = this.top; i >= 0; i--) {
      console.log(this.stack[i]);
    }
  }
}

let stack = new arrayStack(5);

for (let i = 0; i < 5; i++) {
  stack.push(i);
}

let s1 = stack.pop()
let s2 = stack.pop()
let s3 = stack.pop()
let s4 = stack.pop()
console.log("@@@",s1,s2,s3,s4);
stack.list();

```



### 使用栈完成中缀表达式计算器功能

- **情景描述**：接收一个形如:`2*5*3+2-1`的**表达式**，计算其结果

- **实现思路**：

  1. 准备两个栈，一个**数栈**（numStack），一个**符号栈**（operStack）
  2. 通过一个**index**索引遍历表达式，当遍历到的是一个**数字**时，就直接将其入**数栈**
  3. 当遍历到的是一个**符号**时：
     1. 如果当前符号栈为**空**，注意可能是**多位数**，需要**特殊处理**,即需要**再向表达式后再看一位**然后处理
     2. 如果当前符号栈**有操作符**，则对**当前操作符**和**栈中的操作符**进行**比较**，**如果当前操作符的优先级小于或等于栈中的操作符**，则从**数栈**中pop出两个数，从**符号栈中**pop出一个操作符，将其进行**运算**，将得到的**结果存入数栈**，接着**将当前的操作符存入符号栈**；**如果当前的操作符的优先级大于栈中的操作符，则直接将其入符号栈**。
  4. 当整个**表达式遍历结束**后，就**顺序**的从**数栈和符号栈**中pop出相应的数和操作符，然后**运算**
  5. **最后**在**数栈**中**只有一个数据**，这个数据就是**运算结果**

- **代码实现**：

  ```js
  // 栈模拟计算器
  class arrayStack {
    top; // top指针,初始为-1
    stack; // 数组模拟的栈
    maxSize; // 栈的大小
  
    // 构造函数初始化
    constructor(maxSize) {
      this.top = -1;
      this.stack = [];
      this.maxSize = maxSize;
    }
  
    // 判断栈满
    isFull() {
      return this.top == this.maxSize - 1;
    }
    // 判断栈空
    isEmpty() {
      return this.top == -1;
    }
  
    // 获取栈顶数据但不出栈
    pickTop() {
      return this.stack[this.top];
    }
  
    // 入栈（push）
    push(data) {
      if (this.isFull()) {
        console.log("栈满，无法入栈");
        return;
      }
      this.top++;
      this.stack[this.top] = data;
    }
  
    // 出栈（pop）
    pop() {
      if (this.isEmpty()) {
        console.log("栈空，无法出栈");
        return;
      }
      let value = this.stack[this.top];
      this.top--;
      return value;
    }
  
    // 栈的遍历（注意数据从栈顶开始显示）
    list() {
      if (this.isEmpty()) {
        console.log("栈空，无法遍历");
        return;
      }
      for (let i = this.top; i >= 0; i--) {
        console.log(this.stack[i]);
      }
    }
  }
  
  // 返回运算符的优先级--目前只支持+-*/
  function priority(oper) {
    if (oper == "*" || oper == "/") {
      return 1;
    } else if ((oper = "+" || oper == "-")) {
      return 0;
    } else {
      return -1;
    }
  }
  
  // 判断是否为一个合法的运算符
  function isOper(oper) {
    return oper == "+" || oper == "-" || oper == "*" || oper == "/";
  }
  
  // 计算方法
  function CalculateNum(num1, num2, oper) {
    // 数据校验
    if (!isOper(oper)) {
      console.log("操作符有误，无法运算");
      return;
    }
    // 存储运算结果
    let result = 0;
    switch (oper) {
      case "+":
        result = num2 + num1;
        break;
      case "-":
        result = num2 - num1;
        break;
      case "*":
        result = num2 * num1;
        break;
      case "/":
        result = num2 / num1;
        break;
      default:
        break;
    }
    return result;
  }
  
  // 计算表达式
  function Calculate(expression) {
    if (typeof expression != "string") return;
    // 准备两个栈   数栈、符号栈
    let numStack = new arrayStack(10);
    let operStack = new arrayStack(10);
    // 准备index索引遍历表达式
    let index = 0;
    // 存储遍历读出的字符
    let char = "";
    // 处理多位数
    let keepChar = "";
  
    // 遍历表达式
    while (true) {
      // 读取表达式的字符
      char = expression.charAt(index);
      // 根据字符进行判断
      if (isOper(char)) {
        // 是运算符--再判断当前符号栈是否为空
        if (operStack.isEmpty()) {
          // 为空--直接将符号入栈
          operStack.push(char);
        } else {
          // 不为空--比较优先级
          if (priority(char) <= priority(operStack.pickTop())) {
            // 当前操作符的优先级小于等于符号栈中的优先级--需要运算
            // 从数栈中取出两个数
            let num1 = numStack.pop();
            let num2 = numStack.pop();
            // 从符号栈中取出一个运算符
            let oper = operStack.pop();
            // 运算获取结果
            let result = CalculateNum(num1, num2, oper);
            // 将运算结果存入数栈
            numStack.push(result);
            // 将当前操作符入符号栈
            operStack.push(char);
          } else {
            // 当前操作符的优先级大于符号栈中的优先级--直接存入
            operStack.push(char);
          }
        }
      } else {
        // 是数字--需要注意判断是不是多位数
        // 先合并数
        keepChar += char;
        // 判断是不是最后一位
        if (index == expression.length - 1) {
          // 最后一位，直接入栈
          numStack.push(+keepChar);
          // 情况keepChar
          keepChar = "";
        } else {
          // 不是最后一位
          // 如果是数字，需要考虑是不是多位数，因此还要再往后看一位
          if (isOper(expression.charAt(index + 1))) {
            // 下一位是运算符--入栈
            numStack.push(+keepChar);
            keepChar = "";
          }
        }
      }
      // 判断完后将索引++
      index++;
      // 判断是否遍历结束
      if (index > expression.length - 1) break;
    }
  
    // 运算结束后，再将数栈和符号栈中的数据顺序取出进行运算
    while (true) {
      let num1 = numStack.pop();
      let num2 = numStack.pop();
      let oper = operStack.pop();
      // 运算
      let result = CalculateNum(num1, num2, oper);
      // 将运算结果存入数栈
      numStack.push(+result);
      // 判断是否运算结束--看符号栈是否为空
      if (operStack.isEmpty()) break;
    }
  
    // 经过上述运算后，数栈中还剩最后一个数，这个数就是最终结果
    console.log("表达式 " + expression + " =", numStack.pop());
  }
  
  let expression = "900+2*9-0";
  
  Calculate(expression);
  
  ```



### 前缀表达式（波兰表达式）

- **前缀表达式的计算机求值**：**从右至左**扫描表达式，当**遇到数字时**，将数字压入堆栈，**遇到运算符时**，弹出栈顶的两个数，用运算符对它们做相应的计算（栈顶元素和次顶元素），并**将结果入栈**；**重复上述过程**直到表达式**最左端**，最后运算得出的值即为表达式的结果。`eg: (3 + 4) * 5 - 6`对应的**前缀表达式**为：`- * + 3 4 5 6`
- **为什么要使用前缀表达式或者后缀表达式**？中缀表达式对我们人来说确实很好理解和使用，但是对计算机来说并不容易操作，因此在计算时我们往往会将中缀表达式转换为其他表达式来进行运算（一般转为**后缀表达式**）
- **中缀表达式如何转换为前缀表达式**？

1. 按照运算符的**优先级**，对**所有**的运算单位加括号（注意**每个**运算符都要有）
  2. 从**最里面**的运算符**开始**，依次把运算符号移动到对应的括号**前面**
  3. 最后把括号都去掉
  4. **例如**：`(3+4)*5-6  `    加括号：`(((3+4)*5)-6) `  移符号：`  -(*(+(3 4)5)6) `   去括号：`- * + 3 4 5 6`

### 后缀表达式（逆波兰表达式）

- 与前缀表达式相似，只是运算符位于操作数**之后**`eg: (3 + 4) * 5 - 6`对应的**后缀表达式**为：`3 4 + 5 * 6 -`

- **后缀表达式的计算机求值**：**从左至右**扫描表达式，**遇到数字时**，将数字压入堆栈，**遇到运算符时**，弹出栈顶的两个数（栈顶元素和次顶元素），用运算符对它们做相应的计算，并**将结果入栈**；重复上述过程**直到表达式最右端**，最后运算得出的值即为表达式的结果

- **代码实现**：

  ```js
  // 逆波兰表达式计算
  function suffixCalculate(expression) {
    // 用于运算的值
    let stack = new arrayStack(10);
    // 将表达式转数组
    let arr = expression.split(" ");
    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
      if(isOper(arr[i])){
          // 是运算符--计算后将结果入栈
          let num1 = stack.pop()
          let num2 = stack.pop()
          let result = CalculateNum(num1,num2,arr[i])
          stack.push(+result)
      }else{
          // 是数字--直接入栈
          stack.push(+arr[i])
      }
     
    }
    // 运算结束后取出结果
    let result = stack.pop()
    console.log(result);
  }
  
  let expression = "3 4 + 5 * 6 -";
  suffixCalculate(expression);// 29
  ```

  

### 中缀表达式转后缀表达式

- **中缀表达式如何转换为后缀表达式**

  1. 按照运算符的**优先级**，对**所有**的运算单位加括号（注意**每个**运算符都要有）
  2. 从**最里面**的运算符**开始**，依次把运算符号移动到对应的括号**后面**
  3. 最后把括号都去掉
  4. **例如**：`(3+4)*5-6  `    加括号：`(((3+4)*5)-6) `  移符号：`  (((3 4)+5)*6)- `   去括号：`3 4 + 5 * 6 -`

- **计算机实现思路**：

  1. **初始化两个栈**：**运算符栈**s1和**存储中间结果的栈**s2
  2. **从左至右**扫描中缀表达式
  3. 遇到**操作数**时，将其压入s2
  4. 遇到**运算符**时，**比较**其与运算符栈s1栈顶运算符的**优先级**：
     1. 如果**s1为空**，或**栈顶运算符为左括号“ ( ”**，则**直接**将其**入栈s1**
     2. 若优先级**比栈顶运算符高**，也**直接**将其**入栈s1**（括号不算运算符）
     3. 如果优先级**比栈顶运算符低**，则**将s1栈顶的运算符弹出压入s2**，**再次回到步骤(4-1)进行比较**
  5. 遇到**括号**时：
     1. 如果是**左括号**"（ "，则直接压入s1
     2. 如果是**右括号**" ）"，则依次弹出s1栈顶的运算符，并压入s2，直到左括号为止，此时将这一对括号**丢弃**
  6. 重复步骤2-5，**直到表达式的最右边**
  7. 将s1中剩余的运算符**依次弹出并压入s2**
  8. 依次弹出s2中的元素并输出，**结果的逆序及为中缀表达式对应的后缀表达式**

- **代码实现**：

  ```js
  import { priority, isOper, getArrayStack } from "./utils.js";
  let arrayStack = getArrayStack();
  
  // 中缀表达式转后缀表达式
  function infixToSuffix(infix) {
    if (typeof infix != "string") return;
    // 初始化两个栈
    let s1 = new arrayStack(10);
    let s2 = new arrayStack(10);
    // 将字符串分割为数组
    let arr = infix.split(" ");
    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
      if (isOper(arr[i])) {
        // 运算符--比较优先级
        if (s1.isEmpty() || arr[i] == "(") {
          // s1为空或运算符为左括号“（”  -- 直接入s1
          s1.push(arr[i]);
        } else if (priority(arr[i]) >= priority(s1.pickTop())) {
          // 优先级比栈顶运算符高--直接入栈s1
          s1.push(arr[i]);
        } else if (priority(arr[i]) < priority(s1.pickTop())) {
          // 优先级比栈顶运算符低--将s1栈顶运算符取出压入s2
          let oper = s1.pop();
          s2.push(oper);
        }
      } else if (arr[i] == "(") {
        // 左括号
        s1.push(arr[i]);
      } else if (arr[i] == ")") {
        // 右括号--依次弹出s1栈顶的运算符并压入s2，直到左括号
        while (true) {
          let oper = s1.pop();
          if (oper == "(") break;
          s2.push(oper);
        }
      } else {
        // 操作数
        s2.push(arr[i]);
      }
    }
    // 将s1中的运算符依次压入s2
    while(true){
      if(s1.isEmpty())break
      let oper = s1.pop()
      s2.push(oper)
    }
  
    // 输出s1
    s2.reverseList();
  }
  
  let infix = "1 + ( ( 2 + 3 ) * 4 ) - 5";
  
  infixToSuffix(infix);
  
  ```

  



## 递归（recursion）

### 递归的基本知识

- **递归需要遵循的重要规则**
  1. 执行一个方法时，就创建一个新的受保护的独立空间（栈空间）
  2. 方法的局部变量是独立的，不会相互影响，比如n变量
  3. 如果方法中使用的是引用类型变量，就会共享该引用类型的数据
  4. 递归必须向退出递归的条件逼近，否则就是无线递归（死归）
  5. 当一个方法执行完毕，或者遇到**return**，就会返回，遵循**谁调用**，就将**结果返回给谁**，同时当方法执行完毕或者返回时，该方法也就执行完毕
- **递归能解决什么样的问题？**
  1. 各种数学问题：八皇后、汉诺塔、阶乘问题、迷宫问题已经球和篮子问题等等
  2. 各种算法中也会使用到递归：快排、归并排序、二分查找、分治算法等
  3. 用栈解决的问题转换为用递归解决，代码可以更简洁

### 迷宫回溯问题

1. 定义一个**7*8的迷宫地图**，**规定如下**：
   1. 数字**0**表示**此路没走过**
   2. 数字**1**表示墙，**无法通过**
   3. 数字**2**表示**可以通过**
   4. 数字**3**表示此路**已经走过，但不通**
2. 定义**起点**为（1,1）
3. 定义**终点**为（5,6）
4. 定义一个**策略**（行走路线）：下 - 右 - 上 - 左

```js
// 迷宫回溯问题
// 定义一个迷宫地图
const map = [];
for (let i = 0; i < 7; i++) {
  map[i] = [];
  for (let j = 0; j < 8; j++) {
    if (i == 0 || i == 6) {
      map[i][j] = 1;
    } else if (j == 0 || j == 7) {
      map[i][j] = 1;
    } else {
      map[i][j] = 0;
    }
  }
}

// 设置挡墙
map[2][1] = 1;
map[3][1] = 1;

// 输出地图
console.log(map);

// 递归回溯找路
/*
  map:地图
  i  ：起点行
  j  ：起点列
 */
function findWay(map, i, j) {
  // 如果找到终点
  if(map[5][6] == 2 ){
    return true
  }else{
    // 没找到终点，判断当前道路是否走过
    if(map[i][j] == 0){
      // 还没走过 -- 根据策略尝试  下 - 右 - 上 - 左
      // 首先假设该点有路可以通过
      map[i][j] = 2
      if(findWay(map,i+1,j)){
        // 向下
        return true
      }else if(findWay(map,i,j+1)){
        // 向右
        return true
      }else if(findWay(map,i-1,j)){
        // 向上
        return true
      }else if(findWay(map,i,j-1)){
        // 向左
        return true
      }else{
        // 都走过了，但不通
        map[i][j] = 3
        return false
      }
    }else{
      // map[i][j] != 0   那么有可能是1,2,3
      return false
    }
  }
}
// 递归回溯找终点
findWay(map,1,1)
```

- **迷宫回溯最短路径**
  - 可以将几种策略运行的结果的路径存入数组，最后再比较哪种策略的数组最短，就是**最短路径**



### 八皇后问题

- **问题介绍**：在8*8的国际象棋上摆放八个皇后，使其不能相互攻击，即：**任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法。**

- **算法思路**：

  1. 第一个皇后先放第一行第一列
  2. 第二个皇后放在第二行第一列、然后判断该位置是否合理，如果合理，则继续放第二列、第三列、依次把所有列都放完，找到一个合适的
  3. 继续第三个皇后，还是第一列、第二列...直到第8个皇后也能放在一股不冲突的位置，算是找到了一个正确解
  4. **当得到一个正确解时，在栈回退到上一个栈时，就会开始回溯，会将第一个皇后在第一列的所有正确解全部都得到**
  5. **然后回头继续将第一个皇后放在第二列，后面继续循环执行1,2,3,4的步骤，得到所有解**

- **理论上**应该创建一个**二维数组来表示棋盘**，但是**实际上**可以**通过算法用一个一维数组来解决**。例如`arr = [0,4,7,5,2,6,1,3]`,**其中一维数组的下标 i 表示 第 i + 1 行，其对应的值 val 表示第 val + 1 列。**

- **代码示例**：

  ```js
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
  
  ```





## 算法的时间复杂度

### 时间频度

- 一个算法花费的时间与算法中语句的执行次数成正比例，哪个算法中语句执行次数多，它花费时间就多。**一个算法中的语句执行次数称为语句频度或时间频度。记为T(n)**
- 在我们讨论算法的时间复杂度时，随着n变大，通常可以将**常数项**、**低次项**、**系数忽略**

### 时间复杂度

1. 一般情况下，算法中的基本操作语句的重复执行次数是问题规模n的某个函数，用T(n)表示，若有某个辅助函数f(n)，使得当n趋近于无穷大时，**T(n)/f(n)**的极限值为不等于0的常数，则称f(n)是T(n)的同数量级函数，记作T(n) = O(f(n)),称O(f(n))为算法的**渐进时间复杂度**，简称**时间复杂度**。
2. T(n)不同，但时间复杂度可能相同。如：`T(n) = n^2 + 7n + 6 `与 `T(n) = 3n^2 + 2n + 2`的T(n)不同，但是时间复杂度相同，都为O(n^2)。
3. 计算时间复杂度的方法：
   1. 用常数1代替运行时间中的所有加法常数 T(n) = n^2 + 7n + 6  -> T(n) = n^2 + 7n + 1
   2. 修改后的运行次数函数中，只保留最高阶项   T(n) = n^2 + 7n + 1 -> T(n) = n^2
   3. 去除最高阶项的系数 T(n) = n^2 -> T(n) = n^2 -> O(n)

### 常见的时间复杂度

- **常见的时间复杂度**
  1. 常数阶**O(1)**
  2. 对数阶**O(log2n)**
  3. 线性阶**O(n)**
  4. 线性对数阶**O(nlog2n)**
  5. 平方阶**O(n^2)**
  6. 立方阶**O(n^3)**
  7. k次方阶**O(n^k)**
  8. 指数阶**O(2^n)**
- **说明**
  - 常见的算法时间复杂度**由小到大**依次为：**O(1) **< **O(log2n)** < **O(n)** < **O(nlog2n)** < **O(n^2)** < **O(n^3)** < **O(n^k)** < **O(2^n)**，随着问题规模n的不断增大，上述时间复杂度不断增大，算法的执行效率越低
  - 尽可能避免使用**指数阶**的算法（随着问题规模n的不断增大，指数阶增长巨快）

### 平均时间复杂度和最坏时间复杂度

- 平均时间复杂度

  1. 平均时间复杂度是指所有可能的输入实例均以等概率出现的情况下，该算法的运行时间
  2. 最坏情况下的时间复杂度称为最坏时间复杂度。一般讨论的时间复杂度均是最坏情况下的时间复杂度，这样做的原因是：最坏情况下的时间复杂度是算法在任何输入实例上运行时间的界限，这就保证了算法的运行时间不会比最坏情况更长
  3. 平均时间复杂度和最坏时间复杂度是否一致和算法有关

  ![](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\time.png)



## 算法的空间复杂度(Space Complexity)

1. **类似于时间复杂度的讨论**，一个算法的空间复杂度定义为该算法所耗费的存储空间，它也是问题规模n的函数
2. 空间复杂度是对一个算法在运行过程中临时占用存储空间大小的度量。有的算法需要占用的临时工作单元数与解决问题的规模n有关，它随着n的增大而增大，当n较大时，将占用较多的存储单元，例如快速排序和归并排序就属于这种情况
3. 在做算法分析时，主要讨论的是**时间复杂度**。从用户体验上看，更看重的是程序执行的速度。一些缓存产品(redis/memcache)和算法(基数排序)本质就是**用空间换时间**。



## 排序（Sort Algorithm）

- 排序是将一组数据，依指定的顺序进行排列的过程

### 排序的分类

- **内部排序**：指将需要处理的所有数据都加载到内部存储器中进行排序
- **外部排序**：数据量过大，无法全部加载到内存中，需要借助外部存储进行排序

### 常见排序算法

- **内部排序**：
  1. 插入排序
     1. 直接插入排序
     2. 希尔排序
        - 插入时有**交换法**和**移位法**之分，移位法效率更高
  2. 选择排序
     1. 简单选择排序
     2. 堆排序
  3. 交换排序
     1. 冒泡排序
     2. 快速排序
  4. 归并排序
  5. 基数排序
- **外部排序**



### 冒泡排序（Bubble Sort）

- **普通实现**

  ```js
  // 冒泡排序
  /* 
      order表示正反排序
  */
  function BubbleSort(arr,order){
      // 数据校验
      if(!(arr instanceof Array) && typeof(order !== 'number')return
  
      // 排序
      let temp = 0
      for(let i=0;i<arr.length -1;i++){
          for(let j=0;j<arr.length -1 -i;j++){
              if(arr[j] > arr[j+1]){
                  temp = arr[j]
                  arr[j] = arr[j+1]
                  arr[j+1] = temp
              }
          }
      }
      if(order == 1){
          return arr
      }else if(order == -1){
          return arr.reverse()
      }
  }
  ```

  

- **冒泡排序的优化**

  - 有些情况排序还没执行完毕时，数据的顺序已经排列好了，但是此时程序还会继续执行完毕，浪费了性能，因此可以判断排序是否提前完成，如果提前完成，就直接结束排序
  - **实现思路**：添加一个标识，判断是否进入`if(arr[j] > arr[j+1])`，没进入说明有序

  ```js
  // 冒泡排序
  /* 
      order表示正反排序
  */
  function bubbleSort(arr, order) {
    // 数据校验
    if (!(arr instanceof Array) && typeof (order !== "number")) return;
    // 排序
    let temp = 0;
    let flag = true;
    for (let i = 0; i < arr.length - 1; i++) {
      if (!flag) break;// 判断上一次有没有进入arr[j] > arr[j+1]
      flag = false;
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          flag = true;
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  
    switch (order) {
      case 1:
        return arr;
      case -1:
        return arr.reverse();
      default:
        break;
    }
  }
  ```


### 选择排序（Selection Sort）

- 选择排序也属于内部排序法，是从欲排序的数据中，按制定的规则选出某一元素，再依规定交换位置后达到排序的目的。

- 选择排序一共会执行**数组长度-1**次排序

- **排序思路**：

  1. 先假设当前这个数是数组中最小的数
  2. 然后和后面的数逐个比较，如果发现有比当前数更小的数，就重新确定最小数，并得到其下标
  3. 当遍历到数组的最后时，就得到了本轮的最小数和下标
  4. 将当前最小数和本轮得到的最小数进行交换

- **代码实现**：

  ```js
  // 选择排序
  function SesectionSort(arr){
      // 数据校验
      if(!(arr instanceof Array))return
      // 记录最小值及其下标
      let minValue = 0
      let minIndex = 0
      for(let i=0;i<arr.length;i++){
          // 假设最小值
          minValue = arr[i]
          minIndex = i
          for(let j=i+1;j<arr.length;j++){
              if(minValue > arr[j]){
                  // 说明假定的最小值有误,更新最小值及其下标
                  minValue = arr[j]
                  minIndex = j
              }
          }
          // 判断是否进入最小值假定失败的情况
          if(minIndex != i){
              // 交换最小值
              arr[minIndex] = arr[i]
              arr[i] = minValue
          }
      }
      return arr
  }
  
  let arr1 = [3,5,8,1,9,10,6]
  let arr2 = SesectionSort(arr1)
  console.log(arr1);// [1,3,5,6,8,9,10]
  ```




### 插入排序（Insertion Sort）

- 对欲排序的元素以插入的方式来寻找该元素的适当位置，以达到排序的目的

- **插入排序思路**：

  1. 选择一个**待插入值**，**通常选择数组下标为1**的那个，以数组下标1为分界线，**左侧**看做为**有序排列**的，**右侧**看为**无序排列**的
  2. 再选择**待插入下标**，为**待插入值的下标-1**
  3. 进入循环，循环的判断条件为**待插入下标要大于等于0**且**待插入值小于待插入下标处的值**（从小到大排序），进入该循环说明待插入值还没有找到应该插入的位置（**因为待插入值还没有比其左侧的值大**），因此将**待插入下标所指的值移动到当前待插入值处**（待插入值此时被覆盖，但是已经事先用变量保存的了），**然后将待插入下标-1**（即左移）
  4. 当跳出循环后，说明待插入值已经比左侧的值大了，那么此时已经找到了应该插入的位置，即**待插入下标+1**

- **注意事项**：

  1. **待插入值取数组下标为1**就是为了左边只保留一个，然后就可以把左边看为一个有序排列的，接下来比较时只需要比较有序排列的最后一个值即可
  2. **待插入值**每轮循环都需要先用一个变量存起来，不然每次相邻项移动时会将待插入值**覆盖**
  3. **待插入值**和**待插入下标**始终**相邻**，`arr[待插入下标 + 1] = 待插入值`

- **代码实现**：

  ```js
  // 插入排序
  // arr = [3,5,6,2,4]
  function InsertionSort(arr){
      if(!(arr instanceof Array)return
      for(let i = 1;i<arr.length;i++){
          // 待插入值
          let insertionVal = arr[i]
          // 待插入位置
          let insertionIndex = i-1
          // insertionVal < arr[insertionIndex]时说明还没找到插入的位置，需要将arr[insertionIndex]后移（从小到大排序）
          while(insertionIndex>=0 && insertionVal < arr[insertionIndex]){
              arr[insertionIndex+1] = arr[insertionIndex]
              insertionIndex--
          }
          // 退出循环时说明插入的位置已找到
          arr[insertionIndex + 1] = insertionVal
      }
      return arr
  }
  
  let arr1 = [3,5,6,2,4]
  let arr2 = InsertionSort(arr1)
  console.log(arr2);// [2,3,4,5,6]
  ```




### 希尔排序（Shell Sort）

- **希尔排序介绍**

  - 希尔排序也是一种插入排序，他是简单插入排序经过改进之后的一个更高效的版本，也称为**缩小增量排序**

- **希尔排序基本思想**

  - 希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰好被分成一组，算法便终止

- **希尔排序的优势**

  - 根据步长将数组分组进行比较，可较快的将较小的数交换至前面，避免插入排序时，较小的数在后面时，需要挨个移动
  - **但是，希尔排序插入时采用交换法时，效率极低，导致效率甚至不如基本的插入排序，但是插入时采用优化时效率就大大提高**

  <img src="C:\Users\Administrator\Desktop\数据结构和算法\img\排序\ShellSort.png" style="zoom: 80%;" />

- **希尔排序插入时交换法代码实现**

- **注意事项**

  1. 数组分组时步长gap必须是一个整数，且**不考虑四舍五入**，通通**向下取整**

  2. i 的值控制了每次比较都是将每一组都比较一次，如此往复，并**不是将某一组一次性比较完**
  3. **i 从 gap 往上增长的过程中，每一组前面的数据只是相邻项进行了大小比较，但是比较后值交换后的顺序是不得而知的，因此每一组比较时j的值应该不断-gap往前挪再将前面的进行比较才能保证顺序**

  ```js
  // 希尔排序在插入时--交换法实现
  function shellSort(arr) {
    if (!(arr instanceof Array) return;
    let count = 0;
    for (let gap = parseInt(arr.length / 2); gap > 0; gap = parseInt(gap / 2)) {
      let temp = 0; // 用于交换
      for (let i = gap; i < arr.length; i++) {
          // i的值控制了每次比较都是将每一组都比较一次，如此往复，并不是将某一组一次性比较完
        for (let j = i - gap; j >= 0; j -= gap) {
          // i从gap往上增长的过程中，每一组前面的数据只是相邻项进行了大小比较，但是比较后值交换后的顺序是不得而知的，因此每一组比较时j的值应该不断-gap往前挪再将前面的进行比较才能保证顺序
          if (arr[j] > arr[j + gap]) {
            temp = arr[j];
            arr[j] = arr[j + gap];
            arr[j + gap] = temp;
          }
        }
      }
      count++;
      console.log("希尔排序插入时交换法第" + count + "轮：", arr);
    }
  }
  
  let arr = [8,9,1,7,2,3,5,4,6,0];
  shellSort(arr);
  
  ```



- **希尔排序插入时移位法代码实现**

  - 插入时采用交换法时，交换操作执行太多次，从而导致效率极低
  - 因此插入时采用**移位法**进行优化

  ```js
  // 希尔排序在插入时--移位法实现
  function shellSortOfShift() {
    if (!(arr instanceof Array) return;
    for (let gap = parseInt(arr.length / 2); gap > 0; gap = parseInt(gap / 2)) {
      for (let i = gap; i < arr.length; i++) {
        let j = i;
        let temp = arr[j]; // 临时变量存储待插入值
          // 只有当arr[j]<arr[j-gap]时我们才需要移位找插入位置，因为希尔排序左侧是一个有序序列
        if (arr[j] < arr[j - gap]) {
          // 移位找待插入位置
          while (j - gap >= 0 && temp < arr[j - gap]) {
            // 移位
            arr[j] = arr[j - gap];
            j -= gap;
          }
          // 当退出while循环时，说明找到了temp应该插入的位置,插入即可
          arr[j] = temp;
        }
      }
    }
    console.log(arr);
  }
  
  let arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];
  shellSortOfShift(arr);
  ```

- **移位法不也是每次移位都要进行赋值操作吗，为什么效率就比交换法高呢？**

  - 插入采用**移位法**时，待插入值左侧的数据会一直保持一个**有序数列**，因此移位操作进行的次数并没有想象的那么大，但是**交换法时**，**每一组的交换都会从后往前逐个比较后然后进行交换才能保证一直有序**，当数据的量级较大时，那么每一组的交换次数就会大大的提升，极大的影响的效率

  

### 快速排序（Quick Sort）

- 快速排序是对冒牌排序的一种改进。

- **基本思想**：通过一次排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以**递归**进行，以此达到整个数据变成有序序列

- 中间这个**基准值**可以根据自己喜好选取

  ![](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\QuickSort.png)

- **快速排序理解难点**：

  1. **在左右两侧找数值和中值进行比较交换后，需要判断交换后的值是否和中值相等，因为如果相等的话，此时`arr[l] < pivot`的条件肯定不满足，也就是说此时 l 的值不会再变化，右侧同理。l  和 r 如果不再变化，那么 `l >= r`这个条件将不可能完成，那么就会变成死龟**。因此我们需要对交换后的值进行一个校验，**交换后如果`arr[l] == pivot`，那么此时我们应该将右侧的索引`r--`**，**交换后如果`arr[r] == pivot`，那么此时我们应该将左侧的索引`l++`**。这样就可以避免因为交换后的值和中值pivot相等而导致索引不再变化的窘境
  2. 要对`l == r`的情况进行处理，此时需要将`l++ r--`,即需要将其错开，避免左右递归时，`l == r`会导致左右序列有重合

- **代码实现**

  ```js
  // 快速排序
  function QuickSort(arr, left, right) {
    if (!(arr instanceof Array)) return;
    let l = left; // 左下标
    let r = right; // 右下标
    let pivot = arr[parseInt((l+r)/2）]; // 中轴值
    let temp = 0;
    while (l < r) {
      // 在pivot中值左边一直找，直到找到值大于等于pivot才退出
      while (arr[l] < pivot) {
        l++;
      }
      // 在pivot右边一直找，直到找到值小于等于pivot才退出
      while (arr[r] > pivot) {
        r--;
      }
      // 当l>r时，说明左侧都比中值小，右侧都比中值大了(递归的出口)
      if (l >= r) {
        break;
      }
      // 交换
      temp = arr[l];
      arr[l] = arr[r];
      arr[r] = temp;
  
      // 交换完后还需要进行校验,若交换完后arr[l] == pivot,
      //那么此时应该把右侧r的值向左移动一下，
      //不然下一轮循环时，arr[l]<pivot这个条件始终不满足，那么l将不在移动，右侧同理
      //（l和r不移动将导致 l>=r 不可能满足，从而导致死龟）
      if (arr[l] == pivot) {
        r--;
      }
      if (arr[r] == pivot) {
        l++;
      }
    }
    // 经过上述操作，此时已经根据中值pivot将值进行分割，
    //左侧均小于pivot,右侧均大于pivot,但两侧都不保证有序！还要对左右两侧进行递归排序
    if (l == r) {
      l++;
      r--;
    }
    // 左递归
    if (left < r) {
      QuickSort(arr, left, r);
    }
    // 右递归
    if (l < right) {
      QuickSort(arr, l, right);
    }
    return arr;
  }
  
  let arr = [
    2, 4, 6, 3, 2, 31, 5, 15, 3, -35, -54, 32, 2352, 65, -2334, 324, 2342,
  ];
  let res = QuickSort(arr, 0, arr.length - 1);
  console.log(res);
  
  ```




### 归并排序（Merge Sort）

- 归并排序是利用归并的思想实现的排序方法，该算法采用经典的**分治（divide-and-conquer）策略**。（分治法将问题**分**（**divide**）成一些小的问题然后递归求解，而**治**（**conquer**）的阶段则将分的阶段得到的各答案“修补”在一起，即**分而治之**）

- 归并排序的**时间复杂度**是**线性**的，合并的次数是`数组长度-1`

- **基本思想** 

  - **序号为递归执行顺序**

  ![](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\MergeSortThink.png)

- **合并流程**

  ![](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\MergeSort.png)

- **理解难点**：

  1. **右侧的起始值为什么是`mid+1`?** 
     - 这是因为我们将左侧的值的范围定的是`left 到 mid`，那么右侧起始值自然就是`mid+1`
  2. **合并时为什么多一个记录中间索引的变量mid?**
     - 因为区分左右两侧数据需要中间索引
  3. **每次合并后temp中的数据已经是有序的了，为什么还要将其再次赋值给arr？**
     - 因为我们是利用递归来实现的排序，且我们的操作最终都是要落实到 arr 上的，这样最后的结果才能在 arr 上得到体现

- **代码实现**：

  ```js
  // 归并排序
  
  /**
   *
   * @param {Array} arr 待排序数组
   * @param {Number} left 左侧开始索引
   * @param {Number} mid 中间索引
   * @param {Number} right 右侧结束索引
   * @param {Array} temp 中转数组
   */
  function merge(arr, left, mid, right, temp) {
    let i = left; // 记录左侧起始索引
    let j = mid + 1; // 记录右侧起始索引
    let t = 0; // 记录中转数组起始下标
    while (i <= mid && j <= right) {
      // 将左右两侧值进行比较将较小的值放入临时数组（从小到大排序）
      if (arr[i] <= arr[j]) {
        temp[t] = arr[i];
        t++;
        i++;
      } else {
        temp[t] = arr[j];
        t++;
        j++;
      }
    }
    // 出了上面循环后，说明左右两侧肯定有一侧的数据已经比较完了
    // 此时需要将剩余的那一侧的数据依次放入临时数组
    while (i <= mid) {
      temp[t] = arr[i];
      t++;
      i++;
    }
    while (j <= right) {
      temp[t] = arr[j];
      t++;
      j++;
    }
  
    // 经过上述操作，此时temp已经是有序的了，此时将temp的值拷贝到arr
    t = 0;
    let tempLeft = left;// 左侧起始索引不能变，因此用一个临时变量代替遍历
    while (tempLeft <= right) {
      arr[tempLeft] = temp[t];
      tempLeft++;
      t++;
    }
  }
  
  /**
   *
   * @param {Array} arr
   * @param {Number} left
   * @param {Number} right
   * @param {Array} temp
   */
  function mergeSort(arr, left, right, temp) {
    if(left < right){
      let mid = parseInt((left + right) / 2);
      // 向左递归分解
      mergeSort(arr,left,mid,temp)
      // 向右递归分解
      mergeSort(arr,mid+1,right,temp)
      // 合并
      merge(arr,left,mid,right,temp)
    }
    return arr
  }
  
  let arr = [2,-32,34,223,6,8,9,3,34,24,343,81,45]
  let temp = []
  let res = mergeSort(arr,0,arr.length-1,temp)
  console.log(res);// [ -32,  2,  3,  6,  8, 9, 24, 34, 34, 45, 81, 223, 343]
  
  ```



### 基数排序（Radix Sort）

- **基数排序（桶排序介绍）**

  1. 基数排序属于 “分配式排序”（distribution sort），又称 “桶子法”（bucket sort）或 bin sort，顾名思义，它是通过键值的各个位的值，将要排序的元素分配至某些 “桶”中，达到排序的作用
  2. 基数排序法是属于稳定性的排序，是效率高的稳定性排序法
  3. 基数排序是 “桶排序”的扩展
  4. 基数排序是1887年赫尔曼-何乐礼发明的。它是这样实现的：将整数按位数切割成不同的数字，然后按每个位数分别比较

- **基本思想**

  - 将所有待比较数值统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后，数列就变成一个有序序列
  - 执行轮数取决于数组中最大数的位数

  ![](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\RadixSort.png)

- **基数排序注意事项**

  1. 不能处理负数
  2. 每轮从桶中取出数据后将桶中的数据置空
  3. 每轮结束后将记录每个桶中数据个数的数组进行初始化
  4. 基数排序也是典型的**空间换时间**的算法

- **代码实现**

  ```js
  // 基数排序
  function radixSort(arr) {
    if (!(arr instanceof Array)) return;
    let buckets = []; // 存储所有桶
    // 添加十个桶
    for (let i = 0; i < 10; i++) {
      buckets[i] = [];
    }
    // 定义一个一维数组存放每个桶内部存储的数据的个数
    let bucketSaveCounts = [];
    // 初始化一维数组
    for (let i = 0; i < 10; i++) {
      bucketSaveCounts[i] = 0;
    }
  
    // 获得数组中最大值的位数（因为排序的次数取决于数组中最大值的位数-1）
    let maxValLen = (Math.max(...arr) + "").length;
    let index = 0;
    for (let count = 0; count < maxValLen; count++) {
      // 针对每个元素的个位进行排序处理
      for (let i = 0; i < arr.length; i++) {
        // 记录当前位数   个位 十位 ..
        let unitsDigit = parseInt(arr[i] / Math.pow(10, count)) % 10;
        // 根据位数，将值放入对应的backet中(注意这里不能用i bucket[unitsDigit][i])
        buckets[unitsDigit][bucketSaveCounts[unitsDigit]] = arr[i];
        // 更新bucketSaveCounts中对应桶存储的数量
        bucketSaveCounts[unitsDigit]++;
      }
      // 桶中元素已经放好，需要将其取出重新放入arr
      index = 0;
      for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < bucketSaveCounts[i]; j++) {
          if (buckets[i].length !== 0) arr[index++] = buckets[i][j];
        }
        // 该桶元素放好后将其置空
        buckets[i] = []
      }
      // 每一轮结束需要将bucketSaveCounts统计的数量置0
      for (let i = 0; i < 10; i++) {
        bucketSaveCounts[i] = 0;
      }
    }
    return arr;
  }
  
  let arr1 = [3, 324, 542, 123, 53, 64, 87, 33, 21, 13, 245,132];
  let res = radixSort(arr1);
  console.log(res);// [ 3, 13, 21, 33, 53, 64, 87, 123, 132, 245, 324, 542]
  ```



### 堆排序（Heap Sort）

- **基本介绍**

  1. 堆排序是利用**堆**这种数据结构而设计的一种排序算法，堆排序是一种**选择排序**，它的最坏，最好，平均时间复杂度均为O(nlogn)，它也是**不稳定排序**
  2. 堆是具有以下性质的**完全二叉树**：**每个节点的值都大于或等于其左右子节点的值**，称为**大顶堆**，**注意**：**没有要求节点的左子节点的值和右子节点的值的大小关系**
  3. **每个节点的值都小于或等于其左右子节点的值**，称为**小顶堆**

  ![大顶堆](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\pileSort.png)

  ![小顶堆](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\pileSortMin.png)

- **堆排序的基本思想**
  1. 将**待排序序列**构造成一个**大顶堆**或**小顶堆**（以数组形式存储）
  2. 此时，整个序列的最大值（或最小值）就是**堆顶的根节点**
  3. 将其与末尾元素进行交换，此时末尾就为最大值（或最小值）
  4. 然后将剩余 n - 1 个元素重新构造成一个堆，这样会得到 n 个元素的次小值。如此反复执行，便能得到一个有序序列了

- **代码实现**

  - 将一个数组**以索引为 i** 的**非叶子节点**为**根节点**的**子树**调整成大顶堆或小顶堆

    ```js
     // HeapSort类
      /**
       * 将一个数组以索引为i的非叶子节点为根节点的子树调整成大顶堆或小顶堆
       * @param {Array} arr 待调整的数组
       * @param {Number} i 表示非叶子节点在数组中的索引
       * @param {Number} length 表示对多少个元素进行调整，length是在逐渐减少的
       */
      adjustHeap(arr, i, length) {
        // 存储当前元素的值
        let temp = arr[i];
        // 开始调整  k = i * 2 + 1  是因为非叶子节点i和其左子节点的关系为  k = i * 2 + 1
        for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
          // arr[k] < arr[k+1]表示左子节点的值小于右子节点的值
          if (k + 1 < length && arr[k] < arr[k + 1]) {
            k++; // 这种情况使k指向右子节点
          }
          // 到这里后，k指向的一定是左、右子节点中较大的一个
          if (arr[k] > temp) {
            // 如果子节点大于了父节点，就将其赋值给当前节点（大顶堆）
            arr[i] = arr[k];
            // 更新i的索引，循环比较
            i = k;
          } else {
            // 这里说明arr[k]<= temp,则arr[i]的值就是三者（当前非叶子节点及其左、右子节点）中最大的，不做改变
            break;
          }
        }
        // 当推出for循环后，已经将以i为父节点的树的最大值放在了当前子树的最顶部（局部的）
        // 再将顶部的值交换到被调换的位置（这里的i已经不是非叶子节点的索引，已经是被调换的节点的索引了）
        arr[i] = temp;
      }
    ```

  - **完成堆排序**

    -  `i = parseInt(arr.length / 2) - 1`是获取索引最大的非叶子节点

    ```js
    // HeapSort类
    // 堆排序的方法
      heapSort(arr) {
        let temp = 0
        // 将数组整体转换为大顶堆或小顶堆
        for (let i = parseInt(arr.length / 2) - 1; i >= 0; i--) {
            this.adjustHeap(arr,i,arr.length)
        }
    
        // 将堆顶元素与末尾元素交换（大顶堆）
        // 重新调整结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素
        // 反复执行调整+交换步骤，直到整个序列有序
        for(let j = arr.length -1;j>0;j--){
            // 交换
            temp = arr[j]
            // 每次经过adjustHeap的调整，最大的值都会在索引为0的地方
            arr[j] = arr[0]
            arr[0] = temp
            // 每次调整的长度都会逐渐减少（最大的已经确定，不用再管）
            this.adjustHeap(arr,0,j)
        }
        return arr
      }
    ```

    

### 排序算法的时间复杂度总结

![](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\sortSummary.png)



## 查找算法

### 线性查找

- 线性查找非常简单，就遍历一下数组，和待查找值进行比对，如果找到则返回对应的下标，没找到则返回-1（查找单个值）

- 查找多个值可以将结果存入集合便可

### 二分查找(递归)

- 二分查找算法的查找对象只能是一个**有序数组**

- **算法思路**

  1. 确定有序数组的中间下标mid
  2. 让待查找数 value 和 arr[mid] 进行比较
     1. `value > arr[ mid ] `， 则待查找数应该在 mid 下标右侧，因此需要使用**递归**向右查找
     2. `value < arr[ mid ] `,    则待查找数应该在 mid 下标左侧，因此需要使用**递归**向左查找
     3. ` value == arr[ mid ]`,   找到结果，返回对应下标
  3. 什么时候结束递归？
     1. 找到了对应的值
     2. 递归完整个数组仍然找不到对应的值，即（`left > right`）

- **代码实现**

  - 注意递归时需要将递归的结果进行一个`return`**返回**，不然拿不到最终的结果
  - 如果想要查找**同一个值的所有下标**，那么只需要再**最终拿到结果下标`mid`时**，**先不着急将其返**回，而是往这个**索引左右两侧**进行**扫描**，看还有没有相同的值，最终将这些结果添加到一个数组中进行**统一返回**

  ```js
  /**
   * 二分查找
   * @param {Array} arr // 必须是一个有序的数组
   * @param {Number} left
   * @param {Number} right
   * @param {Number} value
   */
  function binarySearch(arr, left, right, value) {
    let l = left;
    let r = right;
    let mid = parseInt((l + r) / 2);
    // 判断数组是升序还是降序
    let order = arr[0] - arr[1] > 0 ? -1 : 1;
    if (l > r) {
      // 遍历完了也没找到
      return -1;
    }
    // 比较
    if (value > arr[mid]) {
      if (order == 1) {
        // 升序，向右递归
        return binarySearch(arr, mid + 1, right, value);
      } else {
        // 降序，向左递归
        return binarySearch(arr, left, mid - 1, value);
      }
    } else if (value < arr[mid]) {
      if (order == 1) {
        // 升序，向左递归
        return binarySearch(arr, left, mid - 1, value);
      } else {
        // 降序，向右递归
        return binarySearch(arr, mid + 1, right, value);
      }
    } else {
      // 找到了
      return mid;
    }
  }
  
  let arr = [7,6,5,4,3,2,1];
  
  let res = binarySearch(arr, 0, arr.length - 1, 1);
  console.log(res);// 6
  
  ```



### 插值查找

- **插值查找算法原理介绍**

  1. 插值查找算法类似于二分查找（因此也要求数组是**有序**的），不同的是插值查找每次从**自适应mid**处开始查找

  2. 将折半查找中的求**mid**索引的公式，low表示左侧索引，**high**表示右侧索引
     $$
     mid = (low + high)/2 = low + (high-low)/2
     $$

     $$
     改为： mid = low + (key-arr[low])(high-low)/(arr[high]-arr[low])
     $$

  3. `let midIndex = low + (high-low)(key-arr[low])/(arr[high]-arr[low])`,其中 midIndex 称为插值索引

  4. 插值查找算法对**数据比较连续**的情况下**mid的定位会非常快**，因此在数据比较连续的情况下插值查找算法更好

![](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\insertionSearch.png)

- **注意事项**

  - 插值查找时**递归结束条件**要注意**待查询值**是否**超过了有序序列的最大最小值**，**因为待查询值参与了中间下标的运算,如果不对该结束条件进行限制，会出现中间下标越界的情况**

- **代码实现**

  ```js
  /**
   * 插值查找算法
   * @param {Array} arr
   * @param {Number} left
   * @param {Number} right
   * @param {Number} value
   */
  function insertValueSearch(arr, left, right, value) {
    let l = left;
    let r = right;
    let mid = l + ((value - arr[l]) * (r - l)) / (arr[r] - arr[l]);
    let order = arr[0] > arr[1] ? -1 : 1;
  
    // 插值查找时递归结束条件要注意待查询值是否超过了有序序列的最大最小值，
    //因为待查询值参与了中间下标的运算,如果不对该结束条件进行限制，会出现中间下标越界的情况
    if (order == 1 && (l > r || value < arr[0] || value > arr[arr.length - 1]))
      return -1;
  
    if (order == -1 && (l > r || value > arr[0] || value < arr[arr.length - 1]))
      return -1;
  
    if (value > arr[mid]) {
      if (order == 1) {
        // 升序，向右递归
        return insertValueSearch(arr, mid + 1, right, value);
      } else {
        // 降序，向左递归
        return insertValueSearch(arr, left, mid - 1, value);
      }
    } else if (value < arr[mid]) {
      if (order == 1) {
        // 升序，向左递归
        return insertValueSearch(arr, left, mid - 1, value);
      } else {
        // 降序，向右递归
        return insertValueSearch(arr, mid + 1, right, value);
      }
    } else {
      // 找到了
      return mid;
    }
  }
  
  let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  let res = insertValueSearch(arr, 0, arr.length - 1, 9);
  console.log(res);// 1
  ```

  

### 斐波那契（黄金分割法）查找

- 基本介绍

  1. 黄金分割点是指**把一条线段分割成两段**，使**其中一部分与全长之比**等于**另一部分与该部分之比**。取其三位数字的近似值是0.618。由于按此比例设计的造型十分美丽，因此称为**黄金分割**，也称为**中外比**。这是一个神奇的数字，会带来意向不到的效果

  2. **斐波那契数列**`[1,1,2,3,5,8,13,21,34,55, ...]`发现斐波那契数列数列的两个相邻数的比例，无限接近黄金分割值0.618
  3. 该算法仍需要满足查找的是一个**有序序列**

- **原理介绍**

  - 斐波那契查找原理和前面的两种查找相似，仅仅是中间下标mid的位置的求法不同，而是使其位于黄金分割点附近，即`mid = low + F(k-1)-1`，其中F表示斐波那契数列

- **对`F(k-1)-1`的理解**

  1. 由斐波那契数列`F[k] = F[k-1] + F[k-2]`的性质可知，`F[k]-1 = (F[k-1]-1) + (F[k-2]-1) + 1`，该式说明：只要顺序表的长度为`F[k] - 1`，则可以将该表分成长度为`F[k-1] - 1`和`F[k-2] - 1`的两段，从而中间位置为`mid = low + F[k-1] - 1`

     ![](C:\Users\Administrator\Desktop\数据结构和算法\img\排序\fib.png)

  2. 因此类似的每一个子段也可以用相同的方式进行分割

  3. 但顺序表的长度 n 不一定刚好等于`F[k] - 1`，所以需要将原来的顺序表长度 n 增加至`F[k] - 1`。这里的 k 值只要能使得`F[k] - 1`恰好大于或等于 n 即可，由以下代码得到，顺序表长度增加后，新增的位置（从 n + 1 到 `F[k] - 1`位置），都赋为 n 位置的值即可。

     ```js
     while(n > fib(k) -1)
         k++;
     ```

- **难点理解**

  1. `while(high > fib[k] - 1) k++`这段代码是为了找到使**有序列表的长度**刚好是**斐波那契数列中对应某一值-1**的那个**k值**，要根据这个**k值**来对该有序列表进行一个**扩容**
  2. 拿到 mid 后 对值进行比较时
     1. `key < arr[mid]`需要向左侧找时，`k = k-1`是因为`F[k]-1 = (F[k-1]-1) + (F[k-2]-1) + 1`，这就说明左侧的这一段的索引的**变化步长为1**。同理**右侧**时索引的**变化步长为 2** 
     2. 当`key == arr[mid]`时，说明此时已经找到了，但是此时需要判断 mid 和 high的值的大小，返回其小的那一个，这是为啥？
        - 因为我们的原始数组的长度可能不符合`fib[k]-1`这个值，因此如果我们数组的长度如果**小于等于**`fib[k]-1`对应的**值**时，我们需要对**原始数组进行**一个**扩容**，并且后面扩容的位置的值都是**以原始数组最后一个数来填充**的，因此**为了防止查找的是靠右侧的值的时候，此时可能会出现有多个值符合条件**，因此我们**需要返回的是下标较小的那个**

- **代码实现**

  ```js
  /**
   * 斐波那契查找
   * @param {Array} arr 被查找序列
   * @param {Number} key 查找的值
   */
  function fibonacciSearch(arr, key) {
      let low = 0
      let high = arr.length-1
      let k = 0//斐波那契数列分割数值的下标
      let mid = 0
      let fibArr = fib(50)// 获取斐波那契数列
      // 获取到斐波那契分割数值的下标
      while(high > fibArr[k]-1){
          k++
      }
      // 因为fibArr[k]对应的值可能大于arr数组的长度，因此我们对arr数组进行一下扩容
      if(fibArr[k]-1 >= arr.length){
          for(let i=arr.length;i<fibArr[k];i++){
              arr[i] = arr[high]
          }
      }
      // 利用循环来找到key（low <= high 便可继续找）
      while(low <= high){
          mid =low + fibArr[k-1]-1
          // 拿到mid后进行判断
          if(key < arr[mid]){
              // 向左侧找
              high = mid-1
              // 因为fibArr[k] - 1 = fibArr[k-1] - 1 + fibArr[k-2] - 1 + 1,则左侧就是fibArr[k-1],因此需要k = k-1
              k = k-1
          }else if(key > arr[mid]){
              // 向右寻找
              low = mid+1
              k = k-2
          }else{
              // 此时key == arr[mid]，则找到啦，但是需要判断应该返回哪个下标
              if(mid <= high){
                  return mid
              }else{
                  return high
              }
  
          }
      }
      // 执行到这里说明在上面while里一直没找到，则返回-1
      return -1
  
  }
  
  // 准备一个斐波那契数列(非递归方式)
  function fib(maxSize) {
    let f = [];
    f[0] = 1;
    f[1] = 1;
    for (let i = 2; i < maxSize; i++) {
      f[i] = f[i - 1] + f[i - 2];
    }
    return f;
  }
  // 递归方式获取斐波那契数列
  function fibRecursion(maxSize) {
    if(maxSize == 1){
      return [1]
    }else if(maxSize == 2){
      return [1,1]
    }else{
      return fibRecursion(maxSize-1) + fibRecursion(maxSize-2)
    }
  }
  
  let arr = [1,23,33,53,65,75,234,645,1234,4224]
  let res = fibonacciSearch(arr,1234)
  console.log(res);//8
  ```




## 哈希表（Hash Table）

### 基本介绍

- 哈希表，又叫散列表，是根据关键码值（key value）而直接进行访问的**数据结构**。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做**散列函数**，存放记录的**数组**叫做哈希表（散列表）。

### 实现思路

- 所谓哈希表，可将其拆解为三个类，其分别是
  1. Emplayee  这代表链表上的一个**节点**  （以 雇员类 为例）
  2. EmplayeeLinkList  这代表由一个个**节点组成的链表**  （以 雇员链表类 为例）
     - 内部维护对**节点**的**增删改查**
  3. hashTable  这代表**存储一条条链表的哈希表**  
     - hashTable内会维护一个**散列函数**，它接收一个**节点**的参数（以 id 为例），根据这个参数进行一定的规则运算，得到一个**该节点在哈希表中应该在哪一条链上的位置**
     - 调用链表原本的方法**重写增删改查**

- **代码实现**

  ```js
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
  
  ```




## 树（Tree）

### 树的常用术语

- **图示**

<img src="C:\Users\Administrator\Desktop\数据结构和算法\img\树\tree.png" style="zoom: 50%;" />

- **术语介绍**
  1. 节点
  2. 根节点
  3. 父节点
  4. 子节点
  5. 叶子节点（没有子节点的节点）
  6. 节点的权（节点值）
  7. 路径（从root节点找到该节点的路线）
  8. 层（同一排的节点）
  9. 子树
  10. 树的高度（最大层数）
  11. 森林（多颗子树构成森林）



### 二叉树

- 基本介绍
  1. 树的种类有很多，每个节点**最多只能有两个子节点**的一种形式称为二叉树。
  2. 二叉树的子节点分为**左节点**和**右节点**
  3. 如果该二叉树的所有叶子节点都在最后一层，并且**节点总数 = 2^n-1，n为层数**，则我们称为**满二叉树**
  4. 如果该二叉树的所有叶子节点都在最后一层或者倒数第二层，而且**最后一层的叶子节点在左边连续**，**倒数第二层的叶子节点在右边连续**，我们称为**完全二叉树**

<img src="C:\Users\Administrator\Desktop\数据结构和算法\img\树\erchaTree.png" alt="二叉树" style="zoom:80%;" />

- **二叉树的遍历**
  1. 前序遍历：**先输出父节点**，再遍历左子树和右子树
  2. 中序遍历：先遍历左子树，**再输出父节点**，再遍历右子树
  3. 后序遍历：先遍历左子树，再遍历右子树，**最后输出父节点**
  4. 小结：**根据父节点的输出顺序**就可以**确定**是前序、中序还是后序
  
  ```js
  // 二叉树
  
  // heroNode节点
  class HeroNode {
    #name;
    #id;
    #left = null; // 左指针
    #right = null; // 右指针
    constructor(id, name) {
      this.#id = id;
      this.#name = name;
    }
  
    getId() {
      return this.#id;
    }
    setId(id) {
      this.#id = id;
    }
    getName() {
      return this.#name;
    }
    setName(name) {
      this.#name = name;
    }
    getLeft() {
      return this.#left;
    }
    setLeft(node) {
      this.#left = node;
    }
    getRight() {
      return this.#right;
    }
    setRight(node) {
      this.#right = node;
    }
  
    // 前序遍历
    preOrder() {
      console.log({id:this.#id,name:this.#name});
      // 递归向左子树前序遍历
      if (this.#left != null) {
        this.#left.preOrder();
      }
      // 递归向右子树前序遍历
      if (this.#right != null) {
        this.#right.preOrder();
      }
    }
    // 中序遍历
    infixOrder() {
      // 先递归向左中序遍历左子树
      if (this.#left != null) {
        this.#left.infixOrder();
      }
      // 输出父节点
      console.log({id:this.#id,name:this.#name});
      // 再递归向右中序遍历右子树
      if (this.#right != null) {
        this.#right.infixOrder();
      }
    }
    // 后序遍历
    postOrder() {
      // 先递归向左后序遍历左子树
      if (this.#left != null) {
        this.#left.postOrder();
      }
      // 再递归向右后序遍历右子树
      if (this.#right != null) {
        this.#right.postOrder();
      }
      // 输出父节点
      console.log({id:this.#id,name:this.#name});
    }
  }
  
  // 创建二叉树
  class BinaryTree{
      #root = null
      constructor(root){
          this.#root = root
      }
  
      // 前序遍历
      preOrder(){
          if(this.#root != null){
              this.#root.preOrder()
          }else{
              console.log("二叉树为空，无法遍历");
          }
      }
      // 中序遍历
      infixOrder(){
          if(this.#root != null){
              this.#root.infixOrder()
          }else{
              console.log("二叉树为空，无法遍历");
          }
      }
      // 后序遍历
      postOrder(){
          if(this.#root != null){
              this.#root.postOrder()
          }else{
              console.log("二叉树为空，无法遍历");
          }
      }
  }
  
  
  // 实例几个节点
  const root = new HeroNode(1,'fc')
  const heroNode2 = new HeroNode(2,'ly')
  const heroNode3 = new HeroNode(3,'fy')
  const heroNode4 = new HeroNode(4,'John')
  const heroNode5 = new HeroNode(5,'Milk')
  
  root.setLeft(heroNode2)
  root.setRight(heroNode3)
  heroNode3.setLeft(heroNode4)
  heroNode3.setRight(heroNode5)
  // 实例一颗二叉树
  const binaryTree = new BinaryTree(root)
  binaryTree.infixOrder()
  
  ```

- **二叉树的查找**

  -  HeroNode节点类

  ```js
    // 前序查找
    preFind(id) {
      // 先比对当前节点
      if (this.#id == id) {
        console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
        return this;
      }
      let result = null;
      // 递归向左遍历查找
      if (this.#left != null) {
        result = this.#left.preFind(id);
      }
      if (result != null) {
        // 说明左子树找到
        return result;
      }
      // 递归向右遍历查找
      if (this.#right != null) {
        result = this.#right.preFind(id);
      }
      return result;
    }
    // 中序查找
    infixFind(id) {
      let result = null;
      // 先向左遍历查找
      if (this.#left != null) {
        result = this.#left.infixFind(id);
      }
      if (result != null) {
        return result;
      }
      // 再比较当前
      if (this.#id == id) {
        console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
        return this;
      }
      // 向右遍历查找
      if (this.#right != null) {
        result = this.#right.infixFind(id);
      }
      return result;
    }
    // 后续查找
    postFind(id) {
      let result = null;
      // 向左遍历查找
      if (this.#left != null) {
        result = this.#left.postFind(id);
      }
      if (result != null) {
        return result;
      }
      // 向右遍历查找
      if (this.#right != null) {
        result = this.#right.postFind(id);
      }
      // 比较当前
      if (this.#id == id) {
        console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
        return true;
      }
      return result;
    }
  ```

- BinaryTree类

  ```js
    // 前序查找
    preFind(id) {
      if (this.#root != null) {
        let flag = this.#root.preFind(id);
        if (flag) {
          flag.toString();
        } else {
          console.log("未找到id为" + id + "的角色");
        }
      } else {
        console.log("二叉树为空，无法查找");
      }
    }
    // 中序查找
    infixFind(id) {
      if (this.#root != null) {
        let flag = this.#root.infixFind(id);
        if (flag) {
          flag.toString();
        } else {
          console.log("未找到id为" + id + "的角色");
        }
      } else {
        console.log("二叉树为空，无法查找");
      }
    }
    // 后序查找
    postFind(id) {
      if (this.#root != null) {
        let flag = this.#root.postFind(id);
        if (flag) {
          flag.toString();
        } else {
          console.log("未找到id为" + id + "的角色");
        }
      } else {
        console.log("二叉树为空，无法查找");
      }
    }
  ```



- **二叉树节点的删除**

  1. 如果删除的节点是叶子节点，则直接删除该节点
  2. 如果删除的节点是非叶子节点，则删除该子树
  3. 因为二叉树是**单向**的，因此我们需要判断的是**当前节点的子节点**是否为我们要**删除的节点**，而不能判断当前节点是否为待删除节点
  4. 如果当前节点的**左子节点**不为空，且左子节点就是要删除的节点，就将`this.#left = null`，并结束递归
  5. 如果当前节点的**右子节点**不为空，且右子节点就是要删除的节点，就将`this.#right= null`，并结束递归
  6. 如果第4和第5都没删除节点，则继续**递归删除**

- **代码实现**

  - HeroNode类

    ```js
      // 节点的删除
      deleteNode(id) {
        // 如果当前节点的左子节点不为空，且左子节点就是要删除的节点，就将this.#left = null，并结束递归
        if (this.#left != null && this.#left.getId() == id) {
          this.#left = null;
          return;
        }
        // 如果当前节点的右子节点不为空，且右子节点就是要删除的节点，就将this.#right= null，并结束递归
        if (this.#right != null && this.#right.getId() == id) {
          this.#right = null;
          return;
        }
        // 向左子树递归删除
        if (this.#left != null) {
          this.#left.deleteNode(id);
        }
        // 向右子树递归删除
        if (this.#right != null) {
          this.#right.deleteNode(id);
        }
      }
    ```

  - BinaryTree类

    ```js
      // 节点的删除
      deleteNode(id) {
        if (this.#root != null) {
          if (this.#root.getId() == id) {
            // 先看删除的是否为根节点
            this.#root = null;
            return;
          }else{
            // 对根节点调用deleteNode，递归删除节点
            this.#root.deleteNode(id)
          }
        }else{
          console.log("二叉树为空，无法删除");
        }
      }
    ```

- **整体代码实现**

  ```js
  // 二叉树
  
  // heroNode节点
  class HeroNode {
    #name;
    #id;
    #left = null; // 左指针
    #right = null; // 右指针
    constructor(id, name) {
      this.#id = id;
      this.#name = name;
    }
  
    getId() {
      return this.#id;
    }
    setId(id) {
      this.#id = id;
    }
    getName() {
      return this.#name;
    }
    setName(name) {
      this.#name = name;
    }
    setLeft(node) {
      this.#left = node;
    }
    setRight(node) {
      this.#right = node;
    }
    // 重写toString
    toString() {
      console.log(`{id：${this.#id},name:${this.#name}}`);
    }
  
    // 前序遍历
    preOrder() {
      console.log({ id: this.#id, name: this.#name });
      // 递归向左子树前序遍历
      if (this.#left != null) {
        this.#left.preOrder();
      }
      // 递归向右子树前序遍历
      if (this.#right != null) {
        this.#right.preOrder();
      }
    }
    // 中序遍历
    infixOrder() {
      // 先递归向左中序遍历左子树
      if (this.#left != null) {
        this.#left.infixOrder();
      }
      // 输出父节点
      console.log({ id: this.#id, name: this.#name });
      // 再递归向右中序遍历右子树
      if (this.#right != null) {
        this.#right.infixOrder();
      }
    }
    // 后序遍历
    postOrder() {
      // 先递归向左后序遍历左子树
      if (this.#left != null) {
        this.#left.postOrder();
      }
      // 再递归向右后序遍历右子树
      if (this.#right != null) {
        this.#right.postOrder();
      }
      // 输出父节点
      console.log({ id: this.#id, name: this.#name });
    }
  
    // 前序查找
    preFind(id) {
      // 先比对当前节点
      if (this.#id == id) {
        console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
        return this;
      }
      let result = null;
      // 递归向左遍历查找
      if (this.#left != null) {
        result = this.#left.preFind(id);
      }
      if (result != null) {
        // 说明左子树找到
        return result;
      }
      // 递归向右遍历查找
      if (this.#right != null) {
        result = this.#right.preFind(id);
      }
      return result;
    }
    // 中序查找
    infixFind(id) {
      let result = null;
      // 先向左遍历查找
      if (this.#left != null) {
        result = this.#left.infixFind(id);
      }
      if (result != null) {
        return result;
      }
      // 再比较当前
      if (this.#id == id) {
        console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
        return this;
      }
      // 向右遍历查找
      if (this.#right != null) {
        result = this.#right.infixFind(id);
      }
      return result;
    }
    // 后序查找
    postFind(id) {
      let result = null;
      // 向左遍历查找
      if (this.#left != null) {
        result = this.#left.postFind(id);
      }
      if (result != null) {
        return result;
      }
      // 向右遍历查找
      if (this.#right != null) {
        result = this.#right.postFind(id);
      }
      // 比较当前
      if (this.#id == id) {
        console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
        return true;
      }
      return result;
    }
  
    // 节点的删除
    deleteNode(id) {
      // 如果当前节点的左子节点不为空，且左子节点就是要删除的节点，就将this.#left = null，并结束递归
      if (this.#left != null && this.#left.getId() == id) {
        this.#left = null;
        return;
      }
      // 如果当前节点的右子节点不为空，且右子节点就是要删除的节点，就将this.#right= null，并结束递归
      if (this.#right != null && this.#right.getId() == id) {
        this.#right = null;
        return;
      }
      // 向左子树递归删除
      if (this.#left != null) {
        this.#left.deleteNode(id);
      }
      // 向右子树递归删除
      if (this.#right != null) {
        this.#right.deleteNode(id);
      }
    }
  }
  
  // 创建二叉树
  class BinaryTree {
    #root = null;
    constructor(root) {
      this.#root = root;
    }
  
    // 前序遍历
    preOrder() {
      if (this.#root != null) {
        this.#root.preOrder();
      } else {
        console.log("二叉树为空，无法遍历");
      }
    }
    // 中序遍历
    infixOrder() {
      if (this.#root != null) {
        this.#root.infixOrder();
      } else {
        console.log("二叉树为空，无法遍历");
      }
    }
    // 后序遍历
    postOrder() {
      if (this.#root != null) {
        this.#root.postOrder();
      } else {
        console.log("二叉树为空，无法遍历");
      }
    }
    // 前序查找
    preFind(id) {
      if (this.#root != null) {
        let flag = this.#root.preFind(id);
        if (flag) {
          flag.toString();
        } else {
          console.log("未找到id为" + id + "的角色");
        }
      } else {
        console.log("二叉树为空，无法查找");
      }
    }
    // 中序查找
    infixFind(id) {
      if (this.#root != null) {
        let flag = this.#root.infixFind(id);
        if (flag) {
          flag.toString();
        } else {
          console.log("未找到id为" + id + "的角色");
        }
      } else {
        console.log("二叉树为空，无法查找");
      }
    }
    // 后序查找
    postFind(id) {
      if (this.#root != null) {
        let flag = this.#root.postFind(id);
        if (flag) {
          flag.toString();
        } else {
          console.log("未找到id为" + id + "的角色");
        }
      } else {
        console.log("二叉树为空，无法查找");
      }
    }
  
    // 节点的删除
    deleteNode(id) {
      if (this.#root != null) {
        if (this.#root.getId() == id) {
          // 先看删除的是否为根节点
          this.#root = null;
          return;
        }else{
          // 对根节点调用deleteNode，递归删除节点
          this.#root.deleteNode(id)
        }
      }else{
        console.log("二叉树为空，无法删除");
      }
    }
  }
  
  // 实例几个节点
  const root = new HeroNode(1, "fc");
  const heroNode2 = new HeroNode(2, "ly");
  const heroNode3 = new HeroNode(3, "fy");
  const heroNode4 = new HeroNode(4, "John");
  const heroNode5 = new HeroNode(5, "Milk");
  
  root.setLeft(heroNode2);
  root.setRight(heroNode3);
  heroNode3.setLeft(heroNode4);
  heroNode3.setRight(heroNode5);
  // 实例一颗二叉树
  const binaryTree = new BinaryTree(root);
  binaryTree.deleteNode(5);
  binaryTree.preOrder()
  
  ```



### 顺序存储二叉树

- **基本说明**：从数据存储来看，**数组存储方式**和**树的存储方式**可以**相互转换**，即数组可以转换成树，树叶可以转换成数组

- 所谓顺序存储二叉树，就是**将数据以数组的形式存储**，但是访问时仍可以以**前序、中序、后序**的方式遍历

  <img src="C:\Users\Administrator\Desktop\数据结构和算法\img\树\orderSaveBinaryTree.png" style="zoom:80%;" />

- **代码实现**

  ```js
  ![xiansuohuaErChaTree](C:\Users\Administrator\Desktop\数据结构和算法\img\树\xiansuohuaErChaTree.png)![xiansuohuaErChaTree](C:\Users\Administrator\Desktop\数据结构和算法\img\树\xiansuohuaErChaTree.png)// 顺序存储二叉树
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
  
  ```

  

### 线索化二叉树（Threaded BinaryTree）

- **基本介绍**

  1. n个节点的二叉链表中含有 n + 1【公式：2n - (n - 1) = n+1】个空指针域。利用二叉链表中的空指针域，存放**指向该节点**在**某种遍历次序**下的前驱和后驱节点的指针，这种附加的指针称为**线索**
  2. 这种加上了线索的二叉链表称为**线索链表**，相应的二叉树称为**线索二叉树**。根据线索性质的不同，线索二叉树可分为**前序线索二叉树**、**中序线索二叉树**和**后序线索二叉树**三种
  3. 一个节点的前一个节点，称为**前驱**节点
  4. 一个节点的后一个节点，称为**后驱**节点

- **二叉树的线索化**

  <img src="C:\Users\Administrator\Desktop\数据结构和算法\img\树\xiansuohuaErChaTree.png" alt="二叉树的线索化" style="zoom:80%;" />

- **代码实现**

  ```js
  // 线索化二叉树--以中序线索化为例
  
  // heroNode节点
  class HeroNode {
    #name;
    #id;
    #left = null; // 左指针
    #right = null; // 右指针
    #leftType; // 左指针的类型，0表示指向节点，1表示指向前驱节点
    #rightType; // 右指针的类型，0表示指向节点，1表示指向前驱节点
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
    toString(){
      return `{id:${this.#id},Name:${this.#name}}}`
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
          this.prePointer.setRight(node)
          this.prePointer.setRightType(1)
      }
      // 让prePointer指针指向这次的node节点
      this.prePointer = node
  
      // 线索化右子树
      this.threadedNodes(node.getRight());
    }
  
  }
  
  // 实例几个节点
  const rootNode = new HeroNode(1, "fc");
  const heroNode2 = new HeroNode(3, "ly");
  const heroNode3 = new HeroNode(6, "fy");
  const heroNode4 = new HeroNode(8, "John");
  const heroNode5 = new HeroNode(10, "Milk");
  const heroNode6 = new HeroNode(14, "King");
  
  const threadedBinaryNodes = new ThreadedBinaryTree(rootNode)
  rootNode.setLeft(heroNode2)
  rootNode.setRight(heroNode3)
  heroNode2.setLeft(heroNode4)
  heroNode2.setRight(heroNode5)
  heroNode3.setLeft(heroNode6)
  
  threadedBinaryNodes.threadedNodes(rootNode)
  console.log(heroNode5.getLeft().toString()); 
  ```

- **中序线索二叉树的遍历**

  - 线索二叉树的遍历和普通二叉树的遍历不同，需要注意

  ```js
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
  ```




### 赫夫曼树

- 基本介绍

  1. 给定 n 个权值作为 n 个叶子结点，构造一个二叉树，若该树的**带权路径长度（wpl）**达到最小，称这样的二叉树为**最优二叉树**，也称为**哈夫曼树（Huffman Tree）**，还有的书翻译为**霍夫曼树**
  2. **赫夫曼树是带权路径长度最短的树**，权值较大的结点离根较近

- 赫夫曼树几个重要概念

  1. **路径和路径长度**：在一颗树中，**从一个节点往下可以达到的孩子或孙子节点之间的通路**，称为路径。通路中**分支的数目**称为**路径长度**。若规定根节点的层数为1，则从根节点到第L层节点的路径长度为 L - 1

  2. **节点的权及带权路径长度**：若将树中节点赋给一个有着某种含义的数值，则这个数值称为该节点的权。节点的带权路径长度为：从根节点到该节点之间的**路径长度与该节点的权的乘积**

  3. **树的带权路径长度**：树的带权路径长度规定为**所有叶子节点**的**带权路径长度之和**，记为**WPL（weighted path length）**，权值越大的节点离根节点越近的二叉树才是最优二叉树。

  4. **WPL**最小的就是**赫夫曼树**

     ![](C:\WorkSpace\数据结构和算法\Data-structuresAndAlgorithms\img\树\wpl.png)

- **赫夫曼树创建思路分析**

  - 给定一个数列 `[13,7,8,3,29,6,1]`,要求转成一颗赫夫曼树

  - **思路分析**

    1. 将每一个数据从小到大进行排序，每个数据都是一个节点，每个节点可以看成是一颗最简单的二叉树
    2. 取出根节点权值最小的两颗二叉树
    3. 组成一颗新的二叉树，该新的二叉树的根节点的权值是前面两颗二叉树根节点权值的和
    4. 再将这颗新的二叉树，以根节点的权值大小再次排序，不断重复 1-2-3-4的步骤，直到数列中，所有的数据都被处理，就得到一颗赫夫曼树

    <img src="C:\WorkSpace\数据结构和算法\Data-structuresAndAlgorithms\img\树\HefumanTree.png" style="zoom: 67%;" />

- **代码实现**

  - **特别注意**对数组进行排序时：只有第一次传入的数组内部是数字，后面传入的都是节点数组，排序要区别处理

  ```js
  // 赫夫曼树
  
  // 创建节点类
  class Node {
    // 节点的权值
    value;
    // 指向左子节点
    left;
    // 指向右子节点
    right;
    // 构造函数
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
  
  ```



### 赫夫曼编码

- 基本介绍
  1. 赫夫曼编码也翻译为**哈夫曼编码（Huffman Coding）**，是一种编码方式，属于一种程序算法
  2. 赫夫曼编码是赫夫曼树在电讯通信中的经典的应用之一
  3. 赫夫曼编码广泛地用于**数据文件压缩**。其**压缩率通常在20%~90%**之间
  4. 赫夫曼是可变**字长**编码（VLC）的一种。是**Huffman**于1952年提出的一种编码方法，称之为最佳编码




### 二叉排序树（BST： Binary Sort Tree）

- **基本介绍**

  - 对于二叉排序树的任何一个非叶子节点，要求左子节点的值比当前节点的值小，右子节点的值比当前节点的值大
  - 如果有相同的值，则将其放在左、右子节点均可

- **二叉排序树的创建和遍历**

  ```js
  // BInary Sort Tree
  
  // 节点类
  class Node {
    // 权
    value;
    left;
    right;
    constructor(value) {
      this.value = value;
    }
  
    /**
     * 添加节点
     * @param {*} node
     */
    addNode(node) {
      // 比较添加节点和当前子树根节点得值
      if (node.value < this.value) {
        if (this.left == null) {
          this.left = node;
        } else {
          // 当前子树根节点的左节点不为空则递归向左添加
          this.left.addNode(node);
        }
      } else {
        if (this.right == null) {
          this.right = node;
        } else {
          this.right.addNode(node);
        }
      }
    }
  }
  // 创建BST
  class BST {
    // 根节点
    root;
  
    /**
     * 创建BST
     * @param {Array} arr
     */
    createBST(arr) {
      if (!(arr instanceof Array)) return;
      for (let i = 0; i < arr.length; i++) {
        this.add(new Node(arr[i]));
      }
      console.log(this.root);
    }
    
    add(node) {
      if (this.root == null) {
        this.root = node;
      } else {
        this.root.addNode(node);
      }
    }
    getRoot(){
      return this.root
    }
  
    /**
     * 中序遍历BST
     */
    infixOrder(node) {
      if (this.root == null) return;
      if (node == null) return;
      if (node.left !== null) this.infixOrder(node.left);
      console.log("中序遍历权值为：", node.value);
      if (node.right !== null) this.infixOrder(node.right);
    }
  }
  
  let arr = [7, 3, 10, 12, 5, 1, 9];
  let bst = new BST();
  bst.createBST(arr);
  bst.infixOrder(bst.getRoot());// 1,3,5,7,9,10,12
  
  ```

- **二叉排序树的删除**

  - 二叉排序树的删除情况比较复杂，有下面三种情况需要考虑
    	1. 删除叶子节点
     	2. 删除只有一颗子树的节点
     	3. 删除有两颗子树的节点（**2，3需要考虑删除节点被删除后其子节点的位置**）
  - 要删除目标节点，我们必须拿到其父节点

  ```js
  // BInary Sort Tree
  
  // 节点类
  class Node {
    // 权
    value;
    left;
    right;
    constructor(value) {
      this.value = value;
    }
  
    /**
     * 添加节点
     * @param {*} node
     */
    addNode(node) {
      // 比较添加节点和当前子树根节点得值
      if (node.value < this.value) {
        if (!this.left) {
          this.left = node;
        } else {
          // 当前子树根节点的左节点不为空则递归向左添加
          this.left.addNode(node);
        }
      } else {
        if (!this.right) {
          this.right = node;
        } else {
          this.right.addNode(node);
        }
      }
    }
  
    /**
     * 根据权值寻找被删除节点，并将其返回
     * @param {Node} node
     * @return 如果找到则返回该节点，否则返回null
     */
    findDelNode(value) {
      if (this.value == value) return this;
      if (value < this.value) {
        // 左子节点
        if (!this.left) return null;
        return this.left.findDelNode(value);
      } else {
        // 右子节点
        if (!this.right) return null;
        return this.right.findDelNode(value);
      }
    }
    /**
     *
     * @param {*} value
     * @return 找到被删除节点的父节点
     */
    findParentNode(value) {
      if (
        (this.left && this.left.value == value) ||
        (this.right && this.right.value == value)
      ) {
        return this;
      } else {
        if (this.left && value < this.value) {
          return this.left.findParentNode(value);
        } else if (this.right !== null && value >= this.value) {
          return this.right.findParentNode(value);
        } else {
          return null;
        }
      }
    }
  }
  // 创建BST
  class BST {
    // 根节点
    root;
  
    /**
     * 创建BST
     * @param {Array} arr
     */
    createBST(arr) {
      if (!(arr instanceof Array)) return;
      for (let i = 0; i < arr.length; i++) {
        this.add(new Node(arr[i]));
      }
    }
  
    add(node) {
      if (this.root == null) {
        this.root = node;
      } else {
        this.root.addNode(node);
      }
    }
    getRoot() {
      return this.root;
    }
  
    /**
     * 重新封装节点的查找方法
     * @param {*} value
     */
    findDelNode(value) {
      if (this.root == null) return null;
      return this.root.findDelNode(value);
    }
  
    /**
     * 重新封装查找节点的父节点的方法
     * @param {*} value
     */
    findParentNode(value) {
      if (this.root == null) return null;
      return this.root.findParentNode(value);
    }
  
    /**
     * BST节点的删除(三种情况)
     * 1. 删除叶子节点
     * 2. 删除只有一颗子树的节点
     * 3. 删除有两颗子树的节点（2，3需要考虑删除节点被删除后其子节点的位置）
     * 4. 要删除目标节点，我们必须拿到其父节点
     * 5. 被删除节点要存在
     *
     * 调用封装的查找方法找到目标节点和其父节点
     * @param {*} value
     */
    delNode(value) {
      var targetNode = this.findDelNode(value);
      if (!targetNode) {
        console.log("该节点不存在");
        return;
      } else {
        // 获取其父节点
        var parentNode = this.findParentNode(value);
        // 判断父节点是否存在（删除的节点是根节点时就不存咋父节点）
        if (!parentNode) {
          // 删除节点为根节点
          if(targetNode.left && targetNode.right){
              // 根节点左右都有子节点
              var leftMaxValue = this.delLeftMaxNode(targetNode)
              targetNode.value = leftMaxValue
          }else if(!targetNode.left && !targetNode.right){
              // 只有根节点了
              this.root = null
          }else{
              // 根节点只有一颗子树
              if(targetNode.left){
                  // 只有左子树
                  this.root = targetNode.left
              }else{
                  // 只有右子树
                  this.root = targetNode.right
              }
          }
          return;
        } else {
          // 当被删除节点为叶子节点时
          if (!targetNode.left && !targetNode.right) {
            // 需要判断targetNode是parentNode的左子节点还是右子节点
            if (parentNode.left && parentNode.left.value == value) {
              // 左子节点
              parentNode.left = null;
              return;
            } else if (parentNode.right && parentNode.right.value == value) {
              // 右子节点
              parentNode.right = null;
              return;
            }
          } else if (targetNode.left && targetNode.right) {
            // 当被删除节点有两颗子树
            //(两种思路：从左子树找最大的使targetNode.value = leftMaxNode.value,并删除最大节点)
            // 从右子树找最小的，删除并返回其值
              var minNodeValue = this.delRightMinNode(targetNode.right)
              targetNode.value = minNodeValue
  
          } else {
            // 当被删除节点只有一颗子树,需要判断targetNode是parentNode的左节点还是右节点
            if (targetNode.left) {
              if (parentNode.left.value == targetNode.value) {
                parentNode.left = targetNode.left;
              } else {
                parentNode.right = targetNode.left;
              }
            } else {
              if (parentNode.left.value == targetNode.value) {
                parentNode.left = targetNode.right;
              } else {
                parentNode.right = targetNode.right;
              }
            }
          }
        }
      }
    }
  
    /**
     * 以传入的node为根节点，找到其右子树中权值最小的节点将其删除并返回值
     * @param {*} targetNode 
     */
    delRightMinNode(targetNode){
      var tempNode = targetNode
      while(tempNode.left){
          tempNode = tempNode.left
      }
      this.delNode(tempNode.value)
      return tempNode.value
    }
    /**
     * 以传入的node为根节点，找到其左子树中权值最大的节点将其删除并返回值
     * @param {*} targetNode 
     */
    delLeftMaxNode(targetNode){
      var tempNode = targetNode
      while(tempNode.right){
          tempNode = tempNode.right
      }
      this.delNode(tempNode.value)
      return tempNode.value
    }
  
    /**
     * 中序遍历BST
     */
    infixOrder(node) {
      if (this.root == null) return;
      if (node == null) return;
      if (node.left !== null) this.infixOrder(node.left);
      console.log("中序遍历权值为：", node.value);
      if (node.right !== null) this.infixOrder(node.right);
    }
  }
  
  let arr = [7, 3, 10, 12, 5, 1, 9, 2];
  let bst = new BST();
  bst.createBST(arr);
  bst.delNode(2);
  bst.infixOrder(bst.getRoot());
  
  ```




### 平衡二叉树（AVL树）

- BST存在的问题分析（**给定数列[1, 2, 3, 4, 5, 6, 7]形成的BST类似单链表**）

  1. 左子树全部为空，从形式上看，更像一个单链表
  2. 插入速度没有影响
  3. 查询速度明显降低（因为需要依次比较），不能发挥BST的优势，因为每次都还需要比较左子树，其查询速度甚至比单链表还慢
  4. **解决方案**-平衡二叉树（AVL）

- 基本介绍

  1. 平衡二叉树也叫平衡二叉搜索树（Self - balancing binary search tree）又被称为AVL树，可以保证查询效率较高
  2. 具有以下**特点**：它是一棵空树或它的**左右两个子树的高度差的绝对值不超过1**，并且左右两个子树都是一颗平衡二叉树。平衡二叉树的常用实现方法有**红黑树**、**AVL**、**替罪羊树**、**Treap**、**伸展树**等**算法**
  3. 平衡二叉树首先得是一颗**二叉排序树**

- 左旋转

  - 当右子树高度太高时，可以通过左旋转降低右子树的高度
  - 需要先在节点类中写三个方法，分别获取**当前节点高度、当前节点的左子树高度、当前节点的右子树高度**

  ![](C:\Users\Administrator\Desktop\数据结构和算法\img\树\AVLTreeLeftRotate.png)

- 右旋转

  - 当左子树太高时，可以通过右旋转降低左子树的高度

  ![](C:\Users\Administrator\Desktop\数据结构和算法\img\树\AVLTreeRightRotate.png)



- **代码实现**

  ```js
  // AVL 树
  
  // 节点类
  class Node {
    // 权
    value;
    left;
    right;
    constructor(value) {
      this.value = value;
    }
  
    // 左旋转
    leftRotate() {
      // 以当前根节点的值创建新的节点
      let newNode = new Node(this.value);
      // 把新的节点的左子树设置成当前节点的左子树
      newNode.left = this.left;
      // 把新的节点的右子树设置成当前节点右子树的左子树
      newNode.right = this.right.left;
      // 把当前节点的值替换成右子节点的值
      this.value = this.right.value;
      // 把当前节点的右子树设置成右子树的右子树
      this.right = this.right.right;
      // 把当前节点的左子树设置成新的节点
      this.left = newNode;
    }
  
    // 右旋转
    rightRotate() {
      // 以当前节点的值创建新的节点
      let newNode = new Node(this.value);
      // 把新节点的右子树设置为当前节点的右子树
      newNode.right = this.right;
      // 把新节点左子树设置为当前节点的左子树的右子树
      newNode.left = this.left.right;
      // 把当前节点的值换为左子节点的值
      this.value = this.left.value;
      // 把当前节点的左子树设置为左子树的左子树
      this.left = this.left.left;
      // 把当前节点的右子树设置为新节点
      this.right = newNode;
    }
  
    // 返回当前节点的高度
    getHeight() {
      return (
        Math.max(
          !this.left ? 0 : this.left.getHeight(),
          !this.right ? 0 : this.right.getHeight()
        ) + 1
      );
    }
  
    // 返回左子树的高度
    getLeftHeight() {
      if (this.left) {
        return this.left.getHeight();
      }
      return 0;
    }
    // 返回右子树的高度
    getRightHeight() {
      if (this.right) {
        return this.right.getHeight();
      }
      return 0;
    }
  
    /**
     * 添加节点
     * @param {*} node
     */
    addNode(node) {
      // 比较添加节点和当前子树根节点得值
      if (node.value < this.value) {
        if (!this.left) {
          this.left = node;
        } else {
          // 当前子树根节点的左节点不为空则递归向左添加
          this.left.addNode(node);
        }
      } else {
        if (!this.right) {
          this.right = node;
        } else {
          this.right.addNode(node);
        }
      }
  
      // 添加完后判断右子树和左子树的高度
      if (this.getRightHeight() - this.getLeftHeight() > 1) {
        // 如果当前节点的右子树的左子树高度大于它的右子树的高度
        if (
          this.right &&
          this.right.getLeftHeight() > this.right.getRightHeight()
        ) {
          // 需要先对右子树进行右旋转，再对当前节点左旋转
          this.right.rightRotate();
          this.leftRotate();
        } else {
          // 左旋转
          this.leftRotate();
        }
        return 
      }
      if (this.getLeftHeight() - this.getRightHeight() > 1) {
        // 需要判断当前节点的左子树的右子树高度是否大于其左子树高度
        if (this.left && this.left.getRightHeight() > this.left.getLeftHeight()) {
          // 需要先对子树左旋转，再对当前节点右旋转
          this.left.leftRotate();
          this.rightRotate();
        } else {
          // 右旋转
          this.rightRotate();
        }
        return
      }
    }
  
    /**
     * 根据权值寻找被删除节点，并将其返回
     * @param {Node} node
     * @return 如果找到则返回该节点，否则返回null
     */
    findDelNode(value) {
      if (this.value == value) return this;
      if (value < this.value) {
        // 左子节点
        if (!this.left) return null;
        return this.left.findDelNode(value);
      } else {
        // 右子节点
        if (!this.right) return null;
        return this.right.findDelNode(value);
      }
    }
    /**
     *
     * @param {*} value
     * @return 找到被删除节点的父节点
     */
    findParentNode(value) {
      if (
        (this.left && this.left.value == value) ||
        (this.right && this.right.value == value)
      ) {
        return this;
      } else {
        if (this.left && value < this.value) {
          return this.left.findParentNode(value);
        } else if (this.right !== null && value >= this.value) {
          return this.right.findParentNode(value);
        } else {
          return null;
        }
      }
    }
  }
  
  // 创建AVL
  class AVL {
    // 根节点
    root;
  
    /**
     * 创建AVL
     * @param {Array} arr
     */
    createAVL(arr) {
      if (!(arr instanceof Array)) return;
      for (let i = 0; i < arr.length; i++) {
        this.add(new Node(arr[i]));
      }
    }
  
    add(node) {
      if (!this.root) {
        this.root = node;
      } else {
        this.root.addNode(node);
      }
    }
    getRoot() {
      return this.root;
    }
  
    /**
     * 重新封装节点的查找方法
     * @param {*} value
     */
    findDelNode(value) {
      if (this.root == null) return null;
      return this.root.findDelNode(value);
    }
  
    /**
     * 重新封装查找节点的父节点的方法
     * @param {*} value
     */
    findParentNode(value) {
      if (this.root == null) return null;
      return this.root.findParentNode(value);
    }
  
    /**
     * AVL节点的删除(三种情况)
     * 1. 删除叶子节点
     * 2. 删除只有一颗子树的节点
     * 3. 删除有两颗子树的节点（2，3需要考虑删除节点被删除后其子节点的位置）
     * 4. 要删除目标节点，我们必须拿到其父节点
     * 5. 被删除节点要存在
     *
     * 调用封装的查找方法找到目标节点和其父节点
     * @param {*} value
     */
    delNode(value) {
      var targetNode = this.findDelNode(value);
      if (!targetNode) {
        console.log("该节点不存在");
        return;
      } else {
        // 获取其父节点
        var parentNode = this.findParentNode(value);
        // 判断父节点是否存在（删除的节点是根节点时就不存咋父节点）
        if (!parentNode) {
          // 删除节点为根节点
          if (targetNode.left && targetNode.right) {
            // 根节点左右都有子节点
            var leftMaxValue = this.delLeftMaxNode(targetNode);
            targetNode.value = leftMaxValue;
          } else if (!targetNode.left && !targetNode.right) {
            // 只有根节点了
            this.root = null;
          } else {
            // 根节点只有一颗子树
            if (targetNode.left) {
              // 只有左子树
              this.root = targetNode.left;
            } else {
              // 只有右子树
              this.root = targetNode.right;
            }
          }
          return;
        } else {
          // 当被删除节点为叶子节点时
          if (!targetNode.left && !targetNode.right) {
            // 需要判断targetNode是parentNode的左子节点还是右子节点
            if (parentNode.left && parentNode.left.value == value) {
              // 左子节点
              parentNode.left = null;
              return;
            } else if (parentNode.right && parentNode.right.value == value) {
              // 右子节点
              parentNode.right = null;
              return;
            }
          } else if (targetNode.left && targetNode.right) {
            // 当被删除节点有两颗子树
            //(两种思路：从左子树找最大的使targetNode.value = leftMaxNode.value,并删除最大节点)
            // 从右子树找最小的，删除并返回其值
            var minNodeValue = this.delRightMinNode(targetNode.right);
            targetNode.value = minNodeValue;
          } else {
            // 当被删除节点只有一颗子树,需要判断targetNode是parentNode的左节点还是右节点
            if (targetNode.left) {
              if (parentNode.left.value == targetNode.value) {
                parentNode.left = targetNode.left;
              } else {
                parentNode.right = targetNode.left;
              }
            } else {
              if (parentNode.left.value == targetNode.value) {
                parentNode.left = targetNode.right;
              } else {
                parentNode.right = targetNode.right;
              }
            }
          }
        }
      }
    }
  
    /**
     * 以传入的node为根节点，找到其右子树中权值最小的节点将其删除并返回值
     * @param {*} targetNode
     */
    delRightMinNode(targetNode) {
      var tempNode = targetNode;
      while (tempNode.left) {
        tempNode = tempNode.left;
      }
      this.delNode(tempNode.value);
      return tempNode.value;
    }
    /**
     * 以传入的node为根节点，找到其左子树中权值最大的节点将其删除并返回值
     * @param {*} targetNode
     */
    delLeftMaxNode(targetNode) {
      var tempNode = targetNode;
      while (tempNode.right) {
        tempNode = tempNode.right;
      }
      this.delNode(tempNode.value);
      return tempNode.value;
    }
  
    /**
     * 中序遍历AVL
     */
    infixOrder(node) {
      if (this.root == null) return;
      if (node == null) return;
      if (node.left !== null) this.infixOrder(node.left);
      console.log("中序遍历权值为：", node.value);
      if (node.right !== null) this.infixOrder(node.right);
    }
  }
  
  let arr = [4, 3, 6, 5, 7, 8]; // 左
  let arr1 = [10, 12, 8, 9, 7, 6]; // 右旋转
  let avl = new AVL();
  avl.createAVL(arr1);
  console.log("树的高度为：", avl.getRoot().getHeight());
  console.log("左子树的高度为：", avl.getRoot().getLeftHeight());
  console.log("右子树的高度为：", avl.getRoot().getRightHeight());
  
  ```



### 多路查找树

#### 二叉树问题分析

<img src="C:\Users\Administrator\Desktop\数据结构和算法\img\树\BinaryTreeProblem.png" style="zoom: 67%;" />



#### 2-3树

- 2-3树是最简单的B树结构，具有如下特点

  1. 2-3树的所有叶子节点都在同一层（只要是B树都满足这个条件）
  2. 有两个子节点的节点叫二节点，二节点要么没有子节点，要么有两个子节点
  3. 有三个子节点的节点叫三节点，三节点要么没有子节点，要么有三个子节点
  4. 2-3树是由二节点和三节点构成的树

  <img src="C:\Users\Administrator\Desktop\数据结构和算法\img\树\2-3Tree.png" style="zoom:67%;" />



#### B树

<img src="C:\Users\Administrator\Desktop\数据结构和算法\img\树\BTree.png" style="zoom:67%;" />





## 图

#### 为什么要有图

1. 线性表局限于一个直接前驱和一个直接后继的关系
2. 树也只能有一个直接前驱（也就是父节点）
3. 当我们需要表示多对多的关系时，就需要用到图



#### 图的基本介绍

- 图也是一种数据结构，其中节点可以具有零个或多个相邻元素，两个节点之间的连接称为边(edge)。节点也可以称为顶点（vertex）。



![](C:\Users\Administrator\Desktop\数据结构和算法\img\图\graph.png)

- 顶点之间没有方向的称为**无向图**，反之称为**有向图**，边具有权值的称为**带权图**，也叫**网**

- 图的分类：邻接矩阵和邻接表

  ![邻接矩阵](C:\Users\Administrator\Desktop\数据结构和算法\img\图\linjieMetrix.png)

![邻接表](C:\Users\Administrator\Desktop\数据结构和算法\img\图\linjieTable.png)

#### 图的构建及其代码实现

```js
// 图
class Graph{
    // 存储顶点的数组
    #vertexList = []
    // 存储边的邻接数组
    #edges = []
    // 记录边的个数
    #numOfEdges = 0

    constructor(vertexNum){
        let row = null
        // 初始化邻接矩阵
        for(let i=0;i<vertexNum;i++){
            row = []
            for(let j=0;j<vertexNum;j++){
                row.push(0)
            }
            this.#edges.push(row)
        }
    }
    // 添加顶点
    insertVertex(vertex){
        this.#vertexList.push(vertex)
    }
    /**
     * 添加边
     * @param {Number} row 
     * @param {Number} col 
     * @param {*} weight 
     */
    insertEdge(row,col,weight) {
        // 无向图
        this.#edges[row][col] = weight
        this.#edges[col][row] = weight
        this.#numOfEdges++
    }

    // 图的常用方法
    // 获取图的顶点个数
    getNumOfVertexs(){
        return this.#vertexList.length
    }
    // 获取边的条数
    getNumOfEdges(){
        return this.#numOfEdges
    }
    // 获取邻接矩阵某处的值
    getWeight(row,col){
        return this.#edges[row][col]
    }
    // 遍历邻接矩阵
    showEdges(){
        for(let i=0;i<this.#edges.length;i++){
            console.log(this.#edges[i]);
        }
    }
}

let graph = new Graph(5)
let vertex = ["A","B","C","D","E"]
// 添加顶点
for(let i=0;i<vertex.length;i++){
    graph.insertVertex(vertex[i])
}
// 添加边
// A-B A-C B-C B-D B-E
graph.insertEdge(0,1,1)
graph.insertEdge(0,2,1)
graph.insertEdge(1,1,1)
graph.insertEdge(1,2,1)
graph.insertEdge(1,3,1)
graph.insertEdge(1,4,1)

// 显示邻接矩阵
graph.showEdges()
```



#### 图的深度优先遍历（DFS）

- 图的深度优先搜索（Depth First Search）

  1. 深度优先遍历，从初始访问节点出发，初始访问节点可能有多个林杰节点，深度优先遍历的策略就是首先访问第一个邻接节点，然后再以这个被访问的邻接节点作为初始节点，访问它的第一个邻接节点。即**每次都在访问完当前节点后首先访问当前节点的第一个邻接节点**
  2. 我们可以看到，这样的访问策略是优先往纵向挖掘深入，而不是对一个节点的所有邻接节点进行横向访问
  3. 显然，深度优先搜索是一个**递归**（recursion）的过程

- **深度优先遍历算法步骤**

  1. 访问初始节点，并标记节点v为以访问

     ```js
         // 首先访问该节点，将其输出
         console.log(this.getValueByIndex(i)+"->");
         // 将该节点设置为已访问
         isVisited[i] = true
     ```

  2. 查找节点v的第一个邻接节点`let w = this.getFirstNeighbor(i)`

  3. 若w存在，则继续执行4，如果w不存在，则回到第一步，将从v的下一个节点继续

  4. 若w未被访问，对w进行深度优先遍历递归`this.dfs(isVisited,w)`（即把w当作v继续1，2，3）

  5. 查找节点v的w邻接节点的下一个邻接节点`w = this.getNextNeighbor(i,w)`，转到步骤3

- **帮助理解**

  - **深度优先**就是在邻接矩阵里从顺着一个顶点的邻接节点不断往下延申

  - 如下表，**先访问A，然后找A的邻接顶点**，于是**访问到B将其输出**，**然后到第二行找B的邻接节点**，此时A、B访问过，于是跳过，然后**访问到C并将其输出**，**接着去第三行找C的邻接顶点**，此时A、B访问过，C、D、E跳过（均为0，表示没连接），至此**C访问结束**，**返回到B接着下一个邻接顶点**，**访问到D并将其输出**，**接着去D那一行找邻接顶点**，**发现都不行又返回到B接着下一个邻接顶点**，**访问到E并将其输出**，接**着去E那一行找发现都不行返回到B**，**B这里也找完返回到A**，**A接着下一个找**，遇到C，然后就会去C那一行找，都不行会返回到A继续找D，也不行返回到A继续找E，还是不行程序结束。输出 A B C D E

    |      |  A   |  B   |  C   |  D   |  E   |
    | :--: | :--: | :--: | :--: | :--: | :--: |
    |  A   |  0   |  1   |  1   |  0   |  0   |
    |  B   |  1   |  0   |  1   |  1   |  1   |
    |  C   |  1   |  1   |  0   |  0   |  0   |
    |  D   |  0   |  1   |  0   |  0   |  0   |
    |  E   |  0   |  1   |  0   |  0   |  0   |

    

- **代码实现**

  ```js
    // 记录顶点被访问的情况
    #isVisited = [];
  
    constructor(vertexNum) {
      let row = null;
      // 初始化邻接矩阵
      for (let i = 0; i < vertexNum; i++) {
        row = [];
        for (let j = 0; j < vertexNum; j++) {
          row.push(0);
        }
        this.#edges.push(row);
        // 初始化顶点访问情况
        this.#isVisited.push(false);
      }
    }
  
    /**
     * 得到当前顶点第一个邻接节点的下标
     * @param {Number} index 当前顶点的下标
     * @returns -1表示不存在
     */
    getFirstNeighbor(index) {
      for (let i = 0; i < this.#vertexList.length; i++) {
        if (this.#edges[index][i] > 0) {
          return i;
        }
      }
      return -1;
    }
  
    /**
     *一个节点可能有多个邻接节点
     * 根据当前节点的前一个邻接节点的下标来获取下一个邻接节点
     * @param {Number} v1 当前节点
     * @param {Number} v2 当前节点第一个邻接节点
     * @returns -1表示不存在
     */
    getNextNeighbor(v1, v2) {
      for (let i = v2 + 1; i < this.#vertexList.length; i++) {
        if (this.#edges[v1][i] > 0) {
          return i;
        }
      }
      return -1;
    }
  
  
    /**
     * 深度优先遍历算法(对下标为i的一个进行dfs)
     * @param {Array} isVisited 
     * @param {Number} i 
     */
    #dfs(isVisited,i){
      // 首先访问该节点，将其输出
      console.log(this.getValueByIndex(i)+"->");
      // 将该节点设置为已访问
      isVisited[i] = true
      // 查找节点i的第一个邻接节点
      let w = this.getFirstNeighbor(i)
      while(w != -1){
          // 如果w存在还需要判断w是否被访问过，因为有可能是因为回溯过来才存在的
          if(!isVisited[w]){
              this.dfs(isVisited,w)
          }
          // 如果w已经被访问过,则查找邻节点的下一个邻接节点
          w = this.getNextNeighbor(i,w)
      }
    }
    
    /**
     * 上面只是对某一个顶点进行dfs
     * 需要遍历对所有的节点进行dfs
     */
    dfs(){
      for(let i=0;i<this.getNumOfVertexs();i++){
          if(!this.#isVisited[i]){
              this.#dfs(this.#isVisited,i)
          }
      }
    }
  ```



#### 图的广度优先遍历（BFS）

- 图的广度优先搜索（Broad First Search），类似于一个分层搜索的过程，广度优先遍历需要使用一个队列以保持访问过的节点的顺序，以便按这个顺序来访问这些节点的邻接节点
- **广度优先遍历算法步骤**
  1. 访问初始节点v并标记节点v为已访问
  2. 节点v入队列
  3. 当队列为非空时，继续执行，否则算法结束(**针对v节点的算法结束**)
  4. 出队列，取得队头节点u
  5. 查找节点u的第一个邻接节点w
  6. 若节点u的邻接节点w不存在，则转到步骤3；否则执行以下三个步骤
     1. 若节点尚未被访问，则访问节点w并标记为已访问
     2. 节点w入队列
     3. 查找节点u的继w邻接节点后的下一个邻接节点w，转到步骤6
- **帮助理解**
  - 广度优先算法就是对邻接矩阵的针对某一个顶点，优先将这个顶点所对应的一行访问完，再往下进行
  - 即将**该顶点能访问到的邻接顶点逐一输出**，再进行下一个顶点
  - 例如先对顶点A进行访问并**输出A**，然后访问其邻接顶点，**输出B**，输出Ｃ；接着对顶点Ｂ访问，Ｂ已经被输出，访问其邻接顶点，**输出Ｄ**、**输出Ｅ**，以此类推。
- **注意事项**：广度优先每次ＢＦＳ都需要一个队列来记录节点的访问顺序

|      |  A   |  B   |  C   |  D   |  E   |
| :--: | :--: | :--: | :--: | :--: | :--: |
|  A   |  0   |  1   |  1   |  0   |  0   |
|  B   |  1   |  0   |  1   |  1   |  1   |
|  C   |  1   |  1   |  0   |  0   |  0   |
|  D   |  0   |  1   |  0   |  0   |  0   |
|  E   |  0   |  1   |  0   |  0   |  0   |

​	

- **代码实现**

  ```js
    /**
     * 对一个节点进行广度优先算法
     * @param {Array} isVisited
     * @param {Number} i
     */
    #bfs(isVisited, i) {
      // 表示队列的头节点对应的下标
      let u;
      // 表示邻接节点w
      let w;
      // 队列，记录当前节点及其邻接节点访问的顺序
      let queue = [];
      // 输出当前节点信息
      console.log(this.getValueByIndex(i));
      // 将当前节点标记为已访问
      isVisited[i] = true;
      // 将当前节点坐标加入队列
      queue.push(i);
      // 循环遍历队列
      while (queue.length !== 0) {
        // 取出队列头节点下标
        u = queue.shift();
        // 获取第一个邻接节点下标w
        w = this.getFirstNeighbor(u);
        // 判断邻接节点是否存在,逐一将邻接节点进行输出
        while (w != -1) {
          // 再判断当前邻接节点是否被访问过
          if (!isVisited[w]) {
            // 输出邻接节点
            console.log(this.getValueByIndex(w) + "=>");
            // 将该邻接节点标记为已访问
            isVisited[w] = true;
            // 将其入队列
            queue.push(w);
          }
          // 如果当前邻接节点被访问过，则找当前节点u的邻接节点的下一个邻接节点
          w = this.getNextNeighbor(u, w);
        }
      }
    }
    /**
     * 对每个节点都进行BFS
     */
    bfs(){
      for(let i=0;i<this.getNumOfVertexs();i++){
          if(!this.#isVisited[i]){
              this.#bfs(this.#isVisited,i)
          }
      }
    }
  ```





# 算法篇

## 二分查找算法(非递归)

- 二分查找算法只适用于从有序的数列中进行查找(比如数字和字母等),将数列排序后再进行查找

- 二分查找算法的运行时间为对数时间O(log2为底n的对数),即查找到需要的目标位置**最多**只需要(log2为底n的对数)步,假设从[0,99]的队列(100个数,n=100)中寻到目标数30,则需要查找的步数为(log2为底100的对数),即最多需要查找7次(2^6 < 100 < 2^7)

- **代码实现**

  ```js
  /**
   * 二分查找非递归实现
   * @param {Array} arr 有序数组，以升序为例
   * @param {*} target
   * @return 返回对应下标，-1表示没找到
   */
  function binarySearch(arr, target) {
    // 左索引
    let leftPointer = 0;
    // 右索引
    let rightPointer = arr.length - 1;
    // 中间索引
    let mid = 0;
    // 循环查找
    while (leftPointer <= rightPointer) {
      // 获取中间索引
      mid = Math.floor((leftPointer + rightPointer) / 2);
      // 判断
      if (arr[mid] == target) {
        // 找到了
        return mid;
      } else {
        // 没找到,判断中间值比目标值大了还是小了
        if (arr[mid] > target) {
          // 中值大，需要向左找
          rightPointer = mid - 1;
        } else {
          // 中值小，需要向右找
          leftPointer = mid + 1;
        }
      }
    }
    // 到这里说明没找到
    return -1
  }
  
  
  let arr = [1,2,3,4,5,6,7,8,9,10]
  console.log(binarySearch(arr,10));// 9
  ```

  

## 分治算法

- 分治算法是一种很重要的算法.字面上的解释是"分而治之",就是把一个复杂的问题分成两个或更多的相同或相似的子问题,再把子问题分成更小的子问题...直到最后子问题可以简单的直接求解,**原问题的解即子问题的解的合并**.如排序算法(快排/归并).
- 分治算法可以求解一些**经典问题**
  1. 二分搜索
  2. 大整数乘法
  3. 棋盘覆盖
  4. 合并排序
  5. 快速排序
  6. 线性时间选择
  7. 最接近点对问题
  8. 循环赛日程表
  9. **汉诺塔**

- **分治算法在每一层递归上都有三个基本步骤**

  1. 分解:将原问题分解为若干个规模较小,相互独立,与原问题形式相同的子问题
  2. 解决:若子问题规模较小而容易被解决则直接解,否则递归地解各个子问题
  3. 合并:将各个子问题的解合并为原问题的解

- **汉诺塔游戏思路分析**

  1. 当n=1时,即只有1个盘.则直接将其从A -> C
  2. 当n >=2 时,将所有盘看为两个部分:**最下面的盘**和**其余所有盘**
     1. 先把**上面的所有盘** 从A -> B
     2. 把**最下面的盘**从 A -> C
     3. 把B塔的所有盘从 B -> C

- **代码实现**

  ```js
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
  
  ```



## 动态规划算法

### 动态规划算法介绍

- 动态规划(Dynamic Programming)算法的核心思想是：将大问题划分为小问题进行解决，从而一步步获取最优解的处理算法
- 动态规划算法与分治算法类似，其基本思想也是将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到原问题的解
- 与分治法不同的是，适合于动态规划求解的问题，经分解得到的子问题往往不是互相独立的（**即下一个子阶段的求解是建立在上一个子阶段的解的基础上，进行进一步的求解**）
- 动态规划可以通过**填表的方式**来逐步推进，得到最优解

### 应用场景-背包问题

- 背包问题：有一个背包，容量为4磅，现有如下物品
- 背包问题主要是指一个给定容量的背包、若干具有一定价值和重量的物品，如何选择物品放入背包使物品的价值最大。其中又分为01背包和完全背包（完全背包指的是：每种物品都有无限件可用）
- 这里的问题是属于01背包，即每个物品最多放一个。而无限背包可以转换为01背包

|   物品    | 重量 | 价格 |
| :-------: | ---- | ---- |
| 吉他（G） | 1    | 1500 |
| 音响（S） | 4    | 3000 |
| 电脑（L） | 3    | 2000 |

1. 要求达到的目标为装入背包的总价值最大，并且重量不溢出
2. 要求装入的物品不能重复

- 01**背包问题算法分析**

  - 每次遍历到的第i个物品，根据w[i]和v[i]来确定是否需要将该物品放入背包中。即对于给定的n个物品，设v[i]、w[i]分别为第i个物品的价值和重量，C为背包的容量。再令v[i][j\]表示在前i个物品中能够装入容量为j的背包中的最大价值。则我们有下面的结果：

    1. 填表时初始化第一行和第一列都为0`v[i][0] = v[0][j]=0`

    2. 当新添加商品的重量大于背包容量时，直接使用上一次背包中放入的物品

       `当w[i]>j时： v[i][j] = v[i-1][j]`

    3. 当新添加的商品重量小于等于背包容量时，可以尝试将其加入，计算出当前新添加商品的价值和剩余空间可再装入商品的价值得到总和，将两个值进行比较，取最大值

       `当j>=w[i]时：  v[i][j] = max{v[i-1][j], v[i-1][j-w[i]]+v[i]}`

| 物品     | 0磅  | 1磅  | 2磅  | 3磅  | 4磅       |
| -------- | ---- | ---- | ---- | ---- | --------- |
|          | 0    | 0    | 0    | 0    | 0         |
| 吉他(G)1 | 0    | 1500 | 1500 | 1500 | 1500      |
| 音响(S)4 | 0    | 1500 | 1500 | 1500 | 3000      |
| 电脑(L)3 | 0    | 1500 | 1500 | 2000 | 2000+1500 |

- **代码实现**

  ```js
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
        // 更新j的索引(容量得更新，因为容量是有限制的，需要找到符合条件且容量匹配的两件商品)
        j = j - w[i - 1];
      }
      i--;
    }
  }
  knapsack();
  ```





## KMP算法

### 暴力匹配算法

- **思路分析**：先假设现在str1匹配到位置i，子串str2匹配到位置j，则：
  1. 如果当前字符串匹配成功，即（str[i] == str2[j]）,则i++，j++，继续匹配下一个字符
  2. 如果失败（即str1[i] != str2[j]）,令i = i - (j - 1), j = 0。相当于每次匹配失败时，i回溯，j被置零。
- **问题分析**：用暴力匹配方法解决就会出现大量回溯，每次只移动一位ie，若是不匹配，移动到下一位接着判断，浪费了大量时间。

- **代码实现**：

  ```j
  /**
   * 暴力匹配算法
   * @param {String} str1 待匹配的串
   * @param {String} str2 匹配的关键词
   * @return 匹配成功返回开始的索引，失败返回-1
   */
  function violenceMatch(str1, str2) {
    let str1Arr = str1.split(""),
      str2Arr = str2.split("");
  
    // 两个数组的长度
    let str1Len = str1Arr.length,
      str2Len = str2Arr.length;
    // 两个数组的索引
    let str1Index = 0,
      str2Index = 0;
  
    // 循环匹配
    while(str1Index<str1Len && str2Index<str2Len){
      if(str1Arr[str1Index] == str2Arr[str2Index]){
          // 当前项匹配成功
          if(str2Index== str2Len-1){
              // 匹配完成
              return str1Index-str2Index
          }
          str1Index++
          str2Index++
      }else{
          // 匹配失败则回溯
          str1Index = str1Index-(str2Index-1)
          str2Index = 0
      }
    }
    return -1
  }
  
  let str1 = '你爱我 我爱你 蜜雪冰城甜蜜蜜'
  let str2 = '甜蜜蜜'
  console.log(violenceMatch(str1,str2));// 12
  ```

  

### KMP算法介绍

- KMP算法是一个解决模式串在文本串中是否出现过，如果出现过，返回其最早出现的位置的经典算法

- Kunh-Morris-Pratt字符串查找算法，简称”KMP算法“，常用于在一个文本串S内查找一个模式串P的出现位置，这个算法由Donald Knuth、Vaughan Pratt、James J. Morris三人于1977年联合发表，故取这3人的姓氏命名此算法

- KMP算法就是利用之前判断过的信息，通过一个next数组，保存模式串中前后最长公共子序列的长度，每次回溯时，通过next数组找到前面匹配过的位置，省去了大量的计算时间。

- **KMP算法的最大特点就是主串的索引不会回溯，只有模板串的索引会回溯**

- **代码实现**：

  ```js
  /**
   * 获取字符串的部分匹配表
   * @param {Array} strArr
   */
  function kmpNext(str) {
    // next数组用于保存部分匹配值(字符串长度为0时部分匹配值一定为0)
    let next = [0];
    for (let i = 1, j = 0; i < str.length; i++) {
      // 当str.charAt(i) == str.charAt(j)不满足时，需要从next[j-1]获取新的j
      // 直到发现有 str.charAt(i) == str.charAt(j) 成立才退出
      while (j > 0 && str.charAt(i) != str.charAt(j)) {
        j = next[j - 1];
      }
      // 当str.charAt(i) == str.charAt(j)满足时，部分匹配值+1
      if (str.charAt(i) == str.charAt(j)) {
        j++;
      }
      next[i] = j;
    }
    return next
  }
  
  /**
   * KMP匹配算法
   * @param {*} qStr
   * @param {*} pStr
   * @param {*} next 部分匹配表
   */
  function kmpSearch(qStr, pStr, next) {
    for (let i = 0, j = 0; i < qStr.length; i++) {
      // 处理 qStr.charAt(i) !== pStr.charAt(j)的情况来调整j的大小
      while (j > 0 && qStr.charAt(i) !== pStr.charAt(j)) {
        j = next[j - 1];
      }
      if(qStr.charAt(i) === pStr.charAt(j)){
          j++
      }
      // 找到了的情况
      if(j == pStr.length){
          return i-(j-1)
      }
    }
    return -1
  }
  
  
  let qStr = '你爱我 我爱你 蜜雪冰城甜蜜蜜'
  let pStr = '我爱你'
  console.log(kmpSearch(qStr,pStr,kmpNext(pStr)));// 12
  ```



## 贪心算法

### 贪心算法介绍

- 贪心算法是指在对问题进行求解时，在每一步选择中都采取最好或者最优的选择，从而希望能够导致结果是最好或者最优的算法
- 贪婪算法所得到的结果**不一定是最优的结果**（有时候会是最优解），但是都是相对近似最优解的结果

### 贪心算法最佳应用-集合覆盖

- **问题说明**

> 假设存在如下表的需要付费的广播台，以及广播台信号可以覆盖的地区。如何选择最少的广播台，让所有的地区都可以接收到信号

| 广播台 | 覆盖地区               |
| ------ | ---------------------- |
| K1     | "北京"、"上海"、"天津" |
| K2     | "广州"、"北京"、"深圳" |
| K3     | "成都"、"上海"、"杭州" |
| K4     | "上海"、"天津"         |
| K5     | "杭州"、"大连"         |

- **穷举法思路分析**

> 如何找出覆盖所有地区的广播台的集合呢？可以使用穷举法实现，列出每个可能的广播台的集合，这被称为幂集。假设总的有n个广播台，则广播台的组合总共有2^n  -1 个，假设每秒可以计算10个子集，如图：

| 广播台数量n | 子集总数2^n | 需要的时间  |
| ----------- | ----------- | ----------- |
| 5           | 32          | 3.2秒       |
| 10          | 1024        | 102.4秒     |
| 32          | 4294967296  | 13.6年      |
| 100         | 1.26*100^30 | 4*10^23  年 |

- **贪心算法思路分析**
  1. 遍历所有的广播电台，找到一个覆盖了最多**未覆盖的地区**的电台（此电台可能包含一些已覆盖的地区，但没有关系）
  2. 将这个电台加入到一个集合中（比如ArrayList），想办法**把该电台覆盖的地区在下次比较时去掉**
  3. 重复第1步直到覆盖了全部的地区