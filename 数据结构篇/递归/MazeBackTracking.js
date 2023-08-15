// 迷宫回溯问题
/* 
  1.定义一个7*8的迷宫地图，规定如下：
    1. 数字0表示此路没走过
    2. 数字1表示墙，无法通过
    3. 数字2表示可以通过
    4. 数字3表示此路已经走过，但不通
    
  2.定义起点为（1,1）
  3.定义终点为（5,6）
  4.定义一个策略（行走路线）：下 - 右 - 上 - 左
*/

// 定义一个迷宫地图
const map = [];
for (let i = 0; i < 7; i++) {
  map[i] = [];
  for (let j = 0; j < 8; j++) {
    if (i == 0 || i == 6) {
      map[i][j] = 1;
    } else if (j == 0 || j == 7) {
      map[i][j] = 1;
    } else {
      map[i][j] = 0;
    }
  }
}

// 设置挡墙
map[2][1] = 1;
map[3][1] = 1;

// 输出地图
console.log(map);

// 递归回溯找路
/*
  map:地图
  i  ：起点行
  j  ：起点列
 */
function findWay(map, i, j) {
  // 如果找到终点
  if(map[5][6] == 2 ){
    return true
  }else{
    // 没找到终点，判断当前道路是否走过
    if(map[i][j] == 0){
      // 还没走过 -- 根据策略尝试  下 - 右 - 上 - 左
      // 首先假设该点有路可以通过
      map[i][j] = 2
      if(findWay(map,i+1,j)){
        // 向下
        return true
      }else if(findWay(map,i,j+1)){
        // 向右
        return true
      }else if(findWay(map,i-1,j)){
        // 向上
        return true
      }else if(findWay(map,i,j-1)){
        // 向左
        return true
      }else{
        // 都走过了，但不通
        map[i][j] = 3
        return false
      }
    }else{
      // map[i][j] != 0   那么有可能是1,2,3
      return false
    }
  }
}
// 递归回溯找终点
findWay(map,1,1)

console.log("@@@",map);

