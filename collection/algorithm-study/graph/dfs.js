const graph= require('./graph');

// 用来记录已访问过的节点
const visited = new Set();
const dfs = (n)=>{
  console.log(n);
  visited.add(n);
  graph[n].forEach(c => { // 拿到所有相邻节点
    if(!visited.has(c)){ // 还未访问过的相邻接点
      dfs(c);
    }
  });
};

dfs(2);