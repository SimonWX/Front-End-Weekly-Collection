## Interview

### 一、HTML
#### 1、H5新特性
* （1）语义化标签：section、aside、header、nav、audio、video （便于SEO，方便开发维护）
* （2）表单新特性
    ```
    a. process进度条
    <progress  value="0"></progress>
    
    b. datalist 建议列表
    <datalist id="lunchList">
        <option>京酱肉丝</option>
        <option>锅包肉</option>
        <option>鱼香肉丝</option>
        <option>青椒肉丝</option>
        <option>地三鲜</option>
    </datalist>
    <input type="text" name="lunch" list="lunchList"/>
    
    c. meter 度量衡/刻度尺/, 用于标示一个所处的范围
    <meter min="可取的最小值" max="可取的最大值" low="合理的下限值" high="合理的上限值" optimum="最佳值" value="当前值" ></meter>
    
    d. placeholder：占位字符 作为提示不可提交
    <input value=“tom” placeholder=“请输入用户名”/>
    
    e. multiple : 允许输入框中出现多个输入值用逗号分隔 [a@dn.com](mailto:a@dn.com)，[b@dn.com](mailto:b@dn.com)
    <input type="email" name="emails" multiple>   
    ```
* （3）video和audio
https://blog.csdn.net/admin_djp/article/details/108834774
* （4）canvas画布
https://blog.csdn.net/mutouafangzi/article/details/77170982
* （5）webworker：
    * a：多线程
    Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断
    * b: 同源限制
    DOM限制： Worker 没有window，parent，document对象，但是有 navigator，navigator
    通信联系
    worker县城和主线程不再同一上下文环境，他们不能直接通信
* （6）websocket
  https://www.cnblogs.com/edwardX/p/10774489.html

* （7）拖拽API
    * 源对象：
      * dragstart：源对象开始拖放。
      * drag：源对象拖放过程中。
      * dragend：源对象拖放结束。
    * 过程对象：
      * dragenter：源对象开始进入过程对象范围内。
      * dragover：源对象在过程对象范围内移动。
      * dragleave：源对象离开过程对象的范围。

#### 2、前端存储
https://zhuanlan.zhihu.com/p/79590259
#### 3、meta属性
https://blog.csdn.net/qq_32013641/article/details/87928426
### 二、JS基础
#### 1、实现let/const
* 实现let
  ```
  // let 定义一个仅作用于该代码块的变量，我们用闭包的形式来定义一个不被污染的变量
  (function () {
    var a = 1;
    console.log(a); // 1
  })();
  console.log(a); // a is not defined
  ```
* 实现const
  ```
  由于 ES5 环境没有 block 的概念，所以是无法百分百实现 const，只能是挂载到某个对象下，要么是全局的 window，要么就是自定义一个 object 来当容器
  function _const(key, value) {
    window[key] = value;
    Object.defineProperty(window, key, {
      enumerable: false,
      configurable: false,
      get: function () {
        return value;
      },
      set: function (newValue) {
        if (newValue !== value) {
          throw TypeError("只读变量，不可修改");
        } else {
          return value;
        }
      },
    });
  }
  ```
#### 2、实现call()/apply()/bind()
* 实现call(), call都做了哪些操作？
  * 将函数设为对象的属性；
  * 指定this到函数，并传入给定参数执行函数；
  * 执行之后删除这个函数；
  * 如果不传入参数，默认指向window；
  ```
  Function.prototype.mycall = (context,...args) {
    // 判断this是否函数，否返回typeerror
    if (typeof this !== 'function') {
        throw new TypeError('不是函数');
    }
 
    context = context || window;
    context.fn = this;
 
    const res = context.fn(...args);
 
    delete context.fn;
    return res; 
  }
  ```
* 实现apply()
  ```
  Function.prototype.myapply = (context,...args) => {
    if (typeof this !== 'function') {
        throw new TypeError('不是函数');
    }
 
    context = context || window;
    context.fn = this;
    args = args && args[0] || [];
 
    const res = context.fn(...args);
 
    delete context.fn;
    return res;
  }
  ```
* 实现bind(), bind要做什么？
  * 返回一个函数，绑定this，传递预制参数；
  * bind返回的参数可以作为构造函数使用
  ```
  Function.prototype.mybind = (context,...args) => {
    if (typeof this !== 'function') {
        throw new TypeError('不是函数');
    }
 
    let fn = this;
    
    const bind = (...args2) => {
        // fn.apply 来保持上下文和执行bind时一致；
        // this instanceof bind 是在构建函数new 操作时判断是否为 bind的实例；
        // bind之后的函数再执行还会传参，[...args,...args2] 用来整合参数
 
        return fn.apply(this instanceof bind ? this : context, [...args,...args2]);
    }
 
    bind.prototype = Object.create(this.prototype);
 
    return bind;
  }
  ```
  bind解析：
  bind函数返回的是一个可执行函数，所以最后 return 了一个函数，此刻返回的函数，在执行的时候，this应该保持和传入对象一致，所以需要使用 apply绑定；

  bind需要做到可以接收传参，并将参数传给目标函数，而后再执行时传的参数，要接在之前参数的后边，所以使用[...argus, ...argus2]来进行参数整合；

  再对 bind后的对象 执行 new 操作时，this应该指向当前对象，所以在 fn.apply 的第一个参数，做了这样的判断this instanceof bind ? this : context；

  bind 执行后返回的函数 修改 prototype 时，不应该影响到 fn.prototype ,两者应该是独立的，所以使用 bind.prototype = Object.create(this.prototype) 隔离开。

#### 3、手写防抖/截流函数
* 防抖函数
  ```
  * @desc 函数防抖
  * @param func 函数
  * @param wait 延迟执行毫秒数
  * @param immediate true 表立即执行，false 表非立即执行
  * @explain
  *  立即执行版：触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
  *  非立即执行版：触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
  */
  const debounce = function (func, wait, immediate) {
    let timeout;

    return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        let callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait)
        if (callNow) func.apply(context, args)
      }
      else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait);
      }
    }
  }
  ```
* 截流函数
  ```
  /**
  * @desc 函数节流
  * @param func 函数
  * @param wait 延迟执行毫秒数
  * @param type 1 表时间戳版，2 表定时器版（时间戳和定时器版做合并）
  * @explain 时间戳版的函数触发是在时间段内开始的时候，定时器版的函数触发是在时间段内结束的时候。
  */
  const throttle = function (func, wait, type) {
    if (type === 1) {
      let previous = 0;
    } else if (type === 2) {
      let timeout;
    }
    return function () {
      let context = this;
      let args = arguments;
      if (type === 1) {
        let now = Date.now();
        if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
        }
      } else if (type === 2) {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args)
          }, wait)
        }
      }
    }
  }
  ```
#### 4、手写Promise
https://segmentfault.com/a/1190000020505870

### 三、JS面向对象
#### 1、原型链
https://www.cnblogs.com/loveyaxin/p/11151586.html
#### 2、实现new
  ```
  new的能力：
  new创建出来的实例可以访问构造函数Person的属性
  new创建出来的实例可以访问构造函数原型上的属性
  new可以将构造函数中的this绑定到新创建出来的对象person上
  <script>
    function Person(name, age) {
        this.name = name
        this.age = age
        console.log(this)
    }
    Person.prototype.have = 'cat'
    function fakenews(Fn) {
        // 创建一个空对象
        let obj = new Object()
        // 将新对象的原型指针指向构造函数的原型
        obj.__proto__ = Fn.prototype
        // 处理除了Fn以外的参数
        // [].slice:返回数组中的一段，在这里是返回arguments数组第一个数以后的所有数
        // 将[].slice看作Fn，这里其实就是将[].slice的指向改为arguments
        Fn.apply(obj, [].slice.call(arguments, 1))
        return obj
    }
    const person = fakenews(Person, "张三", "20")
    console.log(person.name)
    console.log(person.age)
    console.log(person.have)
  </script>
  ```
#### 3、实现继承
https://www.cnblogs.com/qing-5/p/11365614.html

### 四、V8引擎机制
#### 1、JS执行机制
https://www.jianshu.com/p/1368d375aa66
#### 2、V8回收内存
https://www.jianshu.com/p/455d0b9ef0a8
#### 3、V8优化
https://www.cnblogs.com/yiyi17/p/11934297.html

### 五、渲染机制
#### 1、浏览器渲染过程
https://www.jianshu.com/p/e6252dc9be32
#### 2、回流和重绘
https://segmentfault.com/a/1190000017329980

### 六、浏览器缓存
#### 1、缓存位置和优先级
https://zhuanlan.zhihu.com/p/160208356
#### 2、浏览器缓存策略
https://www.cnblogs.com/ysk123/p/13179562.html

### 七、CSS
#### 1、清除浮动
* 使用带clear属性的空元素
* 使用CSS的overflow属性
* 给浮动的元素的容器添加浮动
* 使用邻接元素处理
* 使用CSS的:after伪元素
https://zhuanlan.zhihu.com/p/94697222
#### 2、常见布局
https://www.cnblogs.com/wangsongbai/p/10215141.html
#### 3、BFC相关
https://blog.csdn.net/sinat_36422236/article/details/88763187

### 八、网络相关
#### 1、OSI七层/四层模型
<table border="1"><thead><tr><td>
    <center>
     OSI七层模型
    </center></td><td>
    <center>
     TCP/IP四层模型
    </center></td><td>
    <center>
     对应网络协议
    </center></td></tr></thead><tbody><tr><td>
    <center>
     应用层（Application）
    </center></td><td rowspan="3">
    <center>
     应用层
    </center></td><td>
    <center>
     HTTP、TFTP, FTP, NFS, WAIS、SMTP
    </center></td></tr><tr><td>
    <center>
     表示层（Presentation）
    </center></td><td>
    <center>
     Telnet, Rlogin, SNMP, Gopher
    </center></td></tr><tr><td>
    <center>
     会话层（Session）
    </center></td><td>
    <center>
     SMTP, DNS
    </center></td></tr><tr><td>
    <center>
     传输层（Transport）
    </center></td><td>
    <center>
     传输层
    </center></td><td>
    <center>
     TCP, UDP
    </center></td></tr><tr><td>
    <center>
     网络层（Network）
    </center></td><td>
    <center>
     网络层
    </center></td><td>
    <center>
     IP, ICMP, ARP, RARP, AKP, UUCP
    </center></td></tr><tr><td>
    <center>
     数据链路层（Data Link）
    </center></td><td rowspan="2">
    <center>
     数据链路层
    </center></td><td>
    <center>
     FDDI, Ethernet, Arpanet, PDN, SLIP, PPP
    </center></td></tr><tr><td>
    <center>
     物理层（Physical）
    </center></td><td>
    <center>
     IEEE 802.1A, IEEE 802.2到IEEE 802.11
    </center>
</td></tr></tbody></table>

https://blog.csdn.net/xuedan1992/article/details/80958522

#### 2、HTTP协议
https://www.cnblogs.com/an-wen/p/11180076.html
#### 3、HTTPS
https://www.cnblogs.com/makelu/p/11140824.html
#### 4、TCP和UDP
https://www.cnblogs.com/fundebug/p/differences-of-tcp-and-udp.html

### 九、前端安全
#### 1、CSRF攻击
https://zhuanlan.zhihu.com/p/98062456
#### 2、XSS攻击
https://www.cnblogs.com/tugenhua0707/p/10909284.html


### 十、设计模式
#### 1、单例模式
#### 2、工厂模式
#### 3、观察者模式
#### 4、装饰器模式
#### 5、适配器模式
#### 6、代理模式
https://www.cnblogs.com/imwtr/p/9451129.html

### 十一、排序算法
#### 1、冒泡排序及优化
https://www.cnblogs.com/jyroy/p/11248691.html
#### 2、快速排序及优化
https://www.cnblogs.com/9dragon/p/10811316.html
#### 3、堆排序
https://segmentfault.com/a/1190000015487916
#### 4、归并排序
https://segmentfault.com/a/1190000017833332





