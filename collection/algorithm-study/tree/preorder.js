// 先序遍历
const bt = require('./bt');
const preorder = (root)=> {
  if(!root){ return; }
  console.log(root.val)
  preorder(root.left);
  preorder(root.right);
}
// preorder(bt);

// 先序遍历（非递归版）核心思路用堆栈，因为在函授中调用另一个函数其实就是连续的调用堆栈，即递归版的原理
const preorderPlus = (root) =>{
  if(!root){ return; }
  const stack = [root];
  while(stack.length){
    const n = stack.pop(); // 最开始访问根节点的值，循环到以后就是部分子树的根节点
    console.log(n.val);
    // 栈：后进先出 所以需要先推right
    if(n.right){// 递归右子树
      stack.push(n.right);
    }
    if(n.left){ // 递归左子树
      stack.push(n.left);
    }
  }
}
preorderPlus(bt)