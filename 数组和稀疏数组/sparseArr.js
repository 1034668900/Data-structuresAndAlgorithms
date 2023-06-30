let rawArr = [[0,1,0,0],[0,0,2,0],[0,2,1,0],[0,1,2,0]]

function toSparseArr(arr){
    // 数据校验
    if(!arr instanceof Array)return;
    // 记录原始数组中有效数据个数
    let sum=0
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            if(arr[i][j]!=0)sum++
        }
    }
    // 创建稀疏数组
    let sparseArr = [sum+1][3]
    // 记录原始数组的行数、列数以及有效数据的个数
    sparseArr[0][0] = rawArr.length
    sparseArr[0][1] = rawArr[0].length
    sparseArr[0][2] = sum
    // 将原始数据的有效值赋值给稀疏数组
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            if(arr[i][j]!=0){
                
            }
        }
    }

}

toSparseArr(rawArr)
