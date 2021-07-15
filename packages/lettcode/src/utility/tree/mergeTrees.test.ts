import type { Node } from "../../tree";
import { mergeTrees, Tree } from "../../tree";

describe('mergeTrees', () => {
  it('basic', () => {
    const tree1 = new Tree([1, 3, 2, 5]) as Node<number>;
    const tree2 = new Tree([2, 1, 3, null, 4, null, 7]) as Node<number>;
    const mergeTree = mergeTrees(tree1, tree2);
    expect(mergeTree.val).toBe(3);
  })
})