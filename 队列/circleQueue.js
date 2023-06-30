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

let test = new circleQueue(5)
test.addData(5)
test.addData(4)
test.addData(3)
test.addData(2)
test.addData(1)
test.addData(0)
test.addData(-1)
test.getData()
test.getData()
test.showArrQueue()// 5 4 3 2 