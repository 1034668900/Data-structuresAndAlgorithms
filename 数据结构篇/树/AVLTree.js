// AVL 树

// 节点类
class Node {
  // 权
  value;
  left;
  right;
  constructor(value) {
    this.value = value;
  }

  // 左旋转
  leftRotate() {
    // 以当前根节点的值创建新的节点
    let newNode = new Node(this.value);
    // 把新的节点的左子树设置成当前节点的左子树
    newNode.left = this.left;
    // 把新的节点的右子树设置成当前节点右子树的左子树
    newNode.right = this.right.left;
    // 把当前节点的值替换成右子节点的值
    this.value = this.right.value;
    // 把当前节点的右子树设置成右子树的右子树
    this.right = this.right.right;
    // 把当前节点的左子树设置成新的节点
    this.left = newNode;
  }

  // 右旋转
  rightRotate() {
    // 以当前节点的值创建新的节点
    let newNode = new Node(this.value);
    // 把新节点的右子树设置为当前节点的右子树
    newNode.right = this.right;
    // 把新节点左子树设置为当前节点的左子树的右子树
    newNode.left = this.left.right;
    // 把当前节点的值换为左子节点的值
    this.value = this.left.value;
    // 把当前节点的左子树设置为左子树的左子树
    this.left = this.left.left;
    // 把当前节点的右子树设置为新节点
    this.right = newNode;
  }

  // 返回当前节点的高度
  getHeight() {
    return (
      Math.max(
        !this.left ? 0 : this.left.getHeight(),
        !this.right ? 0 : this.right.getHeight()
      ) + 1
    );
  }

  // 返回左子树的高度
  getLeftHeight() {
    if (this.left) {
      return this.left.getHeight();
    }
    return 0;
  }
  // 返回右子树的高度
  getRightHeight() {
    if (this.right) {
      return this.right.getHeight();
    }
    return 0;
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

    // 添加完后判断右子树和左子树的高度
    if (this.getRightHeight() - this.getLeftHeight() > 1) {
      // 如果当前节点的右子树的左子树高度大于它的右子树的高度
      if (
        this.right &&
        this.right.getLeftHeight() > this.right.getRightHeight()
      ) {
        // 需要先对右子树进行右旋转，再对当前节点左旋转
        this.right.rightRotate();
        this.leftRotate();
      } else {
        // 左旋转
        this.leftRotate();
      }
      return 
    }
    if (this.getLeftHeight() - this.getRightHeight() > 1) {
      // 需要判断当前节点的左子树的右子树高度是否大于其左子树高度
      if (this.left && this.left.getRightHeight() > this.left.getLeftHeight()) {
        // 需要先对子树左旋转，再对当前节点右旋转
        this.left.leftRotate();
        this.rightRotate();
      } else {
        // 右旋转
        this.rightRotate();
      }
      return
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

// 创建AVL
class AVL {
  // 根节点
  root;

  /**
   * 创建AVL
   * @param {Array} arr
   */
  createAVL(arr) {
    if (!(arr instanceof Array)) return;
    for (let i = 0; i < arr.length; i++) {
      this.add(new Node(arr[i]));
    }
  }

  add(node) {
    if (!this.root) {
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
   * AVL节点的删除(三种情况)
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
        if (targetNode.left && targetNode.right) {
          // 根节点左右都有子节点
          var leftMaxValue = this.delLeftMaxNode(targetNode);
          targetNode.value = leftMaxValue;
        } else if (!targetNode.left && !targetNode.right) {
          // 只有根节点了
          this.root = null;
        } else {
          // 根节点只有一颗子树
          if (targetNode.left) {
            // 只有左子树
            this.root = targetNode.left;
          } else {
            // 只有右子树
            this.root = targetNode.right;
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
          var minNodeValue = this.delRightMinNode(targetNode.right);
          targetNode.value = minNodeValue;
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
  delRightMinNode(targetNode) {
    var tempNode = targetNode;
    while (tempNode.left) {
      tempNode = tempNode.left;
    }
    this.delNode(tempNode.value);
    return tempNode.value;
  }
  /**
   * 以传入的node为根节点，找到其左子树中权值最大的节点将其删除并返回值
   * @param {*} targetNode
   */
  delLeftMaxNode(targetNode) {
    var tempNode = targetNode;
    while (tempNode.right) {
      tempNode = tempNode.right;
    }
    this.delNode(tempNode.value);
    return tempNode.value;
  }

  /**
   * 中序遍历AVL
   */
  infixOrder(node) {
    if (this.root == null) return;
    if (node == null) return;
    if (node.left !== null) this.infixOrder(node.left);
    console.log("中序遍历权值为：", node.value);
    if (node.right !== null) this.infixOrder(node.right);
  }
}

let arr = [4, 3, 6, 5, 7, 8]; // 左
let arr1 = [10, 12, 8, 9, 7, 6]; // 右旋转
let avl = new AVL();
avl.createAVL(arr1);
console.log("树的高度为：", avl.getRoot().getHeight());
console.log("左子树的高度为：", avl.getRoot().getLeftHeight());
console.log("右子树的高度为：", avl.getRoot().getRightHeight());
