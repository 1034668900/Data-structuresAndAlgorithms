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

// 生成数据量的数组
let arr = [];
for (let i = 0; i < 8000; i++) {
  let res = Math.floor(Math.random() * 8000);
  arr.push(res);
}
let time1 = Date.now();
let newArr = bubbleSort(arr, 1);
let time2 = Date.now();
let time = (time2 - time1) / 1000;
console.log(time,newArr); //9s左右

