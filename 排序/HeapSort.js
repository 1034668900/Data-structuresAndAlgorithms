// 堆排序
class HeapSort {
  // 堆排序的方法
  heapSort(arr) {
    let temp = 0
    // 将数组整体转换为大顶堆或小顶堆
    for (let i = parseInt(arr.length / 2) - 1; i >= 0; i--) {
        this.adjustHeap(arr,i,arr.length)
    }

    // 将堆顶元素与末尾元素交换（大顶堆）
    // 重新调整结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素
    // 反复执行调整+交换步骤，直到整个序列有序
    for(let j = arr.length -1;j>0;j--){
        // 交换
        temp = arr[j]
        // 每次经过adjustHeap的调整，最大的值都会在索引为0的地方
        arr[j] = arr[0]
        arr[0] = temp
        // 每次调整的长度都会逐渐减少（最大的已经确定，不用再管）
        this.adjustHeap(arr,0,j)
    }
    return arr
  }
  /**
   * 将一个数组以索引为i的非叶子节点为根节点的子树调整成大顶堆或小顶堆
   * @param {Array} arr 待调整的数组
   * @param {Number} i 表示非叶子节点在数组中的索引
   * @param {Number} length 表示对多少个元素进行调整，length是在逐渐减少的
   */
  adjustHeap(arr, i, length) {
    // 存储当前元素的值
    let temp = arr[i];
    // 开始调整
    for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
      // arr[k] < arr[k+1]表示左子节点的值小于右子节点的值
      if (k + 1 < length && arr[k] < arr[k + 1]) {
        k++; // 这种情况使k指向右子节点
      }
      // 到这里后，k指向的一定是左、右子节点中较大的一个
      if (arr[k] > temp) {
        // 如果子节点大于了父节点，就将其赋值给当前节点（大顶堆）
        arr[i] = arr[k];
        // 更新i的索引，循环比较
        i = k;
      } else {
        // 这里说明arr[k]<= temp,则arr[i]的值就是三者（当前非叶子节点及其左、右子节点）中最大的，不做改变
        break;
      }
    }
    // 当推出for循环后，已经将以i为父节点的树的最大值放在了当前子树的最顶部（局部的）
    // 再将顶部的值交换到被调换的位置（这里的i已经不是非叶子节点的索引，已经是被调换的节点的索引了）
    arr[i] = temp;
  }
}

let arr = [4, 6, 8, 5, 9];
let heap = new HeapSort()
heap.heapSort(arr)

console.log(heap.heapSort(arr));