import { priority,isOper,CalculateNum } from "./utils.js";
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
