/**
 * 斐波那契查找
 * @param {Array} arr 被查找序列
 * @param {Number} key 查找的值
 */
function fibonacciSearch(arr, key) {
    let low = 0
    let high = arr.length-1
    let k = 0//斐波那契数列分割数值的下标
    let mid = 0
    let fibArr = fib(50)// 获取斐波那契数列
    // 获取到斐波那契分割数值的下标
    while(high > fibArr[k]-1){
        k++
    }
    // 因为fibArr[k]对应的值可能大于arr数组的长度，因此我们对arr数组进行一下扩容
    if(fibArr[k]-1 >= arr.length){
        for(let i=arr.length;i<fibArr[k];i++){
            arr[i] = arr[high]
        }
    }
    // 利用循环来找到key（low <= high 便可继续找）
    while(low <= high){
        mid =low + fibArr[k-1]-1
        // 拿到mid后进行判断
        if(key < arr[mid]){
            // 向左侧找
            high = mid-1
            // 因为fibArr[k] = fibArr[k-1] + fibArr[k-2],则左侧就是fibArr[k-1],因此需要k = k-1
            k = k-1
        }else if(key > arr[mid]){
            // 向右寻找
            low = mid+1
            k = k-2
        }else{
            // 此时key == arr[mid]，则找到啦，但是需要判断应该返回哪个下标
            if(mid <= high){
                return mid
            }else{
                return high
            }

        }
    }
    // 执行到这里说明在上面while里一直没找到，则返回-1
    return -1

}

// 准备一个斐波那契数列(非递归方式)
function fib(maxSize) {
  let f = [];
  f[0] = 1;
  f[1] = 1;
  for (let i = 2; i < maxSize; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f;
}
// 递归方式获取斐波那契数列
function fibRecursion(maxSize) {
  if(maxSize == 1){
    return [1]
  }else if(maxSize == 2){
    return [1,1]
  }else{
    return fibRecursion(maxSize-1) + fibRecursion(maxSize-2)
  }
}


let arr = [1,23,33,53,65,75,234,645,1234,4224]
let res = fibonacciSearch(arr,1234)
console.log(res);//8