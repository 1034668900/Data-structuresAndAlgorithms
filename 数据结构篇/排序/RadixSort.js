// 基数排序
function radixSort(arr) {
  if (!(arr instanceof Array)) return;
  let buckets = []; // 存储所有桶
  // 添加十个桶
  for (let i = 0; i < 10; i++) {
    buckets[i] = [];
  }
  // 定义一个一维数组存放每个桶内部存储的数据的个数
  let bucketSaveCounts = [];
  // 初始化一维数组
  for (let i = 0; i < 10; i++) {
    bucketSaveCounts[i] = 0;
  }

  // 获得数组中最大值的位数（因为排序的次数取决于数组中最大值的位数-1）
  let maxValLen = (Math.max(...arr) + "").length;
  let index = 0;
  for (let count = 0; count < maxValLen; count++) {
    // 针对每个元素的个位进行排序处理
    for (let i = 0; i < arr.length; i++) {
      // 记录当前位数   个位 十位 ..
      let unitsDigit = parseInt(arr[i] / Math.pow(10, count)) % 10;
      // 根据位数，将值放入对应的backet中(注意这里不能用i bucket[unitsDigit][i])
      buckets[unitsDigit][bucketSaveCounts[unitsDigit]] = arr[i];
      // 更新bucketSaveCounts中对应桶存储的数量
      bucketSaveCounts[unitsDigit]++;
    }
    // 桶中元素已经放好，需要将其取出重新放入arr
    index = 0;
    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < bucketSaveCounts[i]; j++) {
        if (buckets[i].length !== 0) arr[index++] = buckets[i][j];
      }
      // 该桶元素放好后将其置空
      buckets[i] = []
    }
    // 每一轮结束需要将bucketSaveCounts统计的数量置0
    for (let i = 0; i < 10; i++) {
      bucketSaveCounts[i] = 0;
    }
  }
  return arr;
}

let arr1 = [3, 324, 542, 123, 53, 64, 87, 33, 21, 13, 245,132];
let res = radixSort(arr1);
console.log(res);
