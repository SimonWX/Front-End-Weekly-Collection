## （试卷一 / 面试题）
### 一、
1. 
    * 行内元素：a，span，b，i，u，em
    * 块级元素：div，p，h1~h6，li，dt，dd
    * 区别： 行内元素与其他行内元素并排，不能设置宽高，默认的宽度就是文字的宽度。块级元素独占一行，不能与其他任何元素并列。能接收宽高，如果不设置宽度，那么宽度将默认变为父级的100%。
2. new操作符执行了什么？
    * var obj = new Base();
    * new操作符具体干了什么呢?其实很简单，就干了三件事情。
      ```
      var obj = {};
      obj.__proto__ = Base.prototype;
      Base.call(obj);
      ```
    * 第一行，我们创建了一个空对象obj
    * 第二行，我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
    * 第三行，我们将Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”，关于call函数的用法。

### 二、
1. 简述移动端页面宽度适配方案及原理？
    <https://www.cnblogs.com/chenyoumei/p/10510321.html>
2. Javascript闭包的应用场景有哪些？在实际工作中使用过哪些场景？
    <https://blog.csdn.net/qq_21132509/article/details/80694517>
    * 读取函数内部的变量
    * 让这些变量的值始终保持在内存中。不会再f1调用后被自动清除。
    * 方便调用上下文的局部变量。利于代码封装。
    原因：f1是f2的父函数，f2被赋给了一个全局变量，f2始终存在内存中，f2的存在依赖f1，因此f1也始终存在内存中，不会在调用结束后，被垃圾回收机制回收。
3. 移动端如何实现镂空遮罩引导层？
    <https://blog.csdn.net/xjun0812/article/details/51207177>

### 三、
1. 
    ```
    console.log(typeof(null)) //'Object'
    console.log(typeof(undefined)) // undefined
    console.log(typeof(NaN)) // number
    ```

    ```
    console.log(NaN == undefined) // false
    console.log(1 === true) // false
    console.log(a === new String('a')) //false a：Undefined newString('a') 字符串对象
    ```

    ```
    console.log(0 == '') // true
    console.log(0==false) // true
    console.log(isNaN(NaN)) // true
    ```

    ```
    console.log(1+2+'3'+4)  // '334'
    console.log('12'-'1') // 11
    console.log('1'+2-'1') // 11
    ```

2. 
    ```
    window.name = 'XDF'
    function A(){
      this.name = 123
    }
    A.prototype.getA = function(){
      console.log(this)
      return this.name + 1
    }
    let a = new A()
    let funcA = a.getA
    funcA()

    // 结果  console： window对象
    // return 'XDF1'
    ```

3. 
    ```
      console.log(1);
      setTimeout(function() {
        console.log(2);
        setTimeout(function() {
          console.log(3);
        }, 0);
        process.nextTick(() => {
          console.log(4);
        });
      }, 100);
      new Promise((resolve, reject) => {
        console.log(5);
        resolve();
      }).then(() => {
        console.log(6);
      });
      setTimeout(function() {
        console.log(7);
        setTimeout(function() {
          console.log(8);
        }, 0);
      }, 100);
      console.log(10);
      // 1
      // 5
      // 10
      // 6
      // 2
      // 4 （如果没有声明node，则是报错）
      // 7
      // 3
      // 8
      // process.nextTick()的意思就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行。

    ```

### 四、
1. 编码题，实现一个不定数量参数的求和函数，非number类型数据需要进行过滤。
    ```
    function add(){
      var sum =0;
      for(var i=0;i<arguments.length;i++){
          sum += arguments[i];
      }
      alert(sum);
    }
    add(1,2,3,5,6);
    ```

2. 数组去重
    * for循环嵌套，利用splice去重（时间复杂度：n²）
      ```
      function newArr(arr){
        for(var i=0;i<arr.length;i++){
          for(var j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){ 
              //如果第一个等于第二个，splice方法删除第二个
              arr.splice(j,1);
              j--;
            }
          }
        }
        return arr;
      }
      var arr = [1,1,2,5,6,3,5,5,6,8,9,8];
      console.log(newArr(arr))
      ```

    * 建新数组，利用indexOf去重（基本思路是新建一个数组，原数组遍历传入新数组，判断值是否存在，值不存在就加入该新数组中，时间复杂度：n）
      ```
      function newArr(array){ 
        //一个新的数组 
        var arrs = []; 
        //遍历当前数组 
        for(var i = 0; i < array.length; i++){ 
          //如果临时数组里没有当前数组的当前值，则把当前值push到新数组里面 
          if (arrs.indexOf(array[i]) == -1){ 
              arrs.push(array[i])
          }; 
        } 
        return arrs; 
      }
      var arr = [1,1,2,5,5,6,8,9,8];
      console.log(newArr(arr))
      ```
    
    * ES6中利用Set去重
      ```
      function newArr(arr){
        return Array.from(new Set(arr))
      }
      var arr = [1,1,2,9,6,9,6,3,1,4,5];
      console.log(newArr(arr))
      ```

3. 实现如下求和函数
    ```
    sum(1); //1
    sum(1)(2); //3
    sum(1)(2)(3,4) // 10
    ```

    ```
    //案例1
    //sum(2,3)和sum(2)(3)均能输出outPut5，这个问题较为简单，只要返回一个函数即可，本例中使用了es6语法
    function sum(x = 0, y) {
      if ([...arguments][1] == undefined) {
        let befor = [...arguments][0];
        return function suum(afte) {
          let sum2 = befor + afte;
          console.log(`outPut${sum2}`);
        }
      } else {
        let sum1 = x + y;
        console.log(`outPut${sum1}`);
      }
    }

    sum(2, 3); //输出outPut5
    sum(2)(3); //输出outPut5
    ```

    ```
    //案例二、add(2,3,4...)和add(2)(3)(4)...都输出相同结果的解决方案
    function add(x) {
      var sum = x;
      var tmp = function (y) {
        sum = sum + y;
        return tmp;
      };
      tmp.toString = function () {
        return sum;
      };
      return tmp;
    }
    console.log(add(1)(2)(3)); //6
    console.log(add(1)(2)(3)(4)); //10
    console.log(add(1)(2)(3)(4)(5)); //15
    console.log(add(1)(2)(3)(4)(5)(6)); //21
    ```

    ```
    //扩展案例3、此函数使用es6实现输入sum(),sum(2,3,4...)多个值相加，还有sum(2)(3)(4)...等多个数值分别相加的值相等，此案例也是最完整的解决方案
    function sum(...args) {
      if ([...args].length == 1) {
        let sum2 = [...args][0];
        var suum = function (y) {
          sum2 += y;
          console.log(`output ${sum2}`)
          return suum;
        }
        suum.valueOf = function () {
          return sum2;
        }
        return suum;
      } else {
        let sum1 = 0;
        for (var i = 0; i < [...args].length; i++) {
          sum1 += [...args][i];
        }
        return sum1
      }
    }
    //sum(1); //outPut1 0
    //sum(2, 3, 4); //outPut1 9
    //sum(2)(3)(4)(5); //outPut1 5//outPut1 9//outPut1 14
    //每加一次就会输出一次Sum。如果不想输出三次则可以在函数中加一个valueOf方法或者toString方法。然后将Summ函数中的console去掉。
    //然后console.log(sum(2)(3)(4)(5));即可
    console.log(sum(2)(3)(4)(5))
    console.log(sum(2))
    ```



## （二）
#### *伪类*

| Selector |	Meaning	 | CSS Version |
|----|----|----|
|:active|	 选择正在被激活的元素|	1|
|:hover	|  选择被鼠标悬浮着元素	|1|
|:link	|  选择未被访问的元素	|1|
|:visited	|   选择已被访问的元素	|1|
|:first-child|	选择满足是其父元素的第一个子元素的元素	|2|
|:lang	|  选择带有指定 lang 属性的元素	|2|
|:focus  |  选择拥有键盘输入焦点的元素	|2|
|:enable	|  选择每个已启动的元素	|3|
|:disable	 |  选择每个已禁止的元素	|3|
|:checked	 |  选择每个被选中的元素	|3|
|:target	  |  选择当前的锚点元素	|3|
|:first-of-type	 | 选择满足是其父元素的第一个某类型子元素的元素	|3|
|:last-of-type	|  选择满足是其父元素的最后一个某类型子元素的元素	|3|
|:only-of-type	|  选择满足是其父元素的唯一一个某类型子元素的元素|	3|
|:nth-of-type(n)	|  选择满足是其父元素的第n个某类型子元素的元素	|3|
|:nth-last-of-type(n)	|  选择满足是其父元素的倒数第n个某类型的元素|	3|
|:only-child	| 选择满足是其父元素的唯一一个子元素的元素|	3|
|:last-child	| 选择满足是其父元素的最后一个元素的元素|	3|
|:nth-child(n)	| 选择满足是其父元素的第n个子元素的元素|	3|
|:nth-last-child(n)	|  选择满足是其父元素的倒数第n个子元素的元素|	3|
|:empty	  |选择满足没有子元素的元素	|3|
|:in-range	 |   选择满足值在指定范围内的元素	|3|
|:out-of-range	 |   选择值不在指定范围内的元素	|3|
|:invalid	  | 选择满足值为无效值的元素	|3|
|:valid	    |  选择满足值为有效值的元素	|3|
|:not(selector)	|  选择不满足selector的元素	|3|
|:optional	    |    选择为可选项的表单元素，即没有“required”属性	|3|
|:read-only	   |   选择有"readonly"的表单元素	|3|
|:read-write	 |   选择没有"readonly"的表单元素	|3|
|:root	        |    选择根元素	|3|

#### *伪元素*

|Selector	 |Meaning	| CSS|
|----|----|----|
|::first-letter	|选择指定元素的第一个单词	 |  1
|::first-line	  |选择指定元素的第一行	 |  1
|::after	 |在指定元素的内容前面插入内容	| 2
|::before	   |在指定元素的内容后面插入内容	 | 2
|::selection	|选择指定元素中被用户选中的内容	| 3

(1)
```
  console.log([1<2==1,3<2==0])  // [true, true]
  console.log(true<2)  //true
  console.log(false<2) // true
  console.log(({}+{}).length) //30
  console.log(1+1+'1'+1); // '211'
  console.log((0.1+0.2).toFixed(1)) // '0.3'
  console.log(Boolean('')) // false
  console.log(Boolean(0)) //false
  console.log(undefined == false) //false
```
(2)
```
  var scope = 'global'
  function f(){
    console.log(scope);   // undefined
    var scope = 'local';
    console.log(scope)  // local
  }
  f()
```

```
  for(var i=0; i<5; i++){
    setTimeout(function(){
      console.log(i)
    },1000)
  }
  5
  5
  5
  5
  5
```

```
  统计字符串中出现字符最多的算法
  var obj = {};
  for (var i = 0; i < str.length; i++) {
    if (!obj[str.charAt(i)]) {
        obj[str.charAt(i)] = 1;
    } else {
        obj[str.charAt(i)]++
    }
  }
```

```
  数字千位分隔符
  function numFormat(num){
    num=num.toString().split(".");  // 分隔小数点
    var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
    var res=[];
    for(var i=0,len=arr.length;i<len;i++){
      if(i%3===0&&i!==0){
          res.push(",");   // 添加分隔符
      }
      res.push(arr[i]);
    }
    res.reverse(); // 再次倒序成为正确的顺序
    if(num[1]){  // 如果有小数的话添加小数部分
      res=res.join("").concat("."+num[1]);
    }else{
      res=res.join("");
    }
    return res;
  }
```

```
  解析url为对象
  第一种：只适用于/User/vip_card_manager?useless=219
  function urlSearch(){
    var name, value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf('?')
    str=str.substr(num+1); //取得所有参数
    var arr = str.split('&'); //各个参数放在数组中
    var result = {}
    for(var i=0; i<arr.length; i++){
      num = arr[i].indexOf('=');
      if(num>0){
        name = arr[i].substring(0,num);
        value=arr[i].substr(num+1);
        result[name]=value;
      }
    }
    return result
  }
```

## （卷三）
### 一、基础题
3. 简述JavaScript的原型链，prototype和_proto_是什么？ 
<https://blog.csdn.net/m0_38099607/article/details/72909806>

### 二、简答题
1.  `for/in、Object.keys和Object.getOwnPropertyNames`对象属性遍历有什么区别?

    * 其实for..in操作的主要目的就是遍历对象的属性，如果只需要获取对象的实例属性，可以使用hasOwnProperty()进行过滤。
    * Object.keys()用于获取对象自身所有的可枚举的属性值，但不包括原型中的属性，然后返回一个由属性名组成的数组。注意它同for..in一样不能保证属性按对象原来的顺序输出。
    * Object.getOwnPropertyNames()方法返回对象的所有自身属性的属性名（包括不可枚举的属性）组成的数组，但不会获取原型链上的属性。

    | 方法 |	适用范围 | 描述 |
    | ---  |  ----- | ---- |
    | for..in	| 数组，对象 |	获取可枚举的实例和原型属性名 |
    | Object.keys() |	数组，对象 |	返回可枚举的实例属性名组成的数组 |
    | Object.getPropertyNames()	| 数组，对象 |	返回除原型属性以外的所有属性（包括不可枚举的属性）名组成的数组 |
    | for..of	| 可迭代对象(Array, Map, Set, arguments等) | 返回属性值 |

2. 实现元素的拖动
    ```
    function drag(element,event) {
      // 鼠标起始坐标
      var 
      startX = event.clientX,
      startY = event.clientY,
      // 元素相对于document的位置
      orignX = element.offsetLeft,
      orignY = element.offsetTop,

      // 获取鼠标相对元素的位置（在mousemove事件中，元素始终保持和鼠标的绝对偏移量不变）
      oX = startX - orignX,
      oY = startY - orignY;

      // 注册监听事件为捕捉(true)，这里事件要传递句柄名称
      if(document.addEventListener) {
          document.addEventListener('mousemove',moveHandler,true);
          document.addEventListener('mouseup',upHandler,true);
      }

      // 这里定义了两个事件句柄 

      // 这个e为mousemove事件，不再是mousedown触发的drag
      function moveHandler(e) {
          element.style.left = e.clientX - oX + 'px';
          element.style.top = e.clientY - oY + 'px';
      }
      // 
      function upHandler(e) {
          document.removeEventListener('mousemove',moveHandler,true);
          document.removeEventListener('mouseup',upHandler,true);
      }
    }
    ```

3. 获取页面某个元素的位置有哪些方式
    * <https://www.jb51.net/article/44282.htm>
    * <https://blog.csdn.net/weixin_33693070/article/details/91422028>

### 三、运行结果题
```
1、
console.log('abc'.charAt(3));  // ""
console.log(Object.prototype.toString.call(123)); // [object Number]
console.log(Number(NaN)); // NaN

console.log(0 == false);  // true
console.log(2 == '2');    // true
console.log(isNaN(NaN));  // true

console.log(parseFloat('')); // NaN || undefined
console.log(Number('')); // 0
console.log('12'-'1'); // 11

2、
for(var i=0;i<5;i++){
	(function(i){
		setTimeout(function(){
			console.log(i);
		},1000*i);
	})(i)
} 
// 0
// 1
// 2
// 3
// 4

3. 
var User = {
	count: 1,
	getCount: function(){
		return this.count;
	}
};
User.getCount();
var func = User.getCount;
func();
// 1
// undefined
```

### 四、编程题
1. 字符串移动：字符串为\*和26个字母的任意组合，把\*都移动到最左侧，把字母移动到最右侧并保持相对顺序不变
    ```
    var stars = 'sosunn**afns*repsni*';
    var rs = stars.split('');
    var flag = 0;
    for(var i=rs.length -1; i>=0; i--){
        if(rs[i] == '*'){
            flag++;
        }else{
            if(flag == 0)
                continue;
            else{
                rs[i+flag] = rs[i];
                rs[i] = '*';
            }
        }
    }
    console.log(rs.join(''))

    变型（1）
    给定一个字符串，写一个函数，查找出该字符串中每个字符出现的次数，要求区分大小写，且时间复杂度为O(n)。

    var str = 'safaAuasfAJIFjHDWEFHDaAueUEWda';
    var results = {};
    var rs = str.split('');
    rs.forEach(function(al){
        if(results[al] === undefined){
            results[al] = 1;
        }else{
            results[al]++;
        }
    })
    var keys = Object.keys(results);
    for(var i = 0; i < keys.length; i++){
        console.log(keys[i] + ' : ' + results[keys[i]]);
    }

    变型（2）
    在一个字符串中找到第一个只出现一次的字符。如输入abaccdefbf，则输出d。

    var str = 'abaccdefbf';
    var results = {};
    var rs = str.split('');
    rs.forEach(function(al){
        if(results[al] === undefined){
            results[al] = 1;
        }else{
            results[al]++;
        }
    })
    var keys = Object.keys(results);
    for(var i = 0; i < keys.length; i++){
        if(results[keys[i]] === 1){
            console.log(keys[i]);
            break;
        }
    }
    ```

2. 十六进制颜色值的随机生成

3. 数组扁平化(以下几种方法，核心都是：遍历数组arr，若arr[i]为数组则递归遍历，直至arr[i]不为数组然后与之前的结果concat。 )
    * reduce，遍历数组每一项，若值为数组则递归遍历，否则concat。
      ```
      function flatten(arr) {  
        return arr.reduce((result, item)=> {
          return result.concat(Array.isArray(item) ? flatten(item) : item);
        }, []);
      }
      // reduce是数组的一种方法，它接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

      // reduce包含两个参数：回调函数，传给total的初始值

      // 求数组的各项值相加的和： 
      arr.reduce((total, item)=> { // total为之前的计算结果，item为数组的各项值
        return total + item;
      }, 0);
      ```

    * toString & split (调用数组的toString方法，将数组变为字符串然后再用split分割还原为数组)
      ```
      function flatten(arr) {
        return arr.toString().split(',').map(function(item) {
          return Number(item);
        })
      } 
      // 因为split分割后形成的数组的每一项值为字符串，所以需要用一个map方法遍历数组将其每一项转换为数值型
      ```
    
    * join，也可以将数组转换为字符串
      ```
      function flatten(arr) {
        return arr.join(',').split(',').map(function(item) {
          return parseInt(item);
        })
      }
      ```
    
    * 递归，递归的遍历每一项，若为数组则继续遍历，否则concat
      ```
      function flatten(arr) {
        var res = [];
        arr.map(item => {
          if(Array.isArray(item)) {
            res = res.concat(flatten(item));
          } else {
            res.push(item);
          }
        });
        return res;
      }
      ```

    * 扩展运算符，es6的扩展运算符能将二维数组变为一维
      ```
      [].concat(...[1, 2, 3, [4, 5]]);  // [1, 2, 3, 4, 5]
      // 根据这个结果我们可以做一个遍历，若arr中含有数组则使用一次扩展运算符，直至没有为止。
      function flatten(arr) {
        while(arr.some(item=>Array.isArray(item))) {
          arr = [].concat(...arr);
        }
        return arr;
      }
      ```

## 卷四（无标题）
### 一、基础题
1. 
2. 
3. JavaScript如何实现继承

    <https://www.jianshu.com/p/c6eaaf15035b>

### 二、简答题
1. 简述移动端兼容性问题
    * <https://blog.csdn.net/wanshaobo888/article/details/79868993>
    * <https://www.cnblogs.com/wu-web/p/7866963.html>
    * <https://www.cnblogs.com/ljx20180807/p/9729941.html>
2. JavaScript中array对象的方法有哪些？
    * concat()：连接两个或更多的数组，并返回结果。
    * join()：把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
    * pop()、push()、shift()、unshift()
    * slice()、splice()
    * indexOf()、lastIndexOf()
    * reverse()、sort()
    * toString()、toLocaleString()
3. 简述前端监控系统
    * <https://www.cnblogs.com/hyhy904/p/10983054.html>
    * <https://blog.csdn.net/weixin_34315665/article/details/94234070>

### 三、运行结果题
1. 
    * console.log(typeof undefined == 'undefined') //true
    * console.log(true < 3) // true
    * console.log('12' < '9') // true

    * Object.prototype.toString.call(undefined) // "[object Undefined]"
    * console.log(parseFloat('')) // NaN
    * console.log('1'+2) // 12

2. 
    * 
        ```
        console.log(1)
        new Promise(function(resolve,reject){
          process.nextTick(()=>{console.log(9)})
          console.log(2)
          resolve()
          console.log(3)
          process.nextTick(()=>{console.log(7)})
        }).then(function(){
          console.log(4)
          process.nextTick(()=>{console.log(8)})
        })
        setTimeout(function(){console.log(5)},0)
        console.log(6)

        // 1,6,2,3,9,7,4,8,5
        ```

    * 
        ```
        var a = 1;
        var obj = {
          a: 2,
          b: this.a,
          func1: ()=>{
            console.log(this)
            console.log(this.b)
          },
          func2: ()=>{
            console.log(this)
            console.log(this.b)
          }
        }
        obj.func1();
        obj.func2();
        var f1 = obj.func1;
        f1();
        var f2 = obj.func2;
        f2();
        ```

### 四、
1. 
    `'hello xiao ming'.split(' ').reverse().join(' ')`

2. 
    ```
    var s = "1122333455";
    var s1 = s;
    var c;
    var cc = s.match(/(\d)\1+/g);    //11,22,333,55 当然这里用()\1*也会可以(因为下面是替换):11,22,333,4,55
    for(var i = 0;i<cc.length;i++){
        c = cc[i].substring(0,1);
        s1 = s1.replace(cc[i],c);
    }
    alert(s1);   //12345
    ```


