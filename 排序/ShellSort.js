// 希尔排序在插入时--交换法实现
function shellSort(arr) {
  if (!(arr instanceof Array)) return;
  let count = 0;
  for (let gap = parseInt(arr.length / 2); gap > 0; gap = parseInt(gap / 2)) {
    let temp = 0; // 用于交换
    for (let i = gap; i < arr.length; i++) {
      // i的值控制了每次比较都是将每一组都比较一次，如此往复，并不是将某一组一次性比较完
      for (let j = i - gap; j >= 0; j -= gap) {
        // i从gap往上增长的过程中，每一组前面的数据只是相邻项进行了大小比较，但是比较后值交换后的顺序是不得而知的，因此每一组比较时j的值应该不断-gap往前挪再将前面的进行比较才能保证顺序
        if (arr[j] > arr[j + gap]) {
          temp = arr[j];
          arr[j] = arr[j + gap];
          arr[j + gap] = temp;
        }
      }
    }
    count++;
    console.log("希尔排序插入时交换法第" + count + "轮：", arr);
  }
}

// 希尔排序在插入时--移位法实现
function shellSortOfShift() {
  if (!(arr instanceof Array)) return;
  for (let gap = parseInt(arr.length / 2); gap > 0; gap = parseInt(gap / 2)) {
    for (let i = gap; i < arr.length; i++) {
      let j = i;
      let temp = arr[j]; // 临时变量存储待插入值
      if (arr[j] < arr[j - gap]) {
        // 移位找待插入位置
        while (j - gap >= 0 && temp < arr[j - gap]) {
          // 移位
          arr[j] = arr[j - gap];
          j -= gap;
        }
        // 当退出while循环时，说明找到了temp应该插入的位置,插入即可
        arr[j] = temp;
      }
    }
  }
  console.log(arr);
}

let arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];
shellSortOfShift(arr);
