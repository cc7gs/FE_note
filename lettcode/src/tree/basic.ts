/**
 * 构建二叉树
 */

class Node<T> {
  left: Node<T> | undefined;
  right: Node<T> | undefined;
  constructor(public val: T) {
    this.val = val;
    this.left = this.right = undefined;
  }
}
class Tree<T>{
  constructor(data: T[]) {
    //定义根节点
    let root: Node<T>;
    //临时存放节点信息
    let nodeList = [];

    for (let i = 0, len = data.length; i < len; i++) {
      let curNode = new Node(data[i]);
      nodeList.push(curNode);
      if (i > 0) {
        //当前元素所在行
        let curLine = Math.floor(Math.sqrt(i + 1));
        //存放当前元素上一行首
        let curLineIndex = Math.pow(2, curLine) - 1;
        //存放当前元素所在行首
        let preLineIndex = Math.pow(2, curLine - 1) - 1;
        let parent = nodeList[preLineIndex + Math.floor((i - curLineIndex) / 2)];
        if (parent.left) {
          parent.right = curNode;
        } else {
          parent.left = curNode;
        }
      }
    }
    root = nodeList.shift()!;
    nodeList.length = 0;
    return root;
  }

  static isSymmetric(root: Node<Number>) {
    const walk = (left: Node<Number>, right: Node<Number>): boolean => {
      //成为叶子节点时
      if (!left && !right) {
        return true;
      }
      if (left.val !== right.val || (left && !right) || (!left && right)) {
        return false
      }
      return walk(left.left!, right.right!) && walk(left.right!, right.left!)
    }
    return walk(root.left!, root.right!)
  }
}
export {
  Node,
  Tree
}