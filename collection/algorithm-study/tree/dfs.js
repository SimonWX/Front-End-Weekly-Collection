// 深度优先遍历
const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: []
        },
        {
          val: 'e',
          children: []
        }
        
      ]
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: []
        },
        {
          val: 'g',
          children: []
        }
      ]
    }
  ]
}

const dfs = (root) => {
  console.log(root.val);
  // root.children.forEach((child)=>{
  //   dfs(child)
  // })
  // 优化写法
  root.children.forEach(dfs)
}
dfs(tree)