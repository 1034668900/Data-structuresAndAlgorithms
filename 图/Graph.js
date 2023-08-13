// 图
class Graph{
    // 存储顶点的数组
    #vertexList = []
    // 存储边的邻接数组
    #edges = []
    // 记录边的个数
    #numOfEdges = 0

    constructor(vertexNum){
        let row = null
        // 初始化邻接矩阵
        for(let i=0;i<vertexNum;i++){
            row = []
            for(let j=0;j<vertexNum;j++){
                row.push(0)
            }
            this.#edges.push(row)
        }
    }
    // 添加顶点
    insertVertex(vertex){
        this.#vertexList.push(vertex)
    }
    /**
     * 添加边
     * @param {Number} row 
     * @param {Number} col 
     * @param {*} weight 
     */
    insertEdge(row,col,weight) {
        // 无向图
        this.#edges[row][col] = weight
        this.#edges[col][row] = weight
        this.#numOfEdges++
    }

    // 图的常用方法
    // 获取图的顶点个数
    getNumOfVertexs(){
        return this.#vertexList.length
    }
    // 获取边的条数
    getNumOfEdges(){
        return this.#numOfEdges
    }
    // 获取邻接矩阵某处的值
    getWeight(row,col){
        return this.#edges[row][col]
    }
    // 遍历邻接矩阵
    showEdges(){
        for(let i=0;i<this.#edges.length;i++){
            console.log(this.#edges[i]);
        }
    }
}

let graph = new Graph(5)
let vertex = ["A","B","C","D","E"]
// 添加顶点
for(let i=0;i<vertex.length;i++){
    graph.insertVertex(vertex[i])
}
// 添加边
// A-B A-C B-C B-D B-E
graph.insertEdge(0,1,1)
graph.insertEdge(0,2,1)
graph.insertEdge(1,1,1)
graph.insertEdge(1,2,1)
graph.insertEdge(1,3,1)
graph.insertEdge(1,4,1)

// 显示邻接矩阵
graph.showEdges()