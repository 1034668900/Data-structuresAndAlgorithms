// 归并排序

/**
 *
 * @param {Array} arr 待排序数组
 * @param {Number} left 左侧开始索引
 * @param {Number} mid 中间索引
 * @param {Number} right 右侧结束索引
 * @param {Array} temp 中转数组
 */
function merge(arr, left, mid, right, temp) {
  let i = left; // 记录左侧起始索引
  let j = mid + 1; // 记录右侧起始索引
  let t = 0; // 记录中转数组起始下标
  while (i <= mid && j <= right) {
    // 将左右两侧值进行比较将较小的值放入临时数组（从小到大排序）
    if (arr[i] <= arr[j]) {
      temp[t] = arr[i];
      t++;
      i++;
    } else {
      temp[t] = arr[j];
      t++;
      j++;
    }
  }
  // 出了上面循环后，说明左右两侧肯定有一侧的数据已经比较完了
  // 此时需要将剩余的那一侧的数据依次放入临时数组
  while (i <= mid) {
    temp[t] = arr[i];
    t++;
    i++;
  }
  while (j <= right) {
    temp[t] = arr[j];
    t++;
    j++;
  }

  // 经过上述操作，此时temp已经是有序的了，此时将temp的值拷贝到arr
  t = 0;
  let tempLeft = left;
  while (tempLeft <= right) {
    arr[tempLeft] = temp[t];
    tempLeft++;
    t++;
  }
}

/**
 *
 * @param {Array} arr
 * @param {Number} left
 * @param {Number} right
 * @param {Array} temp
 */
function mergeSort(arr, left, right, temp) {
  if(left < right){
    let mid = parseInt((left + right) / 2);
    // 向左递归分解
    mergeSort(arr,left,mid,temp)
    // 向右递归分解
    mergeSort(arr,mid+1,right,temp)
    // 合并
    merge(arr,left,mid,right,temp)
  }
  return arr
}

let arr = [2,-32,34,223,6,8,9,3,34,24,343,81,45]
let temp = []
let res = mergeSort(arr,0,arr.length-1,temp)
console.log(res);

