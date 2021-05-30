import { defaultCompare, ICompareFunction, Compare } from "./util";

class Node<T>{
    left: Node<T> | null;
    right: Node<T> | null;
    constructor(public value: T) {
        this.value = value;
        this.left = this.right = null
    }
    toString() {
        return `${this.value}`
    }
}

export class BinarySearchTree<T> {
    protected root: Node<T> | null;
    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
        this.root = null
    }
    /**
     * 向树中插入一个键
     * @param key 键
     */
    insert(key: T) {
        if (this.root === null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    protected insertNode(node: Node<T>, key: T) {
        if (this.compareFn(key, node.value) === Compare.LESS_THAN) {
            if (node.left === null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right === null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }
    /**
     * 在树中查找某一键
     * @param key  键
     * @returns Boolean
     */
    search(key: T) {
        return this.searchNode(this.root, key)
    }
    private searchNode(node: Node<T> | null, key: T): boolean {
        if (node === null) {
            return false
        }

        if (this.compareFn(key, node.value) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key)
        } else if (this.compareFn(key, node.value) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key)
        }
        return true
    }
    getRoot() {
        return this.root
    }

    /**
     * @name 反转树
     * @returns tree
     */
    invertTree() {
        const stack = [this.root];
        let curNode = null;
        let curIdx = 0;
        while (curNode = stack[curIdx++]) {
            [curNode.right, curNode.left] = [curNode.left, curNode.right]
        }
        return this.root;
    }

    /**
     * @name 中序遍历
     * @param callback (val)=>void
     */
    inOrderTraverse(callback: Function) {
        this.inOrderTraverseNode(this.root, callback)
    }
    private inOrderTraverseNode(node: Node<T> | null, callback: Function) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.value);
            this.inOrderTraverseNode(node.right, callback)
        }
    }

    /**
     * @name 先序遍历
     * @param callback (val)=>void
     */
    preOrderTraverse(callback: Function) {
        this.preOrderTraverseNode(this.root, callback)
    }
    private preOrderTraverseNode(node: Node<T> | null, callback: Function) {
        if (node !== null) {
            callback(node.value);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback)
        }
    }

    /**
    * @name 后序遍历
    * @param callback (val)=>void
    */
    postOrderTraverse(callback: Function) {
        this.postOrderTraverseNode(this.root, callback)
    }
    private postOrderTraverseNode(node: Node<T> | null, callback: Function) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback)
            callback(node.value);
        }
    }

    /**
     * @name 广度优先遍历(层级遍历)
     * @param callback （val)=>void
     */
    levelTraverse(callback: Function) {
        this.levelTraverseNode(this.root, callback);
    }
    levelTraverseNode(node: Node<T> | null, callback: Function) {
        const stack = [node];
        let curIndex = 0;
        let curNode = null;
        if (node !== null) {
            while (curNode = stack[curIndex++]) {
                callback(curNode.value);
                if (curNode?.left) {
                    stack.push(curNode.left)
                }
                if (curNode?.right) {
                    stack.push(curNode.right)
                };
            }
        }
    }

    /**
     * @name 返回树中最小的值
     * @returns node
     */
    min() {
        return this.minNode(this.root)
    }
    minNode(node: Node<T> | null) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }

    /**
     * @name 返回树中最大的值/键
     * @returns node
     */
    max() {
        let current = this.root;
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }
    /**
     * @name 从树种移除某一个值/键
     * @param key 
     */
    remove(key: T) {
        this.root = this.removeNode(this.root, key)
    }
    protected removeNode(node: Node<T> | null, key: T) {
        if (node === null) {
            return null
        }
        if (this.compareFn(key, node.value) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.value) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            //equal case

            //叶子节点
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            //只有一个孩子节点
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left
                return node
            }

            /**
             * 有两个孩子节点
             * 1. 找到右侧树最小节点，并替换该节点
             * 2. 删除右侧最小节点
             */
            const minNode = this.minNode(node.right);
            node.value = minNode?.value!;
            node.right = this.removeNode(node.right, minNode?.value!)
            return node;
        }
    }
}