/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-parameter-properties */
/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-properties */
/* eslint-disable max-classes-per-file */

/**
 * 用于 lettcode 解题
 */
export class TreeNode<T = number> {
  public val: T | number;
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;

  constructor(val?: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right)
  }
}



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
/**
 * 构建二叉树
 */
class Tree<T>{
  constructor(data: T[]) {
    // 定义根节点
    let root: Node<T> | undefined;
    // 临时存放节点信息
    const nodeList = [];

    for (let i = 0, len = data.length; i < len; i++) {
      const curNode = new Node(data[i]);
      nodeList.push(curNode);
      if (i > 0) {
        // 当前元素所在行
        const curLine = Math.floor(Math.sqrt(i + 1));
        // 存放当前元素上一行首
        const curLineIndex = Math.pow(2, curLine) - 1;
        // 存放当前元素所在行首
        const preLineIndex = Math.pow(2, curLine - 1) - 1;
        const parent = nodeList[preLineIndex + Math.floor((i - curLineIndex) / 2)];
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

  static isSymmetric(root: Node<number>) {
    const walk = (left: Node<number>, right: Node<number>): boolean => {
      if (!root) {
        return true;
      }
      // 成为叶子节点时
      if (!left && !right) {
        return true;
      }
      if ((left && !right) || (!left && right) || left.val !== right.val) {
        return false
      }
      return walk(left.left!, right.right!) && walk(left.right!, right.left!)
    }
    return walk(root.left!, root.right!)
  }
}
/**
 * 构建二叉搜素树
 * 特征如下:
 * 节点的左子树只包含小于当前节点的数。
 * 节点的右子树只包含大于当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 */
class SearchTree {
  constructor(nums: any[]) {
    const root = new Node(nums.shift()!);
    nums.forEach(num => {
      SearchTree.insert(root, num);
    })
    return root;
  }
  /**
   * @description 构建搜素树
   * @param node 树节点
   * @param val 传入的值
   */
  private static insert(node: Node<any>, val: number) {
    // 左子树
    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
      } else {
        this.insert(node.left, val);
      }
    }
    // 右子树
    if (val > node.val) {
      if (!node.right) {
        node.right = new Node(val);
      } else {
        this.insert(node.right, val);
      }
    }
  }
  /**
   * 验证是否是搜索二叉树
   * @param root 树根节点
   */
  static isvaildBST(root: Node<number> | undefined): boolean {
    let max = Number.MIN_SAFE_INTEGER;
    let isValidBSTFlag = true;
    const search = (root: Node<number> | undefined) => {
      if (root) {
        search(root.left);
        if (root.val > max) {
          max = root.val;
        } else {
          isValidBSTFlag = false;
        }
        search(root.right);
      }
    }
    search(root)
    return isValidBSTFlag;
  }
}

export {
  Node,
  SearchTree,
  Tree
}