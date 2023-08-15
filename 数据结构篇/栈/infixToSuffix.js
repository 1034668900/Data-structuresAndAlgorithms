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
  while (true) {
    if (s1.isEmpty()) break;
    let oper = s1.pop();
    s2.push(oper);
  }

  // 输出s1
  s2.reverseList();
}

let infix = "1 + ( ( 2 + 3 ) * 4 ) - 5";

infixToSuffix(infix);
