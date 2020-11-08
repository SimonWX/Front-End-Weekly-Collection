let mySet = new Set();

// 添加元素
mySet.add(1);
mySet.add(5);
mySet.add(5);
// set中不能添加重复的基本数据类型
mySet.add('some text');
let o = {a: 1, b:2}
mySet.add(o)
// set中可以添加内存地址不同的引用类型
mySet.add({a: 1, b:2})

const has = mySet.has(o);
mySet.delete(5);

// 跌代方法
for(let [key,value] of mySet.entries()) console.log(key,value)

// set 转 arr 两种方法
const myArr1 = [...mySet]
const myArr2 =Array.from(mySet)

const mySet2 = new Set([1,2,3,4])

// 交集
const intersection = new Set([...mySet].filter(x=>mySet2.has(x)))

// 差集
const difference = new Set([...mySet].filter(x=> !mySet2.has(x)))
