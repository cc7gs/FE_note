import {Tree,Node} from '../tree'
describe('树',()=>{
  it('定义二叉树',()=>{
    let tree=new Tree([1,2,2,3,4,4,3])as Node<number>;
    expect(tree.val).toEqual(1);
    expect(tree.left!.val).toEqual(2);
    expect(tree.left!.left!.val).toEqual(3);
  });
  it('对称二叉树',()=>{
    let tree=new Tree([1,2,2,3,4,4,3])as Node<number>;
    expect(Tree.isSymmetric(tree)).toEqual(true);
  })
})