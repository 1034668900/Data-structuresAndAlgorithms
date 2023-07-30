
// 冒泡排序
/* 
    order表示正反排序
*/
function bubbleSort(arr, order) {
  // 数据校验
  if (!(arr instanceof Array) && typeof (order !== "number")) return;
  // 排序
  let temp = 0;
  let flag;
  for (let i = 0; i < arr.length - 1; i++) {
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
  if (!flag) {
    switch (order) {
      case 1:
        return arr;
        break;
      case -1:
        return arr.reverse();
        break;
      default:
        break;
    }
  }
}

// 生成数据量的数组
let arr = [];
for (let i = 0; i < 80000; i++) {
  let res = Math.floor(Math.random() * 80000);
  arr.push(res);
}
let time1 = Date.now()
let newArr = bubbleSort(arr, 1);
let time2 = Date.now()
let time = (time2-time1)/1000
console.log(time);//9s左右
