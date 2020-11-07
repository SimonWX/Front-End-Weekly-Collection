## （一）
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
3. 

```
console.log(typeof(null)) //'Object'、
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
  // 7
  // 3
  // 4
  // 8
  // process.nextTick()的意思就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行。

```

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



## （二）
* 伪类 
Selector	Meaning	 CSS  Version
:active	                选择正在被激活的元素	1
:hover	                选择被鼠标悬浮着元素	1
:link	                  选择未被访问的元素	1
:visited	              选择已被访问的元素	1
:first-child	          选择满足是其父元素的第一个子元素的元素	2
:lang	                  选择带有指定 lang 属性的元素	2
:focus	                选择拥有键盘输入焦点的元素	2
:enable	                选择每个已启动的元素	3
:disable	              选择每个已禁止的元素	3
:checked	              选择每个被选中的元素	3
:target	                选择当前的锚点元素	3
:first-of-type	        选择满足是其父元素的第一个某类型子元素的元素	3
:last-of-type	          选择满足是其父元素的最后一个某类型子元素的元素	3
:only-of-type	          选择满足是其父元素的唯一一个某类型子元素的元素	3
:nth-of-type(n)	        选择满足是其父元素的第n个某类型子元素的元素	3
:nth-last-of-type(n)	  选择满足是其父元素的倒数第n个某类型的元素	3
:only-child	            选择满足是其父元素的唯一一个子元素的元素	3
:last-child	            选择满足是其父元素的最后一个元素的元素	3
:nth-child(n)	          选择满足是其父元素的第n个子元素的元素	3
:nth-last-child(n)	    选择满足是其父元素的倒数第n个子元素的元素	3
:empty	                选择满足没有子元素的元素	3
:in-range	              选择满足值在指定范围内的元素	3
:out-of-range	          选择值不在指定范围内的元素	3
:invalid	              选择满足值为无效值的元素	3
:valid	                选择满足值为有效值的元素	3
:not(selector)	        选择不满足selector的元素	3
:optional	              选择为可选项的表单元素，即没有“required”属性	3
:read-only	            选择有"readonly"的表单元素	3
:read-write	            选择没有"readonly"的表单元素	3
:root	                  选择根元素	3

* 伪元素
Selector	        Meaning	CSS
::first-letter	  选择指定元素的第一个单词	        1
::first-line	    选择指定元素的第一行	            1
::after	          在指定元素的内容前面插入内容	    2
::before	        在指定元素的内容后面插入内容	    2
::selection	      选择指定元素中被用户选中的内容	  3

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