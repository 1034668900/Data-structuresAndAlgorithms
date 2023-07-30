// 快速排序
function quickSort(arr, left, right) {
  if (!(arr instanceof Array)) return;
  let l = left; // 左下标
  let r = right; // 右下标
  let pivot = parseInt(arr[(l+r)/2]); // 中轴值
  let temp = 0;
  while (l < r) {
    // 在pivot中值左边一直找，直到找到值大于等于pivot才退出
    while (arr[l] < pivot) {
      l++;
    }
    // 在pivot右边一直找，直到找到值小于等于pivot才退出
    while (arr[r] > pivot) {
      r--;
    }
    // 当l>r时，说明左侧都比中值小，右侧都比中值大了(递归的出口)
    if (l >= r) {
      break;
    }
    // 交换
    temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;

    // 交换完后还需要进行校验,若交换完后arr[l] == pivot,
    //那么此时应该把右侧r的值向左移动一下，
    //不然下一轮循环时，arr[l]<pivot这个条件始终不满足，那么l将不在移动，
    //此时如果右侧再找到一个合法值，那么再次交换就会把arr[l]再次移动到右侧，等于做了无用功
    if (arr[l] == pivot) {
      r--;
    }
    if (arr[r] == pivot) {
      l++;
    }
  }
  // 经过上述操作，此时已经根据中值pivot将值进行分割，
  //左侧均小于pivot,右侧均大于pivot,但两侧都不保证有序！还要对左右两侧进行递归排序
  if (l == r) {
    l++;
    r--;
  }
  // 左递归
  if (left < r) {
    quickSort(arr, left, r);
  }
  // 右递归
  if (l < right) {
    quickSort(arr, l, right);
  }
  return arr;
}

let arr = [
  2, 4, 6, 3, 2, 31, 5, 15, 3, -35, -54, 32, 2352, 65, -2334, 324, 2342,
];
let res = quickSort(arr, 0, arr.length - 1);
console.log(res);
