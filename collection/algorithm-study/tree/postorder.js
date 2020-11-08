// 后续遍历
const bt = require('./bt');
const postorder = (root)=>{
  if(!root){ return; }
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
}
// postorder(bt)

// 后续遍历（非递归版）
const postorderPlus = (root)=>{
  // 核心思路：
  // 1. 把后续遍历的顺序倒置(左右根->根右左，与先序遍历很像)
  // 2. 把先序遍历的访问操作，改成入栈操作
  // 3. 利用栈的后进先出特性，子节点逆序输出
  if(!root){ return; }
  const outputStack = []; // 做倒置操作的堆栈
  const stack = [root]; // 函数调用堆栈
    while(stack.length){ // 根右左
      const n = stack.pop();
      outputStack.push(n);
      if(n.left){
        stack.push(n.left);
      }
      if(n.right){
        stack.push(n.right);
      }
    }
    while(outputStack.length){ // 倒序输出
      const n = outputStack.pop();
      console.log(n.val);
    }
}
postorderPlus(bt) 