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
### 七、
