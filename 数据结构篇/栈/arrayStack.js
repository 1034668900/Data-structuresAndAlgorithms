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

for (let i = 0; i < 6; i++) {
  stack.push(i);
}

let s1 = stack.pop()
let s2 = stack.pop()
let s3 = stack.pop()
let s4 = stack.pop()
console.log("@@@",s1,s2,s3,s4);
stack.list();
