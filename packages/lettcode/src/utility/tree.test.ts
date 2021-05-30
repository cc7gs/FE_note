import { Node, Tree, SearchTree,mergeTrees } from '../tree';
import {BinarySearchTree} from '../tree/basic/index';

describe('树', () => {
  it('合并二叉树',()=>{
    let tree1=new Tree([1,3,2,5]) as Node<number>;
    let tree2=new Tree([2,1,3,null,4,null,7])as Node<number>;
    let mergeTree=mergeTrees(tree1,tree2);
    expect(mergeTree.val).toBe(3);
  })
  it('定义二叉树', () => {
    let tree = new Tree([1, 2, 2, 3, 4, 4, 3]) as Node<number>;
    expect(tree.val).toEqual(1);
    expect(tree.left!.val).toEqual(2);
    expect(tree.left!.left!.val).toEqual(3);
  });
  it('对称二叉树', () => {
    let tree = new Tree([1, 2, 2, 3, 4, 4, 3]) as Node<number>;
    expect(Tree.isSymmetric(tree)).toEqual(true);

    let tree2 = new Tree([1, 2, 2, null, 3, null, 3]) as Node<number>;
    expect(Tree.isSymmetric(tree2)).toEqual(false);
    let emptyTree = new Tree([]) as Node<number>;
    expect(Tree.isSymmetric(emptyTree)).toEqual(true);
  });
  it('二叉搜索树', () => {
    let input = [10, 5, 15, null, 6, null, 20];
    let tree = new SearchTree([2, 1, 3]) as Node<number>;
    let tree1 = new SearchTree(input) as Node<number>;
    expect(SearchTree.isvaildBST(tree)).toBe(true);
    expect(SearchTree.isvaildBST(tree1)).toBe(true);
  });
  it('二叉搜索树 basic tree traverse', () => {
    let input = [10, 5, 15, 6, 20];
    let tree = new BinarySearchTree();
    input.forEach(num=>tree.insert(num));
    expect(tree.max()?.value).toBe(20);
    tree.levelTraverse((val:number)=>{
      let curVal=input.shift();
      expect(curVal).toEqual(val);
    })
  });
  it('二叉搜索树:revert', () => {
    let input = [10, 5, 15, 6, 20];
    let tree = new BinarySearchTree();
    input.forEach(num=>tree.insert(num));
    const newTree=tree.invertTree();
    const output=[10,15,5,20,6];
    tree.levelTraverseNode(newTree,(val:number)=>{
      let curVal=output.shift();
      expect(curVal).toEqual(val);
    })
  });
  
})



