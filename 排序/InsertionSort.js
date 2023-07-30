// 插入排序
// arr = [3,5,6,2,4]
function insertionSort(arr){
    if(!(arr instanceof Array))return
    for(let i = 1;i<arr.length;i++){
        // 待插入值
        let insertionVal = arr[i]
        // 待插入位置
        let insertionIndex = i-1
        // insertionVal < arr[insertionIndex]时说明还没找到插入的位置，需要将arr[insertionIndex]后移（从小到大排序）
        while(insertionIndex>=0 && insertionVal < arr[insertionIndex]){
            arr[insertionIndex+1] = arr[insertionIndex]
            insertionIndex--
        }
        // 退出循环时说明插入的位置已找到
        arr[insertionIndex + 1] = insertionVal
    }
    return arr
}

let arr1 = [3,5,6,2,4]
let arr2 = insertionSort(arr1)
console.log(arr2);// [2,3,4,5,6]