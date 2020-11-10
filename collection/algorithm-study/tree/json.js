// 前端与树：遍历JSON的所有节点值

const json = {
  a: { b: { c: 1 } },
  d: [1, 2]
}

const dfs = (node, path) => {
  console.log(node, path); // 访问当前节点
  Object.keys(node).forEach(k=>{ // 获取所有key，即所有孩子节点
    dfs(node[k], path.concat(k));
  })
}

dfs(json, []);