// 二叉树的层次遍历
// node节点中包含val这个key，代表当前节点的值

function tree(root) {
  let result = []
  let tempTree = []
  tempTree.push(root)

  while (tempTree.length) {
    let curNode = tempTree.shift()
    result.push(curNode.val)
    if (curNode.left) {
      tempTree.push(curNode.left)
    }
    if (curNode.right) {
      tempTree.push(curNode.right)
    }
  }

  return result
}

