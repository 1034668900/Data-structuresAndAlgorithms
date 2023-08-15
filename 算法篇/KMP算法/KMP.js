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
 * @param {*} str1
 * @param {*} str2
 * @param {*} next 部分匹配表
 */
function kmpSearch(str1, str2, next) {
  for (let i = 0, j = 0; i < str1.length; i++) {
    // 处理 str1.charAt(i) !== str2.charAt(j)的情况来调整j的大小
    while (j > 0 && str1.charAt(i) !== str2.charAt(j)) {
      j = next[j - 1];
    }
    if(str1.charAt(i) === str2.charAt(j)){
        j++
    }
    // 找到了的情况
    if(j == str2.length){
        return i-(j-1)
    }
  }
  return -1
}


let str1 = '你爱我 我爱你 蜜雪冰城甜蜜蜜'
let str2 = '我爱你'
console.log(kmpSearch(str1,str2,kmpNext(str2)));// 12