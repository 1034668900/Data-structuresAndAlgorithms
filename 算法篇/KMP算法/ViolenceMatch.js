/**
 * 暴力匹配算法
 * @param {String} str1 待匹配的串
 * @param {String} str2 匹配的关键词
 * @return 匹配成功返回开始的索引，失败返回-1
 */
function violenceMatch(str1, str2) {
  let str1Arr = str1.split(""),
    str2Arr = str2.split("");

  // 两个数组的长度
  let str1Len = str1Arr.length,
    str2Len = str2Arr.length;
  // 两个数组的索引
  let str1Index = 0,
    str2Index = 0;

  // 循环匹配
  while(str1Index<str1Len && str2Index<str2Len){
    if(str1Arr[str1Index] == str2Arr[str2Index]){
        // 当前项匹配成功
        if(str2Index== str2Len-1){
            // 匹配完成
            return str1Index-str2Index
        }
        str1Index++
        str2Index++
    }else{
        // 匹配失败则回溯
        str1Index = str1Index-(str2Index-1)
        str2Index = 0
    }
  }
  return -1
}

let str1 = '你爱我 我爱你 蜜雪冰城甜蜜蜜'
let str2 = '甜蜜蜜'
console.log(violenceMatch(str1,str2));// 12