import type { Node} from '../tree';
import { Tree, SearchTree } from '../tree';
import {BinarySearchTree} from '../tree/basic/index';

describe('树', () => {
 
  it('定义二叉树', () => {
    const tree = new Tree([1, 2, 2, 3, 4, 4, 3]) as Node<number>;
    expect(tree.val).toEqual(1);
    expect(tree.left!.val).toEqual(2);
    expect(tree.left!.left!.val).toEqual(3);
  });
  it('对称二叉树', () => {
    const tree = new Tree([1, 2, 2, 3, 4, 4, 3]) as Node<number>;
    expect(Tree.isSymmetric(tree)).toEqual(true);

    const tree2 = new Tree([1, 2, 2, null, 3, null, 3]) as Node<number>;
    expect(Tree.isSymmetric(tree2)).toEqual(false);
    const emptyTree = new Tree([]) as Node<number>;
    expect(Tree.isSymmetric(emptyTree)).toEqual(true);
  });
  it('二叉搜索树', () => {
    const input = [10, 5, 15, null, 6, null, 20];
    const tree = new SearchTree([2, 1, 3]) as Node<number>;
    const tree1 = new SearchTree(input) as Node<number>;
    expect(SearchTree.isvaildBST(tree)).toBe(true);
    expect(SearchTree.isvaildBST(tree1)).toBe(true);
  });
  it('二叉搜索树 basic tree traverse', () => {
    const input = [10, 5, 15, 6, 20];
    const tree = new BinarySearchTree();
    input.forEach(num=>tree.insert(num));
    expect(tree.max()?.value).toBe(20);
    tree.levelTraverse((val)=>{
      const curVal=input.shift();
      expect(curVal).toEqual(val);
    })
  });
  it('二叉搜索树:revert', () => {
    const input = [10, 5, 15, 6, 20];
    const tree = new BinarySearchTree();
    input.forEach(num=>tree.insert(num));
    const newTree=tree.invertTree();
    const output=[10,15,5,20,6];
    tree.levelTraverseNode(newTree,(val)=>{
      const curVal=output.shift();
      expect(curVal).toEqual(val);
    })
  });
  
})



