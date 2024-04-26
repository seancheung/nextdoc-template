interface WithLevel {
  level: number;
}

type TreeNode<T> = T & { children: TreeNode<T>[] };

export function createTrees<T extends WithLevel>(items: T[]): TreeNode<T>[] {
  const trees: TreeNode<T>[] = [];
  function findParent(
    trees: TreeNode<T>[],
    level: number,
  ): TreeNode<T> | undefined {
    let suitableParent: TreeNode<T> | undefined;
    function helper(node: TreeNode<T>): TreeNode<T> | undefined {
      // If the node's level is less than our target, it might be a suitable parent.
      if (node.level < level) {
        // But we also want to check all children of this node first before deciding on this one as potential parent.
        for (let i = node.children.length - 1; i >= 0; i--) {
          const child = node.children[i];
          const found = helper(child);
          // If the child has a suitable parent, it will return that, so we can bubble up this result upwards.
          if (found) {
            return found;
          }
        }

        // If none of our children had suitable parents and we've not yet returned from above,
        // then we are the highest level parent node with a less level than target. So store this reference to potentially use later.
        if (!suitableParent) {
          suitableParent = node;
        }

        return node;
      } else {
        // If the node's level is not less than our target, then we need to try higher levels in other subtrees.
        for (const child of node.children) {
          const found = helper(child);

          if (found) {
            return found;
          }
        }

        // If all children of this node were too high, then we are the suitable parent of those nodes that did not have suitable parents.
        return;
      }
    }

    for (let i = trees.length - 1; i >= 0; i--) {
      const tree = trees[i];
      const found = helper(tree);

      if (found) {
        // If we've already stored a suitable parent, then this one is definitely not the right-most. So ignore it.
        return suitableParent || found;
      }
    }

    // There were no nodes with level less than target in any of the trees.
    return suitableParent;
  }
  for (const item of items) {
    const node: TreeNode<T> = { ...item, children: [] };
    const parent = findParent(trees, node.level);
    if (parent) {
      parent.children.push(node);
    } else {
      trees.push(node);
    }
  }
  return trees;
}
