let rawArr = [
  [0, 1, 0, 0],
  [7, 0, 2, 0],
  [0, 0, 1, 5],
  [0, 1, 0, 0],
  [0, 0, 0, 2]
];

function toSparseArr(arr) {
  // 数据校验
  if (!(arr instanceof Array)) return;
  // 记录原始数组中有效数据个数
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] != 0) sum++;
    }
  }
  // 创建稀疏数组
  let sparseArr = new Array(sum + 1);
  sparseArr[0] = new Array(3);
  // 记录原始数组的行数、列数以及有效数据的个数
  sparseArr[0][0] = rawArr.length;
  sparseArr[0][1] = rawArr[0].length;
  sparseArr[0][2] = sum;
  let m = 1;// 稀疏数组有效数据的索引
  // 将原始数据的有效值赋值给稀疏数组
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] != 0) {
        // 如果查询到不为0的数则创建一个数组存储对应数据
        sparseArr[m] =  Array(3);
        sparseArr[m][0] = i;// 行
        sparseArr[m][1] = j;// 列
        sparseArr[m][2] = arr[i][j];// 值
        m++;
      }
    }
  }
  return sparseArr
}

function toArray(sparseArr){
    // 合法性判断
    if(!(sparseArr instanceof Array))return
    // 读取稀疏数组第一行创建原始数组
    let row = sparseArr[0][0]// 行
    let col = sparseArr[0][1]// 列
    let val = sparseArr[0][2]// 有效数据个数
    // 创建原始数组
    let rawArr = []
    for(let i=0;i<row;i++){
        rawArr[i] =new Array(col)
    }
    // 记录稀疏数组索引
    let m=1
    // 读取稀疏数组的值将其赋给原始数组
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            // 如果稀疏数组的行和列分别同时与i，j相等，表示找到对应位置
            if(sparseArr[m][0]==i && sparseArr[m][1]==j){
                if(m>val)return
                rawArr[i][j] = sparseArr[m][2]
                m++;
            }else{
                rawArr[i][j] = 0
            }
        }
    }
    return rawArr
}

let sparseArr = toSparseArr(rawArr);
let rawArr1 = toArray(sparseArr);
console.log(sparseArr,rawArr1);
 