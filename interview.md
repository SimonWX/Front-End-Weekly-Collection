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


https://alibole.alibaba-inc.com/IntervieweeScreen?token=a8be9cd3-e763-4ae8-9eb5-c3592d84cbc8&lang=zh

//评测题目: 无

var text = ' world';

var obj = {
	text: ' sun',
	getText: () => {
		return `hello ${this.text}`;
	}
}

obj.getText();


// hello sun


var text = ' world';

var obj = {
	text: ' sun',
	getText: function() {
        return `hello ${this.text}`
	}
}

obj.getText();

// hello sun

var text = ' world';

var obj = {
	text: ' sun',
	getText: function() {
		return () => {
        	return `hello ${this.text}`
        };
	}
}

obj.getText()();


// LET VAR
var a = 1;

(() => {
	console.log(a);
	var a = 2;
})();

// 2


let a = 1;

(() => {
	console.log(a);
	let a = 2;
})();

// error

[a, b, c]

// 输出
a(b(c()));

function fakeCompose(){
	
    }
}


金钱格式化（非正则）
```JavaScript
function moneyFormat(money) {
  let moneyStr = money.toFixed(2)
  let moneyInt = moneyStr.substring(0, moneyStr.indexOf('.'))
  let moneyDot = moneyStr.substring(moneyStr.length, moneyStr.indexOf('.'))
  let formatInt = ''
  for (let i = moneyInt.length - 1; i >= 0; i--) {
    if (i % 3 === 0 && formatInt.length > 0 && i != 0) {
      formatInt = `,${moneyInt[i]}${formatInt}`
    } else {
      formatInt = moneyInt[i] + formatInt
    }
  }
  return formatInt + moneyDot
}
let money = 123456.789
let result = moneyFormat(money)
console.log(result)

// 2  3  5  4  1
```

贝壳找房

```JavaScript
// 1
setTimeout(function () {
  console.log('timeout1'); 
}, 1000);

async function f1 () {
  const a = await console.log('await1');
  console.log('await2') 
}
f1(); 
console.log('start');
Promise.resolve().then(function () {
  console.log('promise1'); 
  Promise.resolve().then(function () {
    console.log('promise2'); 
  });
  
  setTimeout(function () {
    Promise.resolve().then(function () {
      console.log('promise3'); 
    });
    console.log('timeout2') 
  }, 0);
  
});

console.log('done');
// await1
// start
// done
// await2
// promise1
// promise2
// timeout2
// promise3


//2 
/*
 * @Description: [‘12a’,’3b’,’4c’,’15d’,'15e',’2a’] 统计这个数组中出现次数最多的字母前的数字和,
 * 这个数组就是a, 12+2 = 14
 */
 
 
 function maxNumStr(arr){
  let arrLen = arr.Length;
  let temp = {}
  for(let i=0; i<arrLen; i++){
    let curTag = arr[i].substr(arr[i].length-2)
    if(temp.hasOwnProperty(curTag)){
      temp[curTag] = temp[curTag] + 1
    }else{
      temp[curTag] = 1 
    }
  }
  
  let result 
  result['maxSum'] = 0
  result['maxSumKey'] = ''
  for(let i in temp){
    if(maxSum < temp[i]){
      result['maxSum'] = temp[i]
      result['maxSumKey'] = i
    }
  }
  return result
}
 

//3 
componentDidMount() {
    // 初始value是0
    this.setState({
        value: this.state.value++,
    });
    console.log(1111, this.state.value); 

    this.setState({
        value: this.state.value++,
    });
    console.log(2222, this.state.value); 

    setTimeout(() => {
        console.log('========>', this.state.value); 
        this.setState({
            value: this.state.value++,
        });

        console.log(3333, this.state.value); 

        this.setState({
            value: this.state.value++,
        });

        console.log(4444, this.state.value); 
    }, 0);
}


// 4
var name = 'Tom';
(function() {
  if (typeof name == 'undefined'){
    var name = 'jack'
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
// Goodbye jack

// 5
/*
 * @Description:  obj = {age:10, age1:100, age2: 200, age3: 300}  输出这个对象上所有数值大于100的属性及属性值
 */

// 6
/*
 * @Description:  实现一个弹窗组件，组件里有一个输入框，确定和取消按钮。在文本框内输入文字点击确定后弹框隐藏，并将数据传递到外层组件。点击取消关闭弹窗
 */



// 7. 
function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
Foo.prototype.a = function() {
  console.log(3)
}
Foo.a = function() {
  console.log(4)
}

Foo.a();
let obj = new Foo();    
obj.a();
Foo.a();
// 4
// 2
// 1
```