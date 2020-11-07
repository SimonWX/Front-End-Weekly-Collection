const json = {
  a: { b: {c: 1} },
  d: { e: 2 }
}

const path = ['d', 'e']; // 路径
// 和遍历链表异曲同工之妙
let p = json;
path.forEach(k =>{
  p = p[k];
})
// 路径：2