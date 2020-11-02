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
