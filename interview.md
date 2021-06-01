1. 
```JavaScript
function Foo() {
    getName = function () { console.log(1); };
 }

//请写出以下输出结果：
// Foo.getName();  // Uncaught TypeError: Foo.getName is not a function
// getName(); // getName is not defined
// Foo().getName(); //  Cannot read property 'getName' of undefined
// getName(); // getName is not defined
// new Foo.getName(); // Foo.getName is not a constructor
// new Foo().getName(); // (intermediate value).getName is not a function
```

2. for of 和 for in区别
* 推荐在循环对象属性的时候使用for...in，在遍历数组的时候的时候使用for...of。
* for...in循环出的是key，for...of循环出的是value
* 注意，for...of是ES6新引入的特性。修复了ES5引入的for...in的不足
* for...of不能循环普通的对象，需要通过和Object.keys()搭配使用

3. 
```
vue
this.a = 1
this.a = 2
```

4. 
```JavaScript
/**
 *  数组nums 是否存在a, b ,c 和为目标和 target
    [1,2,3,4,5,6] taget = 9
    1 2 6
 * 
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/**
 * 思路
	标签：数组遍历
	首先对数组进行排序，排序后固定一个数 nums[i]nums[i]，再使用左右指针指向 nums[i]nums[i]后面的两端，
	数字分别为 nums[L]nums[L] 和 nums[R]nums[R]，计算三个数的和 sumsum 判断是否满足为 0，满足则添加进结果集
	如果 nums[i]nums[i]大于 0，则三数之和必然无法等于 0，结束循环
	如果 nums[i]nums[i] == nums[i-1]nums[i−1]，则说明该数字重复，会导致结果重复，所以应该跳过
	当 sumsum == 0 时，nums[L]nums[L] == nums[L+1]nums[L+1] 则会导致结果重复，应该跳过，L++L++
	当 sumsum == 0 时，nums[R]nums[R] == nums[R-1]nums[R−1] 则会导致结果重复，应该跳过，R--R−−
	时间复杂度：O(n^2)O(n2)，n为数组长度

*/
var threeSum = function(nums,taget) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
//if(nums[i] > 0) break; 
// 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == taget){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
};

let a = [1,2,3,4,5,6]

threeSum(a, 9)
// (3) [Array(3), Array(3), Array(3)]
// 0: (3) [1, 2, 6]
// 1: (3) [1, 3, 5]
// 2: (3) [2, 3, 4]
```

5.
```
https
ssl建立握手过程

301

302
```

6. 删除子目录，留下根目录，例如

```
['/a', '/a/c', '/b/c', '/b/c/d', '/b/d']
=> ['/a', '/b/c', '/b/d']
```