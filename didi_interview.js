// 实现并发控制
function asyncReqsControl(reqs, maxLimit = 10) {
  let reqLen = reqs.length
  let result = []
  let temp = []
  for (let i = 0; i < maxLimit; i++) {
    temp.push({})
  }
  Promise.all(temp.map()=> {
    return new Promise(resolve => {
      if(reqLen > 0) {
        const curReq = reqs.shift()
        curReq().then((res) => {
          result.push(res)
        })
      } else {
        resolve()
        return
      }
    })
  }).then(()=> result)
}

/**
 * @params list {Array} - 要迭代的数组
 * @params limit {Number} - 并发数量控制数
 * @params asyncHandle {Function} - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * @return {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */
 let mapLimit = (list, limit, asyncHandle) => {
  let recursion = (arr) => {
      return asyncHandle(arr.shift())
          .then(()=>{
              if (arr.length!==0) return recursion(arr)   // 数组还未迭代完，递归继续进行迭代
              else return 'finish';
          })
  };
  
  let listCopy = [].concat(list);
  let asyncList = []; // 正在进行的所有并发异步操作
  while(limit--) {
      asyncList.push( recursion(listCopy) ); 
  }
  return Promise.all(asyncList);  // 所有并发异步操作都完成后，本次并发控制迭代完成
}

// 将数组转换为tree，比如[{ id: 1, name: ‘a’ }, { id: 2, name: ’b’, pid: 1 }, { id: 3, name: ‘c’ , pid: 1}].
function arrToTree(arr) {
  let arrLen = arr.length
  let tempMap = new Map()
  let result = []
  arr.forEach(item => {
    tempMap.set(item.id, item)
  })
  arr.forEach(item => {
    let parent = tempMap[item.pid]
    if (parent) {
      (parent['children'] || parent['children'] = []).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

// js实现reduce
Array.prototype.myReduce = function myReduce(fn, param) {
  let initArr = this
  let arr = initArr.concat()
  if (param) {
    arr.unshift(param)
  }
  let tempIndex;

  while (arr.length > 2) {
    tempIndex = initArr.length - arr.length + 1
    let newVal = fn.call({}, arr[0], arr[1], tempIndex, initArr)
    arr.splice(0, 2)
    arr.unshift(newVal)
  }

  tempIndex++
  let result = fn.call({}, arr[0], arr[1], tempIndex, initArr)
  return result
}