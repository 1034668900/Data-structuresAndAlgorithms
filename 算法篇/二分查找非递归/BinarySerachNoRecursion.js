/**
 * 二分查找非递归实现
 * @param {Array} arr 有序数组，以升序为例
 * @param {*} target
 * @return 返回对应下标，-1表示没找到
 */
function binarySearch(arr, target) {
  // 左索引
  let leftPointer = 0;
  // 右索引
  let rightPointer = arr.length - 1;
  // 中间索引
  let mid = 0;
  // 循环查找
  while (leftPointer <= rightPointer) {
    // 获取中间索引
    mid = Math.floor((leftPointer + rightPointer) / 2);
    // 判断
    if (arr[mid] == target) {
      // 找到了
      return mid;
    } else {
      // 没找到,判断中间值比目标值大了还是小了
      if (arr[mid] > target) {
        // 中值大，需要向左找
        rightPointer = mid - 1;
      } else {
        // 中值小，需要向右找
        leftPointer = mid + 1;
      }
    }
  }
  // 到这里说明没找到
  return -1
}


let arr = [1,2,3,4,5,6,7,8,9,10]
console.log(binarySearch(arr,10));// 9