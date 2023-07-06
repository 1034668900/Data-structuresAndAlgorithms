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

// 判断是否为一个合法的运算符
function isOper(oper) {
  return oper == "+" || oper == "-" || oper == "*" || oper == "/";
}

// 逆波兰表达式计算
function suffixCalculate(expression) {
  // 用于运算的值
  let stack = new arrayStack(10);
  // 将表达式转数组
  let arr = expression.split(" ");
  // 遍历数组
  for (let i = 0; i < arr.length; i++) {
    if (isOper(arr[i])) {
      // 是运算符--计算后将结果入栈
      let num1 = stack.pop();
      let num2 = stack.pop();
      let result = CalculateNum(num1, num2, arr[i]);
      stack.push(+result);
    } else {
      // 是数字--直接入栈
      stack.push(+arr[i]);
    }
  }
  // 运算结束后取出结果
  let result = stack.pop();
  console.log(result);
}

// 实现计算器运算逆波兰表达式
function getArrayStack() {
  return class arrayStack {
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

    // 栈的反向遍历
    reverseList(){
      if (this.isEmpty()) {
        console.log("栈空，无法遍历");
        return;
      }
      let arr = []
      for (let i = 0; i <= this.top; i++) {
        console.log(this.stack[i]);
        arr.push(this.stack[i])
      }
      return arr
    }
  };
}

export { priority, CalculateNum, isOper, suffixCalculate, getArrayStack };
