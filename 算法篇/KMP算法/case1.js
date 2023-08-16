/**
 *暴力解法
 * @param {string} s
 * @return {boolean}
 */
 var repeatedSubstringPattern = function(s) {
    // 获取子串
    function getSub(s){
        let Sub = []
        for(let i=1;i<s.length;i++){
            Sub.push(s.slice(0,i))
        }
        return Sub
    }
    let SubStr = getSub(s)
    // 获取每一个子串
    for(let i=0;i<SubStr.length;i++){
        let subLen = SubStr[i].length
        let tempStr = s
        // 从主串上不断拆分和子串相等长度的串比较
        for(let j=0;j<Math.floor(s.length/subLen);j++){
            // 注意slice方法前闭后开
            let s1 = tempStr.slice(0,subLen)
            if(s1 == SubStr[i]){
                // 当tempStr串的长度和SubStr[i]相等时说明匹配完毕
                if(tempStr.length == SubStr[i].length)return true
                tempStr = tempStr.slice(subLen)
            }else{
                break
            }
        }
    }
    return false
};