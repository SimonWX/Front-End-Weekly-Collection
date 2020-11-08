// 中序遍历
const bt = require('./bt');
const inorder = (root)=>{
  if(!root){ return; }
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}
// inorder(bt)

// 中序遍历（非递归版）
const inorderPlus = (root)=>{
  if(!root){ return; }
  // 核心思路：遍历所有左子树->根节点->右子树
  const stack = [];
  let p = root; // 指针
  while(stack.length || p){ // 循环1,2,3,4
    while(p){
      // 1.把所有子树丢入栈中
      stack.push(p);
      p = p.left;
    }
    // 2.弹出最尽头的节点
    const n = stack.pop();
    // 3.访问最尽头的节点
    console.log(n.val);
    // 4.访问右节点（指针指向右节点）
    p = n.right;
  }
}
inorderPlus(bt)