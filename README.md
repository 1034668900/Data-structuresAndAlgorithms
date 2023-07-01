# 数据结构和算法

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
    if (!arr instanceof Array) return;
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
      if(!sparseArr instanceof Array)return
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

#### 环形队列模拟思路

- 调整两个指针的含义：
  1. **front**头部指针的含义做出调整：此时**front**就指向队列的第一个元素，即`arr[front]`就是队列的第一个元素,初始值为0
  2. **rear**尾部指针的含义做出调整：此时**rear**指向队列的**最后**一个元素的**后**一个位置，初始值为**0**

- 为什么调整两个指针的含义？
  
  - 希望总是在队列的**最后一个位置**预留一个位置作为**约定**，这个约定**是为了区分空队列和满队列**的，也就是说，**下图**中当数据**存储到8**时，我们就认为这个队列已经存储**满**了
  
  <img src="C:\Users\Administrator\Desktop\数据结构和算法\img\circleQueue.png" style="zoom:80%;" />
  
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

![单链表示意图](C:\Users\Administrator\Desktop\数据结构和算法\img\singleLinkList.png)

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











