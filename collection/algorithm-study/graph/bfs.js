// 图的广度优先遍历
const graph = require('./graph')
const visited = new Set();
visited.add(2);
const queue = [2];
while(queue.length){
  const n = queue.shift();
  console.log(n);
  graph[n].forEach(c => {
    if(!visited.has(c)){
      queue.push(c);
      visited.add(c);
    }
  });
}