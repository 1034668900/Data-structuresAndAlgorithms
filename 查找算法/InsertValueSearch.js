/**
 * 插值查找算法
 * @param {Array} arr
 * @param {Number} left
 * @param {Number} right
 * @param {Number} value
 */
function insertValueSearch(arr, left, right, value) {
  let l = left;
  let r = right;
  let mid = l + ((value - arr[l]) * (r - l)) / (arr[r] - arr[l]);
  let order = arr[0] > arr[1] ? -1 : 1;

  // 插值查找时递归结束条件要注意待查询值是否超过了有序序列的最大最小值，
  //因为待查询值参与了中间下标的运算,如果不对该结束条件进行限制，会出现中间下标越界的情况
  if (order == 1 && (l > r || value < arr[0] || value > arr[arr.length - 1]))
    return -1;

  if (order == -1 && (l > r || value > arr[0] || value < arr[arr.length - 1]))
    return -1;

  if (value > arr[mid]) {
    if (order == 1) {
      // 升序，向右递归
      return insertValueSearch(arr, mid + 1, right, value);
    } else {
      // 降序，向左递归
      return insertValueSearch(arr, left, mid - 1, value);
    }
  } else if (value < arr[mid]) {
    if (order == 1) {
      // 升序，向左递归
      return insertValueSearch(arr, left, mid - 1, value);
    } else {
      // 降序，向右递归
      return insertValueSearch(arr, mid + 1, right, value);
    }
  } else {
    // 找到了
    return mid;
  }
}

let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let res = insertValueSearch(arr, 0, arr.length - 1, 9);
console.log(res);
