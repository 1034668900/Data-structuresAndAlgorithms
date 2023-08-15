import { isOper,CalculateNum,getArrayStack } from "./utils.js";

let arrayStack = getArrayStack()
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

let expression = "30 4 + 5 * 6 -";
suffixCalculate(expression);// 29
