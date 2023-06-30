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
            console.log('队列为空')
            return
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

let test = new arrayQueue(5)
test.addData(5)
test.addData(4)
test.addData(3)
test.addData(2)
test.getData()
test.getData()


//console.log("@@",test.getData(),test.getData(),test.getData(),test.getData())
test.showArrQueue()