import { Node, Tree, SearchTree } from '../tree'
describe('树', () => {
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
    let input=[5,1,4,null,null,3,6];
    let tree = new SearchTree([2, 1, 3]) as Node<number>;
    let tree1 = new SearchTree(input) as Node<number>;
    console.log(tree1);
    expect(SearchTree.isvaildBST(tree)).toBe(true);
    expect(SearchTree.isvaildBST(tree1)).toBe(false);
  })
})