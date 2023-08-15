// 选择排序
function sesectionSort(arr){
    // 数据校验
    if(!(arr instanceof Array))return
    // 记录最小值及其下标
    let minValue = 0
    let minIndex = 0
    for(let i=0;i<arr.length;i++){
        // 假设最小值
        minValue = arr[i]
        minIndex = i
        for(let j=i+1;j<arr.length;j++){
            if(minValue > arr[j]){
                // 说明假定的最小值有误,更新最小值及其下标
                minValue = arr[j]
                minIndex = j
            }
        }
        // 判断是否进入最小值假定失败的情况
        if(minIndex != i){
            // 交换最小值
            arr[minIndex] = arr[i]
            arr[i] = minValue
        }
    }
    return arr
}

let arr1 = [3,5,8,1,9,10,6]
let arr2 = sesectionSort(arr1)
console.log(arr1);// [1,3,5,6,8,9,10]