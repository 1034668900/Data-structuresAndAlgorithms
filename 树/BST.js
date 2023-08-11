// BInary Sort Tree

// 节点类
class Node {
  // 权
  value;
  left;
  right;
  constructor(value) {
    this.value = value;
  }

  /**
   * 添加节点
   * @param {*} node
   */
  addNode(node) {
    // 比较添加节点和当前子树根节点得值
    if (node.value < this.value) {
      if (!this.left) {
        this.left = node;
      } else {
        // 当前子树根节点的左节点不为空则递归向左添加
        this.left.addNode(node);
      }
    } else {
      if (!this.right) {
        this.right = node;
      } else {
        this.right.addNode(node);
      }
    }
  }

  /**
   * 根据权值寻找被删除节点，并将其返回
   * @param {Node} node
   * @return 如果找到则返回该节点，否则返回null
   */
  findDelNode(value) {
    if (this.value == value) return this;
    if (value < this.value) {
      // 左子节点
      if (!this.left) return null;
      return this.left.findDelNode(value);
    } else {
      // 右子节点
      if (!this.right) return null;
      return this.right.findDelNode(value);
    }
  }
  /**
   *
   * @param {*} value
   * @return 找到被删除节点的父节点
   */
  findParentNode(value) {
    if (
      (this.left && this.left.value == value) ||
      (this.right && this.right.value == value)
    ) {
      return this;
    } else {
      if (this.left && value < this.value) {
        return this.left.findParentNode(value);
      } else if (this.right !== null && value >= this.value) {
        return this.right.findParentNode(value);
      } else {
        return null;
      }
    }
  }
}
// 创建BST
class BST {
  // 根节点
  root;

  /**
   * 创建BST
   * @param {Array} arr
   */
  createBST(arr) {
    if (!(arr instanceof Array)) return;
    for (let i = 0; i < arr.length; i++) {
      this.add(new Node(arr[i]));
    }
  }

  add(node) {
    if (this.root == null) {
      this.root = node;
    } else {
      this.root.addNode(node);
    }
  }
  getRoot() {
    return this.root;
  }

  /**
   * 重新封装节点的查找方法
   * @param {*} value
   */
  findDelNode(value) {
    if (this.root == null) return null;
    return this.root.findDelNode(value);
  }

  /**
   * 重新封装查找节点的父节点的方法
   * @param {*} value
   */
  findParentNode(value) {
    if (this.root == null) return null;
    return this.root.findParentNode(value);
  }

  /**
   * BST节点的删除(三种情况)
   * 1. 删除叶子节点
   * 2. 删除只有一颗子树的节点
   * 3. 删除有两颗子树的节点（2，3需要考虑删除节点被删除后其子节点的位置）
   * 4. 要删除目标节点，我们必须拿到其父节点
   * 5. 被删除节点要存在
   *
   * 调用封装的查找方法找到目标节点和其父节点
   * @param {*} value
   */
  delNode(value) {
    var targetNode = this.findDelNode(value);
    if (!targetNode) {
      console.log("该节点不存在");
      return;
    } else {
      // 获取其父节点
      var parentNode = this.findParentNode(value);
      // 判断父节点是否存在（删除的节点是根节点时就不存咋父节点）
      if (!parentNode) {
        // 删除节点为根节点
        if(targetNode.left && targetNode.right){
            // 根节点左右都有子节点
            var leftMaxValue = this.delLeftMaxNode(targetNode)
            targetNode.value = leftMaxValue
        }else if(!targetNode.left && !targetNode.right){
            // 只有根节点了
            this.root = null
        }else{
            // 根节点只有一颗子树
            if(targetNode.left){
                // 只有左子树
                this.root = targetNode.left
            }else{
                // 只有右子树
                this.root = targetNode.right
            }
        }
        return;
      } else {
        // 当被删除节点为叶子节点时
        if (!targetNode.left && !targetNode.right) {
          // 需要判断targetNode是parentNode的左子节点还是右子节点
          if (parentNode.left && parentNode.left.value == value) {
            // 左子节点
            parentNode.left = null;
            return;
          } else if (parentNode.right && parentNode.right.value == value) {
            // 右子节点
            parentNode.right = null;
            return;
          }
        } else if (targetNode.left && targetNode.right) {
          // 当被删除节点有两颗子树
          //(两种思路：从左子树找最大的使targetNode.value = leftMaxNode.value,并删除最大节点)
          // 从右子树找最小的，删除并返回其值
            var minNodeValue = this.delRightMinNode(targetNode.right)
            targetNode.value = minNodeValue

        } else {
          // 当被删除节点只有一颗子树,需要判断targetNode是parentNode的左节点还是右节点
          if (targetNode.left) {
            if (parentNode.left.value == targetNode.value) {
              parentNode.left = targetNode.left;
            } else {
              parentNode.right = targetNode.left;
            }
          } else {
            if (parentNode.left.value == targetNode.value) {
              parentNode.left = targetNode.right;
            } else {
              parentNode.right = targetNode.right;
            }
          }
        }
      }
    }
  }

  /**
   * 以传入的node为根节点，找到其右子树中权值最小的节点将其删除并返回值
   * @param {*} targetNode 
   */
  delRightMinNode(targetNode){
    var tempNode = targetNode
    while(tempNode.left){
        tempNode = tempNode.left
    }
    this.delNode(tempNode.value)
    return tempNode.value
  }
  /**
   * 以传入的node为根节点，找到其左子树中权值最大的节点将其删除并返回值
   * @param {*} targetNode 
   */
  delLeftMaxNode(targetNode){
    var tempNode = targetNode
    while(tempNode.right){
        tempNode = tempNode.right
    }
    this.delNode(tempNode.value)
    return tempNode.value
  }

  /**
   * 中序遍历BST
   */
  infixOrder(node) {
    if (this.root == null) return;
    if (node == null) return;
    if (node.left !== null) this.infixOrder(node.left);
    console.log("中序遍历权值为：", node.value);
    if (node.right !== null) this.infixOrder(node.right);
  }
}

let arr = [7, 3, 10, 12, 5, 1, 9, 2];
let bst = new BST();
bst.createBST(arr);
bst.delNode(2);
bst.infixOrder(bst.getRoot());
