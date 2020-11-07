## 原理实现

一、promise的all、race实现
1. promise.all()的实现
    ```
    Promise.all = function(promise){
      let promises = Array.from(promise)
      return new Promise((resolve, reject) => {
        if(promises.length === 0){
          resolv([])
        }else{
          let result = []
          let index = 0
          for(let i = 0; i<promises.length; i++){
            Promise.resolve(promises[i]).then( data => {
              result[i] = data;
              if(++index === promises.length){
                resolve(result)
              }
            },err=>{
              reject(err);
              return 
            });
          }
        }
      })
    }
    ```

2. promise.race()的实现
    ```
    Promise.race = function(promise){
      let promises = Array.from(promise)
      return new Primise(function(resolve,reject){
        for(let i = 0; i<promises.length; i++){
          Promise.resolve(promises[i]).then( data => {
            resolve(data)
          },err => {
            return reject(err)
          })
        }
      })
    }
    ```

### 二、js继承的几种方式
继承在js中占有非常重要的地位，那么在js中有很多种继承的方式，不过每一种继承方式都有优缺点。下面就列举几种继承的方式。

实现继承首先需要一个父类，在js中实际上是没有类的概念，在es6中class虽然很像类，但实际上只是es5上的语法糖

  ```
  function People(name){
    // 属性
    this.name = name || Annie
    // 实例方法
    this.sleep = function(){
      console.log(this.name + '正在碎觉')
    }
  }
  // 原型方法
  People.prototype.eat = function(food){
    console.log(this.name + '正在吃：' + food)
  }
  ``` 

1. 原型链继承（父类的实例作为子类的原型）
    ```
    funciton Woman(){
    }
    Woman.prototype = new People();
    Woman.prototype.name = 'Jane';
    let womanObj = new Woman();
    ```
    * 优点：简单易于实现，父类的新增的实例与属性，子类都能访问
    * 缺点：可以在子类中增加实例属性，如果要新增加原型属性和方法需要在new父类构造函数的后面。无法实现多继承。创建子类实例时，不能向父类构造函数中传参。

2. 借用构造函数继承（伪造对象、经典继承）
    ```
    复制父类的实例属性给子类
    function Woman(name){
      // 继承了Perple
      People.call(this); // People.call(this, 'linda')
      this.name = name || 'Jane'
    }
    let womanObj = new Woman();
    ```
    * 优点：解决了子类构造函数向父类构造函数中传递参数。可以实现多继承（call或者apply多个父类）
    * 缺点：方法都在构造函数中定义，无法复用。不能继承原型属性/方法，只能继承父类的实例属性和方法
3. 实例继承（原型式继承）
    ```
    function Woman(name){
      let instance = new People();
      instance.name = name || 'Jane'
      return instance
    }
    let womanObj = new Woman();
    ```
    * 优点：不限制调用方式。简单，易实现
    * 缺点：不能多次继承
4. 组合式继承
    
    调用父类构造函数，继承父类的属性，通过将父类实例作为子类原型，实现函数复用
    ```
    function People(name,age){
      this.name = name || 'Jane'
      this.age = age || 27
    }
    People.prototype.eat = function(){
      return this.name + this.age + 'eat sleep'
    }
    function Woman(name,age){
      People.call(this.name,age)
    }
    Woman.prototype = new People();
    Woman.prototype.constructor = Woman;
    let womanObj = new Woman(ren,27);
    womanObj.eat();
    ```
    * 优点：（1）函数可以复用。（2）不存在引用属性问题。（3）可以继承属性和方法，并且可以继承原型的属性和方法。
    * 缺点：由于调用了两次父类，产生了两份实例

5. 寄生组合继承

    通过寄生的方式来修复组合式继承的不足，完美的实现继承
  
    ```
    // 父类
    function People(name, age){
      this.name = name || 'Jane'
      this.age = age || 27
    }
    // 父类方法
    People.prototype.eat = function(){
      return this.name + this.age + 'eat sleep'
    }
    // 子类
    function Woman(name,age){
      // 继承父类属性
      People.call(this,name,age)
    }
    // 继承父类方法
    (function(){
      // 创建空类
      let Super = function(){}
      Super.prototype = People.prototype;
      // 父类的实例作为子类的原型
      Woman.prototype = new Super();
    })()
    // 修复构造函数指向问题
    Woman.prototype.constructor = Woman
    let womanObj = new Woman()
    ```
6. es6继承

    代码量少，易懂

    ```
    /**
    *     class相当于es5中的构造函数
    *     class中定义方法时，前后不能加function，全部定义在class的prototype属性中
    *     class中定义的所有方法是不可枚举的
    *     class中只能定义方法，不能定义对象，变量等
    *     class和方法内默认都是严格模式
    *     es5中constructor为隐形属性
    */ 
    
    class People{
      constructor(name='Jane', age='27'){
        this.name = name;
        this.age = age;
      }
      eat(){
        console.log(`${this.name}${this.age}eat food`)
      }
    }
    // 继承父类
    class Woman extends People{
      constructor(name = 'ren', age = '27'){
        // 继承父类属性
        super(name, age);
      }
      eat(){
        // 继承父类方法
        super.eat()
      }
    }
    let womanObj = new Woman('Lily');
    womanObj.eat();
    ```
ES5继承和ES6继承的区别
ES5继承首先是在子类中创建自己的this指向，最后将方法添加到this中
`Child.prototype = new Parent() || Parent.apply(this) || Parent.call(this)`
ES6继承是使用关键字先创建父类的实例对象this,最后在子类class中修改this


### 三、实现call/apply/bind
* call
```
Function.prototype.call2 = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  // 默认上下文是window
  context = context || window
  // 保存默认的fn
  const { fn } = context

  // 前面讲的关键，将函数本身作为对象context的属性调用，自动绑定this
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  
  // 恢复默认的fn
  context.fn = fn
  return result
}

// 以下是测试代码
function test(arg1, arg2) {
  console.log(arg1, arg2)
  console.log(this.a, this.b)
}

test.call2({
  a: 'a',
  b: 'b'
}, 1, 2)
```
* apply

```
apply和call实现类似，只是传入的参数形式是数组形式，而不是逗号分隔的参数序列。
因此，借助es6提供的...运算符，就可以很方便的实现数组和参数序列的转化

Function.prototype.apply2 = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  context = context || window
  const { fn } = context

  context.fn = this
  let result
  if(Array.isArray(arguments[1])) {
    // 通过...运算符将数组转换为用逗号分隔的参数序列
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  context.fn = fn
  return result
}

/**
 * 以下是测试代码
 */

function test(arg1, arg2) {
  console.log(arg1, arg2)
  console.log(this.a, this.b)
}

test.apply2({
  a: 'a',
  b: 'b'
}, [1, 2])

```

* bind
```
bind的实现有点意思，它有两个特点：
本身返回一个新的函数，所以要考虑new的情况
可以“保留”参数，内部实现了参数的拼接

Function.prototype.bind2 = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  const that = this
  // 保留之前的参数，为了下面的参数拼接
  const args = [...arguments].slice(1)

  return function F() {
    // 如果被new创建实例，不会被改变上下文！
    if(this instanceof F) {
      return new that(...args, ...arguments)
    }
	
    // args.concat(...arguments): 拼接之前和现在的参数
    // 注意：arguments是个类Array的Object, 用解构运算符..., 直接拿值拼接
    return that.apply(context, args.concat(...arguments))
  }
}

/**
 * 以下是测试代码
 */

function test(arg1, arg2) {
  console.log(arg1, arg2)
  console.log(this.a, this.b)
}

const test2 = test.bind2({
  a: 'a',
  b: 'b'
}, 1) // 参数 1

test2(2) // 参数 2

```


### 四、实现对象深拷贝
* 浅拷贝
* 深拷贝
  * JSON内置的方法
    ```
    var a={x:1}
    var b=JSON.parse(JSON.stringfiy(a))
    console.log(b)//{x:1}
    b.x=2
    console.log(b)//{x:2}
    console.log(a)//{x:1}
    
    原理：该方法是用JSON.parse将对象转为字符串，然后在用JSON.stringify转回对象json字符串转换为对象的时候，会自己去构建新的内存地址存放数据

    注：如果对象属性为function，因为JSON格式字符串不支持function，在构建的时候会自动删除
    ```
  * Object的内置方法assign
    ```
    var a={x:1}
    var b=Object.assign({}, a);
    console.log(b);    //{x:1}
    b.x = 2;
    console.log(b);    //{x:2}
    console.log(a);    //{x:1}
    
    原理：该方法是用Object.assign对对象进行拼接， 将后续对象的内容插入到第一个参数指定的对象，不会修改第一个参数之后的对象，而我们将第一个对象指定为一个匿名空对象，实现深拷贝

    注：对象嵌套层次过深，超过2层，就会出现浅拷贝的状况，比如echarts组件的option对象
    ```
  * 递归实现  

    ```
    function deepCopy(obj){
    // 判断是否是简单数据类型
    if(typeof obj == 'object'){
      // 复杂数据类型
      var result = obj.constructor == Array ? [] ： {};
      for (let i in obj){
      result[i] = typeof obj[i] == 'object' ? deepCopy(obj[i]) : obj[i];
      }	
    }else{
      // 简单数据类型 直接 == 赋值
      var  result = obj;
    }
    return result;
    ```
    或者
    ```
    function clone(Obj) { // 首先，然后确定递归的回调，最终到达对象或者数组的末端，达到深拷贝的要求。
        var newObj;   
        if (Obj instanceof Array) { //确定类型
            newObj = [];  // 创建一个空的数组
            var i = Obj.length;
            while (i--) {
                newObj[i] = clone(Obj[i]); //递归回调
            }
            return newObj;
        } else if (Obj instanceof Object){ //确定类型
            newObj = {};  // 创建一个空对象
            for (var k in Obj) {  // 为这个对象添加新的属性
                newObj[k] = clone(Obj[k]); //递归回调
            }
            return newObj; //结束函数完成深拷贝
        }else{
            return Obj; //结束函数完成深拷贝
        }
    }
    ```

### 五、基于ES5和ES6实现数据双向绑定
* 双向绑定：视图（View）的变化能实时让数据模型（Model）发生变化，而数据的变化也能实时更新到视图层。
* 单向数据绑定：只有从数据到视图这一方向的关系。

* ES5的Object.defineProperty
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script>
      const obj = {
        value: ''
      }
      
      function onKeyUp(event) {
        obj.value = event.target.value
      }
      
      // 对 obj.value 进行拦截
      Object.defineProperty(obj, 'value', {
        get: function() {
          return value
        },
        set: function(newValue) {
          value = newValue
          document.querySelector('#value').innerHTML = newValue // 更新视图层
          document.querySelector('input').value = newValue // 数据模型改变
        }
      })
    </script>
</head>
<body>
  <p>
    值是：<span id="value"></span>
  </p>
  <input type="text" onkeyup="onKeyUp(event)">
</body>
</html>
```

* ES6的Proxy
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script>
    const obj = {}

    const newObj = new Proxy(obj, {
      get: function(target, key, receiver) {
        return Reflect.get(target, key, receiver)
      },
      set: function(target, key, value, receiver) {
        if(key === 'value') {
          document.querySelector('#value').innerHTML = value
          document.querySelector('input').value = value
        }
        return Reflect.set(target, key, value, receiver)
      }
    })
    
    function onKeyUp(event) {
      newObj.value = event.target.value
    }
    
  </script>
</head>
<body>
  <p>
    值是：<span id="value"></span>
  </p>
  <input type="text" onkeyup="onKeyUp(event)">
</body>
</html>
```
[vue2源码深度理解Vue中Observer，Dep，Watcher以及解决监听Array数组变化>>>](https://blog.csdn.net/weixin_42229553/article/details/108874028)



### 六、instanceof原理及实现
instanceof是通过原型链来进行判断的，所以只要不断地通过访问__proto__，就可以拿到构造函数的原型prototype。直到null停止。
```
/**
 * 判断left是不是right类型的对象
 * @param {*} left 
 * @param {*} right 
 * @return {Boolean}
 */
function instanceof2(left, right) {
  let prototype = right.prototype;

  // 沿着left的原型链, 看看是否有何prototype相等的节点
  left = left.__proto__;
  while(1) {
    if(left === null || left === undefined) {
      return false;
    }
    if(left === prototype) {
      return true;
    }
    left = left.__proto__;
  }
}

/**
 * 测试代码
 */

console.log(instanceof2([], Array)) // output: true

function Test(){}
let test = new Test()
console.log(instanceof2(test, Test)) // output: true

```
### 七、判断对象中是否有某属性的方法
1. 点( . )或者方括号( [ ] )
2. in 运算符
3. hasOwnProperty()
4. 使用undefined判断（自有属性和继承属性均可判断。）

### 八、遍历对象、数组的方法总结
1. 遍历对象的方法
    * `for...in` 循环遍历对象自身的和继承的可枚举属性(循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).)
      ```
      var obj = {'0': 'a', '1': 'b', '2': 'c'}
      for(var i in obj){
          console.log(i,"：",obj[i])
      }
      0 ： a
      1 ： b
      2 ： c
      ```
    * `Object.keys()` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）
      ```
      var obj = {'0': 'a', '1': 'b', '2': 'c'}
      Object.keys(obj).forEach(function(key){
          console.log(key, obj[key])
      })
      0   a
      1   b
      2   c

      // Object.keys(obj) 和 Object.values(obj)
      var obj = {'0': 'a', '1': 'b', '2': 'c'}
      console.log(Object.keys(obj))
      (3) ["0", "1", "2"]
      console.log(Object.values(obj))
      (3) ["a", "b", "c"]
      ```
    * `Object.getOwnPropertyNames(obj)` 返回一个数组，包括对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）
      ```
      var obj = {'0': 'a', '1': 'b', '2': 'c'}
      Object.getOwnPropertyNames(obj).forEach(function(key){
          console.log(key, obj[key])
      })
      0 a
      1 b
      2 c
      ```
    * `Reflect.ownKeys(obj)`,返回一个数组，包含对象自身的所有属性，不管属性名是Symbol或者字符串，也不管是否可枚举
      ```
      var obj = {'0': 'a', '1': 'b', '2': 'c'}
      Reflect.ownKeys(obj).forEach(function(key){
          console.log(key, obj[key])
      })
      0 a
      1 b
      2 c
      ```
2. 数组遍历方法
    * `for` 使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显
    * `forEach` 遍历数组中j的每一项，没有返回值，对原数组没有影响，不支持IE
      ```
      arr.forEach((item,index,array)=>{

      })
      ```
    * `map`循环，有返回值，可以return出来。map的回调函数支持return返回值，return的是啥，相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份数组中对应项改变了）
      ```
      arr.map(function(value,index,array){
        // do something
        return xxx
      })

      example: 

      var ary = [12,23,24,42,1]; 
      var res = ary.map(function (item,index,ary ) { 
          return item*10; 
      }) 
      console.log(res);//-->[120,230,240,420,10]; 原数组拷贝了一份，并进行了修改
      console.log(ary);//-->[12,23,24,42,1]；原数组并未发生变化
      ```
    * `for...of` 可以正确响应break。continue,return语句
      ```
      for(var value of array){
        console.log(value)
      }
      ```
    * `filter`. 不会改变原始数组，返回新数组
      ```
      var arr = [
        {id: 1, text: 'aa', done: true},
        {id: 2, text: 'bb', done: false}
      ]
      console.log(arr.filter(item=>item.done))

      // 转为es5
      arr.filter(function(item){
        return item.done
      })

      var arr = [73, 84, 56, 22, 100]
      var newArr = arr.filter(item=> item>80) // 得到新数组
      console.log(newArr,arr)
      ```
    * `every`,every()是对数组中的每一项运行给定函数，如果该函数对每一项返回true, 则返回true
      ```
      var arr = [1,2,3,4,5,6]
      console.log(arr.every(function(item,index,array){
        return item>3
      }))
      // false
      ```
    * `some`，some()是对数组中每一项运行指定函数，如果该函数对任一项返回true,则返回true
      ```
      var arr = [1,2,3,4,5,6]
      console.log(arr.some(function(item,index,array){
        return item > 3
      }))
      // true
      ```
    * `reduce`，reduce()方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值
      ```
      var total = [0,1,2,3,4].reduce((a,b) => a + b)  // 10
      ```
      reduce接受一个函数，函数有四个参数，分别是上一次的值，当前值,当前值的索引，数组
      ```
      [0,1,2,3,4].reduce(function(previousVal,currentVal,index,array){
        return previousVal + currentVal
      })
      ```
      ![reduce每次执行变化](https://images2018.cnblogs.com/blog/1403464/201807/1403464-20180713112335425-223204218.png)
      
      reduce还有第二个参数，我们可以把这个参数作为第一次调用callback时的第一个参数，上面这个例子因为没有第二个参数，所以直接从数组的第二项开始，如果我们给了第二个参数为5，那么结果是这样的：
      ```
      [0,1,2,3,4].reduce(function(previousVal,currentVal, index, array){
        return previousVal + currentValu
      },5)
      ```
      ![reduce第二个参数的作用](https://images2018.cnblogs.com/blog/1403464/201807/1403464-20180713112406091-1932166695.png)
      
      第一次调用的previousVal的值就用传入的第二个参数代替
    * `reduceRight`，reduceRight()方法的功能和reduce()功能一样的，不同的是reduceRight()从数组的末尾向前将数组中的数组项做累加。reduceRight()首次调用回调函数callback时，previousVal和currentVal可以是两个值之一。如果调用reduceRight()时提供了initialVal参数，则previousVal等于initialVal，currentVal等于数组中的最后一个值。如果没有提供initialVal参数，则previousVal等于数组最后一个值，currentVal等于数组中倒数第二个值。
      ```
      var arr = [0,1,2,3,4]
      arr.reduceRight(function(previousVal, currentVal, index, array){
        return previousVal + currentVal
      }) // 10
      ```
      回调将会被调用四次，每次调用的参数及返回值如下，
      ![reduceRight的运算过程](https://images2018.cnblogs.com/blog/1403464/201807/1403464-20180713112700747-845347728.png)
      
      如果提供一个初始值，initialVal为5:
      ```
      var arr = [0,1,2,3,4]
      arr.reduceRight(function(previousVal,currentVal,index,array){
        return previousVal + currentVal
      },5) // 15
      ```
      回调将会被调用5次，每次调用的参数及返回值如下：
      ![reduceRight具有初始值时的运算过程](https://images2018.cnblogs.com/blog/1403464/201807/1403464-20180713112743338-1377666579.png)
      
      同样地，可以对一个数组求和，可以使用reduceRight()：
      ```
      var arr = [1,2,3,4,5,6]
      console.time("reduceRight")
      Array.prototype.reduceRightSum = function(){
        for(var i = 0; i< 10000; i++){
          return this.reduceRight(function(previousVal, currentVal){
            return previousVal + currentVal
          })
        }
      }
      arr.reduceRightSum();
      console.log('最终值' + arr.reduceSum()) // 21
      console.timeEnd("reduceRight") // 5.725ms
      ```
    * `find`，find()方法返回数组中符合测试函数条件的第一个元素，否则返回undefined
      ```
      var stu = [
        {name: '张三', gender: '男', age: 20},
        {name: '李四', gender: '男', age: 20},
        {name: '王五', gender: '男', age: 20}
      ]
      function getStu(element){
        return element.name == '李四'
      }
      stu.find(getStu)
      // 返回结果为: { name: '李四', gender: '男', age: 20}

      // es6方法
      stu.find((element)=>{element.name == '李四'})
      ```

    * `findIndex` 对于数组中的每个元素，findIndex 方法都会调用一次回调函数（采用升序索引顺序），直到有元素返回 true。只要有一个元素返回 true，findIndex 立即返回该返回 true 的元素的索引值。如果数组中没有任何元素返回 true，则 findIndex 返回 -1。

      findIndex 不会改变数组对象。
      ```
      [1,2,3].findIndex(function(x) { x == 2; });
      // Returns an index value of 1.

      [1,2,3].findIndex(x => x == 4);
      // Returns an index value of -1.
      ```
    * `keys，values，entries`  ES6 提供三个新的方法 —— entries()，keys()和values() —— 用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
      ```
      for (let index of ['a', 'b'].keys()) {
      console.log(index);
      }
      // 0
      // 1
      for (let elem of ['a', 'b'].values()) {
      console.log(elem);
      }
      // 'a'
      // 'b'
      for (let [index, elem] of ['a', 'b'].entries()) {
      console.log(index, elem);
      }
      // 0 "a"
      // 1 "b"
      ```

### 九、字符串方法总结
1. `length`
2. `indexOf()` 返回字符串中指定文本首次出现的索引（位置）。如未找到，返回 -1。indexOf() 方法无法设置更强大的搜索值（正则表达式）。
3. `lastIndexOf()` 返回指定文本在字符串中最后一次出现的索引 。如未找到，返回 -1。
4. `search()` 搜索特定值的字符串，并返回匹配的位置。search() 方法无法设置第二个开始位置参数。
5. `slice()` 提取字符串的某个部分并在新字符串中返回被提取的部分。两个参数：起始索引（开始位置），终止索引（结束位置）。如果省略第二个参数，则该方法将裁剪字符串的剩余部分。或者从结尾计数：str.slice(-13);
6. `substring()` substring() 类似于 slice()。不同之处在于 substring() 无法接受负的索引。
7. `substr()` substr() 类似于 slice()。不同之处在于第二个参数规定被提取部分的长度。如果省略第二个参数，则该 substr() 将裁剪字符串的剩余部分。如果首个参数为负，则从字符串的结尾计算位置。第二个参数不能为负，因为它定义的是长度。
8. `replace()` 用另一个值替换在字符串中指定的值。不会改变调用它的字符串。它返回的是新字符串。replace() 对大小写敏感。如需执行大小写不敏感的替换，请使用正则表达式 /i（大小写不敏感）。如需执行大小写不敏感的替换，请使用正则表达式 /i（大小写不敏感）。
9. `toUpperCase()`  把字符串转换为大写
10. `toLowerCase()` 把字符串转换为小写
11. `concat()`连接两个或多个字符串。可用于代替加运算符
12. `trim()` 所有字符串方法都会返回新字符串。它们不会修改原始字符串
13. `charAt()` 返回字符串中指定下标（位置）的字符串
14. `charCodeAt()` 返回字符串中指定索引的字符 unicode 编码：
15. `split()`  将字符串转换为数组。如果省略分隔符，被返回的数组将包含 index [0] 中的整个字符串。

### 十、数组方法总结
1. `concat()` 用于连接两个或者多个数组，然后返回一个新数组。
    ```
    （1）var  arr1 = [1,2,3],
		  arr2 = [4,5,6]
		  arr3 = arr1.cancat(arr2)    // 合并成一个新数组   arr3 = [1,2,3,4,5,6]
    （2）多个数组合并
        var arr1 = [1,2,3,4,5],
          arr2 = ['a','b','c','d','e'],
          arr3 = ['g','t','f'];
        var cont = arr1.concat(arr2,arr3);
        console.log(cont);
    ```
2. `constructor`  返回创建该对象的函数。也就是构造该对象的函数
    ```
    console.log(Arrary.constructor == Function)     // true    因为他返回的是一个函数。
    ```
3. `copyWithin （es6）`在当前数组内部，将指定位置的成员复制到其他位置，然后返回当前数组，也就是说这个方法会修改当前数组
      ```
      三个参数 ：
      target：复制到数组的那个位置
      start：找那个值开始的位置
      end: 找那个值结束的位置

      var arr1 = [1,2,3,4,5]
      var cont = arr1.copyWithin(0,2);
          console.log(arr1);   //[3,4,5,4,5]    0 是从第0位开始复制， 2 是第二位开始找的值  因为没有第三个参数   所有   2  就找到  3，4，5

      var cont = arr1.copyWithin(0,-2);
      console.log(cont); // [3,2,3,4,5]  // 这个就找到 3  然后盖了第一位的1
      负值代表倒数第几位。

      ```
4. `entries`迭代返回数组的 （ 键 / 键值 ）
    ```
    var arr = ['a','b','c'];
    var ent = arr.entries();
    console.log(ent.next().value);  // [1,'a']
    console.log(ent.next().value);  // [2,'b']
    console.log(ent.next().value);  // [3,'c']
    ```
5. `every`
6. `fill` 填充 为数组填充某个属性值 接受三个参数 （要填充的值，开始填充的位置，结束的位置）
    ```
    const arr1 = [1, 2, 3, 4, 5]
    arr1.fill(7) 
    console.log(arr1);  [7,7,7,7,7]
    ```
7. `filter`
8. `find`
9. `forEach`
10. `includes` 
    ```
    includes和 indexOf 一样
    区别：
    // indexOf 不能返回 NaN的结果。
    // includes 找到元素返回 true / false
    var cont = arr1.includes(6);
    console.log(cont);  // false
    ```
11. `indexOf` 从数组的开头开始查找。接受两个参数（查找的项，从第几位开始查找）
12. `lastIndexOf` 从数组的末尾开始查找。接受两个参数（查找的项，从第几位开始查）
13. `join`  将数组组装成字符串，该方法值接受一个参数，即分隔符。
14. `keys` 产生一个新的迭代器（Iterator），该迭代器返回数组的键值。
15. `map` 遍历数组 返回数组的每一项 三个参数
16.  `pop` 将数组的末尾移除，并返回移除的项。
17. `push` 可以接收任意参数 ，将他们添加到数组的末尾
18. `reduce`
19. `reduceRight`
20. `reverse` 反转数组的顺序。
21. `shift` 删除数组的第一项，并且返回删除的值，如果空数组，则返回undefined
22. `slice` 返回一个新数组，新数组的项是原数组的下标开始到下标结束组成的数组。
23. `some` 遍历数组 判断数组的每一项，只要有符合条件的 就返回 true
24. `sort` 按照升序排序数组。
25. `splice` 很强大的方法，可以指定删除，插入，替换。
    ```
    删除：只需要添加前两个参数， 从第几位开始，删除几位。
    插入： 三个参数 插入的开始位置，0，插入的参数。
    替换： 三个参数 开始的位置 替换掉的几项， 替换加入的参数。
    ```
26. `toLocaleString` 将数组转化为字符串。
    ```
    var arr = ['a','b','c'];
    var ent = arr.toLocaleString('');
    console.log(typeof ent); // String
    console.log(ent); // a,b,c
    ```
27. `unshift` 在数组的首位添加元素。和 push 对应。
28. `values` values和keys 类同，会产生一个Iterator 函数。返回 键值。


总结：
* 产生新数组的有：
  * filter, 
  * map 
  * concat
* 遍历的方法有：
  * every 
  * some
  * filter 
  * find 
  * forEach
  * map
* 查找的方法有：
  * includes
  * indexOf 
  * lastIndexOf
* 数组的操作：
  * concat
  * join
  * pop 
  * push 
  * shift 
  * unshift 
  * slice
  * splice 
  * toLocaleString 
  * fill
  * copyWidthin 
  * reverse
* 产生迭代函数：
  * entries
  * keys
  * values
* 返回函数本身的函数：
  * constructor


### 实战题
1. 给定数组['1a', '2b', '13c', '5a'], 输出出现次数最多的字母前数字之和 6。
```
function sum(arr){
  let hash = {}
  arr.map((item,index)=>{
      let key = item.substr(item.length-1,1)
      let sumTemp = Number(item.substring(0, item.length-1))
      if(hash.hasOwnProperty(key)){ // 已经存在
          hash[key] = { sum: (hash[key].sum) + (sumTemp), num: ++(hash[key].num) }
      }else{ // 未存在
          hash[key] = { sum: Number(sumTemp), num: 1 }
      }
  })
  let maxTemp = 0
  let result = null
  for(let key in hash){
    if(hash[key].num > maxTemp){
      maxTemp = hash[key].num
      result = {'出现最多次的key': key, '出现最多次的字母前数字之和sum': hash[key].sum}
    }
  }
  console.log('result',result)
  return result
}
sum(['1a', '2b', '13c', '5a'])

```
