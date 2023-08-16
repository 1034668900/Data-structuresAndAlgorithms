/**
 * 获取字符串的部分匹配表
 * @param {Array} strArr
 */
function kmpNext(str) {
  // next数组用于保存部分匹配值(字符串长度为0时部分匹配值一定为0)
  let next = [0];
  for (let i = 1, j = 0; i < str.length; i++) {
    // 当str.charAt(i) == str.charAt(j)不满足时，需要从next[j-1]获取新的j
    // 直到发现有 str.charAt(i) == str.charAt(j) 成立才退出
    while (j > 0 && str.charAt(i) != str.charAt(j)) {
      j = next[j - 1];
    }
    // 当str.charAt(i) == str.charAt(j)满足时，部分匹配值+1
    if (str.charAt(i) == str.charAt(j)) {
      j++;
    }
    next[i] = j;
  }
  return next
}

/**
 * KMP匹配算法
 * @param {*} qStr
 * @param {*} pStr
 * @param {*} next 部分匹配表
 */
function kmpSearch(qStr, pStr, next) {
  for (let i = 0, j = 0; i < qStr.length; i++) {
    // 处理 qStr.charAt(i) !== pStr.charAt(j)的情况来调整j的大小
    while (j > 0 && qStr.charAt(i) !== pStr.charAt(j)) {
      j = next[j - 1];
    }
    if(qStr.charAt(i) === pStr.charAt(j)){
        j++
    }
    // 找到了的情况
    if(j == pStr.length){
        return i-(j-1)
    }
  }
  return -1
}


let qStr = '你爱我 我爱你 蜜雪冰城甜蜜蜜'
let pStr = '我爱你'
console.log(kmpSearch(qStr,pStr,kmpNext(pStr)));// 12