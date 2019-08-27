##（一）
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



##（二）
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