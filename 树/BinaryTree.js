// 二叉树

// heroNode节点
class HeroNode {
  #name;
  #id;
  #left = null; // 左指针
  #right = null; // 右指针
  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  getId() {
    return this.#id;
  }
  setId(id) {
    this.#id = id;
  }
  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }
  setLeft(node) {
    this.#left = node;
  }
  setRight(node) {
    this.#right = node;
  }
  // 重写toString
  toString() {
    console.log(`{id：${this.#id},name:${this.#name}}`);
  }

  // 前序遍历
  preOrder() {
    console.log({ id: this.#id, name: this.#name });
    // 递归向左子树前序遍历
    if (this.#left != null) {
      this.#left.preOrder();
    }
    // 递归向右子树前序遍历
    if (this.#right != null) {
      this.#right.preOrder();
    }
  }
  // 中序遍历
  infixOrder() {
    // 先递归向左中序遍历左子树
    if (this.#left != null) {
      this.#left.infixOrder();
    }
    // 输出父节点
    console.log({ id: this.#id, name: this.#name });
    // 再递归向右中序遍历右子树
    if (this.#right != null) {
      this.#right.infixOrder();
    }
  }
  // 后序遍历
  postOrder() {
    // 先递归向左后序遍历左子树
    if (this.#left != null) {
      this.#left.postOrder();
    }
    // 再递归向右后序遍历右子树
    if (this.#right != null) {
      this.#right.postOrder();
    }
    // 输出父节点
    console.log({ id: this.#id, name: this.#name });
  }

  // 前序查找
  preFind(id) {
    // 先比对当前节点
    if (this.#id == id) {
      console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
      return this;
    }
    let result = null;
    // 递归向左遍历查找
    if (this.#left != null) {
      result = this.#left.preFind(id);
    }
    if (result != null) {
      // 说明左子树找到
      return result;
    }
    // 递归向右遍历查找
    if (this.#right != null) {
      result = this.#right.preFind(id);
    }
    return result;
  }
  // 中序查找
  infixFind(id) {
    let result = null;
    // 先向左遍历查找
    if (this.#left != null) {
      result = this.#left.infixFind(id);
    }
    if (result != null) {
      return result;
    }
    // 再比较当前
    if (this.#id == id) {
      console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
      return this;
    }
    // 向右遍历查找
    if (this.#right != null) {
      result = this.#right.infixFind(id);
    }
    return result;
  }
  // 后序查找
  postFind(id) {
    let result = null;
    // 向左遍历查找
    if (this.#left != null) {
      result = this.#left.postFind(id);
    }
    if (result != null) {
      return result;
    }
    // 向右遍历查找
    if (this.#right != null) {
      result = this.#right.postFind(id);
    }
    // 比较当前
    if (this.#id == id) {
      console.log("找到id为:" + id + "的角色，其名为：" + this.#name);
      return true;
    }
    return result;
  }

  // 节点的删除
  deleteNode(id) {
    // 如果当前节点的左子节点不为空，且左子节点就是要删除的节点，就将this.#left = null，并结束递归
    if (this.#left != null && this.#left.getId() == id) {
      this.#left = null;
      return;
    }
    // 如果当前节点的右子节点不为空，且右子节点就是要删除的节点，就将this.#right= null，并结束递归
    if (this.#right != null && this.#right.getId() == id) {
      this.#right = null;
      return;
    }
    // 向左子树递归删除
    if (this.#left != null) {
      this.#left.deleteNode(id);
    }
    // 向右子树递归删除
    if (this.#right != null) {
      this.#right.deleteNode(id);
    }
  }
}

// 创建二叉树
class BinaryTree {
  #root = null;
  constructor(root) {
    this.#root = root;
  }

  // 前序遍历
  preOrder() {
    if (this.#root != null) {
      this.#root.preOrder();
    } else {
      console.log("二叉树为空，无法遍历");
    }
  }
  // 中序遍历
  infixOrder() {
    if (this.#root != null) {
      this.#root.infixOrder();
    } else {
      console.log("二叉树为空，无法遍历");
    }
  }
  // 后序遍历
  postOrder() {
    if (this.#root != null) {
      this.#root.postOrder();
    } else {
      console.log("二叉树为空，无法遍历");
    }
  }
  // 前序查找
  preFind(id) {
    if (this.#root != null) {
      let flag = this.#root.preFind(id);
      if (flag) {
        flag.toString();
      } else {
        console.log("未找到id为" + id + "的角色");
      }
    } else {
      console.log("二叉树为空，无法查找");
    }
  }
  // 中序查找
  infixFind(id) {
    if (this.#root != null) {
      let flag = this.#root.infixFind(id);
      if (flag) {
        flag.toString();
      } else {
        console.log("未找到id为" + id + "的角色");
      }
    } else {
      console.log("二叉树为空，无法查找");
    }
  }
  // 后序查找
  postFind(id) {
    if (this.#root != null) {
      let flag = this.#root.postFind(id);
      if (flag) {
        flag.toString();
      } else {
        console.log("未找到id为" + id + "的角色");
      }
    } else {
      console.log("二叉树为空，无法查找");
    }
  }

  // 节点的删除
  deleteNode(id) {
    if (this.#root != null) {
      if (this.#root.getId() == id) {
        // 先看删除的是否为根节点
        this.#root = null;
        return;
      }else{
        // 对根节点调用deleteNode，递归删除节点
        this.#root.deleteNode(id)
      }
    }else{
      console.log("二叉树为空，无法删除");
    }
  }
}

// 实例几个节点
const root = new HeroNode(1, "fc");
const heroNode2 = new HeroNode(2, "ly");
const heroNode3 = new HeroNode(3, "fy");
const heroNode4 = new HeroNode(4, "John");
const heroNode5 = new HeroNode(5, "Milk");

root.setLeft(heroNode2);
root.setRight(heroNode3);
heroNode3.setLeft(heroNode4);
heroNode3.setRight(heroNode5);
// 实例一颗二叉树
const binaryTree = new BinaryTree(root);
binaryTree.deleteNode(5);
binaryTree.preOrder()
