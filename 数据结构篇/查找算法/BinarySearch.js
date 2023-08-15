/**
 * 二分查找
 * @param {Array} arr // 必须是一个有序的数组
 * @param {Number} left
 * @param {Number} right
 * @param {Number} value
 */
function binarySearch(arr, left, right, value) {
  let l = left;
  let r = right;
  let mid = parseInt((l + r) / 2);
  // 判断数组是升序还是降序
  let order = arr[0] - arr[1] > 0 ? -1 : 1;
  if (l > r) {
    // 遍历完了也没找到
    return -1;
  }
  // 比较
  if (value > arr[mid]) {
    if (order == 1) {
      // 升序，向右递归
      return binarySearch(arr, mid + 1, right, value);
    } else {
      // 降序，向左递归
      return binarySearch(arr, left, mid - 1, value);
    }
  } else if (value < arr[mid]) {
    if (order == 1) {
      // 升序，向左递归
      return binarySearch(arr, left, mid - 1, value);
    } else {
      // 降序，向右递归
      return binarySearch(arr, mid + 1, right, value);
    }
  } else {
    // 找到了
    return mid;
  }
}

let arr = [7,6,5,4,3,2,1];

let res = binarySearch(arr, 0, arr.length - 1, 1);
console.log(res);
