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

### 二、整数反转
给出一个 32 位的有符号整数，需要将这个整数中每位上的数字进行反转。
示例 :
* 输入: 123 ｜ 输出: 321

* 输入: -123 ｜ 输出: -321

* 输入: 120 ｜ 输出: 21
```
var reverse = function(x){
  if(x === 0) {return 0}
  var max = Math.pow(2,31) -1;
  var min = -Math.pow(2,31);
  var flag = x/Math.abs(x)
  var xarr = Math.abs(x).toString().split('')
  var result = 0
  for(var i=xarr.length-1;i>=0;i--){
      result += xarr[i]
  }
  result = parseInt(result)*flag
  if(result>max || result<min){
      return 0
  }
  return result
}

```

### 三、 只出现一次的数
```
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let mapCom = {}
  let result
  for(let i=0; i<nums.length; i++){
      if(mapCom[nums[i]]){
          mapCom[nums[i]] += 1
      }else{
          mapCom[nums[i]] = 1
      }
  }
  for(let key in mapCom){
      if(mapCom[key] == 1){
          result =  key
      }
  }
  return result
};
```

### 四、存在重复元素
给定一个整数数组，判断是否存在重复元素。
如果任意一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。

输入: [1,2,3,1]
输出: true
示例 2:

输入: [1,2,3,4]
输出: false
示例 3:

输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
```
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let result = false
    let hash = {}
    for(let i=0; i<nums.length; i++){
        if(hash[nums[i]]){
            result = true 
            break
        }else{
            hash[nums[i]] = true
        }
    }
    return result
}
```

### 四、有序数组的平方根
给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

示例：

输入：[-4,-1,0,3,10]
输出：[0,1,9,16,100]

输入：[-7,-3,2,3,11]
输出：[4,9,9,49,121]
 

提示：
1 <= A.length <= 10000

-10000 <= A[i] <= 10000

A 已按非递减顺序排序。

```
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
  for(let i=0; i<A.length; i++){
    if(A[i] == 0){
        continue;
    }
    let absItem = Math.abs(A[i])
    let aSquare = Math.pow(absItem,2)
    A.splice(i,1,aSquare)
  }
  A.sort(function(a,b){
    return a - b
  })
  return A
};
```

### 五、求数组的平衡点
一个数组种的元素，如果其前面的部分等于后面的部分，那么这个点的位序就是平衡点。比如列表numbers = [1,3,5,7,8,25,4,20]. 25前面的元素的总和是24，25后面的元素总和也是24，那么25就是数组的平衡点。求编写一个程序，寻找并返回任意一个列表的所有平衡点