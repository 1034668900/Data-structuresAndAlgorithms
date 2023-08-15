// 图
class Graph {
  // 存储顶点的数组
  #vertexList = [];
  // 存储边的邻接数组
  #edges = [];
  // 记录边的个数
  #numOfEdges = 0;
  // 记录顶点被访问的情况
  #isVisited = [];

  constructor(vertexNum) {
    let row = null;
    // 初始化邻接矩阵
    for (let i = 0; i < vertexNum; i++) {
      row = [];
      for (let j = 0; j < vertexNum; j++) {
        row.push(0);
      }
      this.#edges.push(row);
      // 初始化顶点访问情况
      this.#isVisited.push(false);
    }
  }

  /**
   * 得到第一个邻接节点的下标
   * @param {Number} index 当前顶点的下标
   * @returns -1表示不存在
   */
  getFirstNeighbor(index) {
    for (let i = 0; i < this.#vertexList.length; i++) {
      if (this.#edges[index][i] > 0) {
        return i;
      }
    }
    return -1;
  }

  /**
   *一个节点可能有多个邻接节点
   * 根据当前节点的前一个邻接节点的下标来获取下一个邻接节点
   * @param {Number} v1 当前节点
   * @param {Number} v2 当前节点第一个邻接节点
   * @returns -1表示不存在
   */
  getNextNeighbor(v1, v2) {
    for (let i = v2 + 1; i < this.#vertexList.length; i++) {
      if (this.#edges[v1][i] > 0) {
        return i;
      }
    }
    return -1;
  }

  /**
   * 深度优先遍历算法(对下标为i的一个进行dfs)
   * @param {Array} isVisited
   * @param {Number} i
   */
  #dfs(isVisited, i) {
    // 首先访问该节点，将其输出
    console.log(this.getValueByIndex(i) + "->");
    // 将该节点设置为已访问
    isVisited[i] = true;
    // 查找节点i的第一个邻接节点
    let w = this.getFirstNeighbor(i);
    while (w != -1) {
      // 如果w存在还需要判断w是否被访问过，因为有可能是因为回溯过来才存在的
      if (!isVisited[w]) {
        this.dfs(isVisited, w);
      }
      // 如果w已经被访问过,则查找邻接点的下一个邻接节点
      w = this.getNextNeighbor(i, w);
    }
  }

  /**
   * 上面只是对某一个顶点进行dfs
   * 需要遍历对所有的节点进行dfs
   */
  dfs() {
    for (let i = 0; i < this.getNumOfVertexs(); i++) {
      if (!this.#isVisited[i]) {
        this.#dfs(this.#isVisited, i);
      }
    }
  }

  /**
   * 对一个节点进行广度优先算法
   * @param {Array} isVisited
   * @param {Number} i
   */
  #bfs(isVisited, i) {
    // 表示队列的头节点对应的下标
    let u;
    // 表示邻接节点w
    let w;
    // 队列，记录当前节点及其邻接节点的访问的顺序
    let queue = [];
    // 输出当前节点信息
    console.log(this.getValueByIndex(i));
    // 将当前节点标记为已访问
    isVisited[i] = true;
    // 将当前节点坐标加入队列
    queue.push(i);
    // 循环遍历队列
    while (queue.length !== 0) {
      // 取出队列头节点下标
      u = queue.shift();
      // 获取第一个邻接节点下标w
      w = this.getFirstNeighbor(u);
      // 判断邻接节点是否存在,逐一将邻接节点进行输出
      while (w != -1) {
        // 再判断当前邻接节点是否被访问过
        if (!isVisited[w]) {
          // 输出邻接节点
          console.log(this.getValueByIndex(w) + "=>");
          // 将该邻接节点标记为已访问
          isVisited[w] = true;
          // 将其入队列
          queue.push(w);
        }
        // 如果当前邻接节点被访问过，则找当前节点u的邻接节点的下一个邻接节点
        w = this.getNextNeighbor(u, w);
      }
    }
  }
  /**
   * 对每个节点都进行BFS
   */
  bfs(){
    for(let i=0;i<this.getNumOfVertexs();i++){
        if(!this.#isVisited[i]){
            this.#bfs(this.#isVisited,i)
        }
    }
  }

  // 添加顶点
  insertVertex(vertex) {
    this.#vertexList.push(vertex);
  }
  /**
   * 添加边
   * @param {Number} row
   * @param {Number} col
   * @param {*} weight
   */
  insertEdge(row, col, weight) {
    // 无向图
    this.#edges[row][col] = weight;
    this.#edges[col][row] = weight;
    this.#numOfEdges++;
  }

  // 图的常用方法
  // 获取图的顶点个数
  getNumOfVertexs() {
    return this.#vertexList.length;
  }
  // 获取边的条数
  getNumOfEdges() {
    return this.#numOfEdges;
  }
  // 获取邻接矩阵某处的值
  getWeight(row, col) {
    return this.#edges[row][col];
  }
  // 获取某处顶点的值
  getValueByIndex(index) {
    return this.#vertexList[index];
  }
  // 遍历邻接矩阵
  showEdges() {
    for (let i = 0; i < this.#edges.length; i++) {
      console.log(this.#edges[i]);
    }
  }
}

let graph = new Graph(5);
let vertex = ["A", "B", "C", "D", "E"];
// 添加顶点
for (let i = 0; i < vertex.length; i++) {
  graph.insertVertex(vertex[i]);
}
// 添加边
// A-B A-C B-C B-D B-E
graph.insertEdge(0, 1, 1);
graph.insertEdge(0, 2, 1);
graph.insertEdge(1, 1, 1);
graph.insertEdge(1, 2, 1);
graph.insertEdge(1, 3, 1);
graph.insertEdge(1, 4, 1);

// 显示邻接矩阵
//graph.showEdges();
// dfs
//graph.dfs();
// bfs
graph.bfs()
