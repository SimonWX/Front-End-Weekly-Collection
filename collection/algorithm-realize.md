### 一、数组的降维，去重 ，排序
```
let arrList =  [10,2,13,4,[5,6],6,[7,[8,9]],1,11, [11,12],3]
function uniqueSort(arr){
  if(arr.length === 0 ){return []}
  // 扁平化
  function flatten(arr){
    return arr.toString().split(",").map(function(item){
      return Number(item)
    })
  }
  var flattenArr = flatten(arr)
  
  // 去重
  function unique(arr){
    return arr.filter(function(item,index,arr){
      return arr.indexOf(item) === index
    })
  }
  let uniqueArr = unique(flattenArr)
  
  // 排序
  function quickSort(arr){
    if(arr.length<=1){
      return arr
    }
    var left = [], right = [];
    var pivotIdx = Math.floor(arr.length/2)
    var pivot = arr.splice(pivotIdx,1)[0]
    arr.forEach(function(item){
      if(item<pivot){
        left.push(item)
      }else{
        right.push(item)
      }
    })
    return quickSort(left).concat(pivot, quickSort(right))
  }
  var rankArr = quickSort(uniqueArr)
  return rankArr
}
console.log(uniqueSort(arrList))
```