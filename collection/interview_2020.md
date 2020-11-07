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
```
<meta/>用于定义页面元信息，定义元信息就是制定一些name-value对。可以制定如下三个属性。
(1) http-equiv:指定元信息的名称，该属性指定的名称具有特殊意义，它可以向浏览器回传一些有用的信息，帮助浏览器正确地处理网页内容。
(2) name:指定元信息的名称，该名称值可以随意指定。
(3) content:指定元信息的值。

可以为网页指定如下的值：
(1) 网页字符集
<meta charset="utf-8" />
(2) 网页作者
<meta name="author" content="爪蛙没有爪"/>
(3) 网页地址
<meta name="website" content="http://www.demo.com"/>
(4) 网页版权信息
<meta name="copyright" content="2018-2019 demo.com"/>
(5) 网页关键字，用于SEO
<meta name="keywords" content="meta,html"/>
(6) 网页描述，用于SEO
<meta name="description" content="网页描述"/>
(7) 搜索引擎索引方式
<meta name="robots" content="index,follow" />
<!--
    all：文件将被检索，且页面上的链接可以被查询；
    none：文件将不被检索，且页面上的链接不可以被查询；
    index：文件将被检索；
    follow：页面上的链接可以被查询；
    noindex：文件将不被检索；
    nofollow：页面上的链接不可以被查询。
-->
(8) 网页过期时间
Expires制指定网页的过期时间。一旦网页过期，必须从服务器上下载。
<meta http-equiv="expires" content="Fri, 12 Jan 2001 18:18:18 GMT"/>
(9) 刷新网页
等待一定的时间刷新或跳转到其他url。
<meta http-equiv="refresh" content="1; url=https://www.baidu.com"/>
(10) 禁止从本地缓存中访问网页
禁止浏览器从本地缓存中读取网页，即浏览器一旦离开网页在无法连接网络的情况下就无法访问到页面。
<meta http-equiv="pragma" content="no-cache"/>
(11) 设置cookie
设置cookie的同时可以同时指定cookie的过期时间等。
<meta http-equiv="set-cookie" content="name=value expires=Fri, 12 Jan 2001 18:18:18 GMT,path=
(12) 优化移动设备显示
viewport可以优化移动端浏览器的显示。
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
(13) WebApp全屏显示
<meta name="apple-mobile-web-app-capable" content="yes" />
(14) 隐藏状态栏/设置状态栏颜色
只有在开启WebApp全屏模式时才生效。content的值为default | black | black-translucent 。
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
(15) 忽略数字自动识别为电话号码
<meta content="telephone=no" name="format-detection" />
(16) 忽略识别邮箱
<meta content="email=no" name="format-detection" />
(17) 使用浏览器版本
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- 关于X-UA-Compatible -->
<meta http-equiv="X-UA-Compatible" content="IE=6" ><!-- 使用IE6 -->
<meta http-equiv="X-UA-Compatible" content="IE=7" ><!-- 使用IE7 -->
<meta http-equiv="X-UA-Compatible" content="IE=8" ><!-- 使用IE8 -->
(18) 浏览器内核设置
主要针对360，搜狗，QQ等双内核浏览器。
<meta name="renderer" content="webkit|ie-comp|ie-stand"/>
(19) 转码声明
使用搜索引擎打开手机版网页后搜索引擎可能会对网页进行转码，若不想转码可设置如下:
<meta http-equiv="Cache-Control" content="no-siteapp" />
(20) 移动端相关
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
```
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
https://www.cnblogs.com/cc-freiheit/p/10827372.html
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
![cache](https://pic3.zhimg.com/80/v2-3794d45d518d45c5ff823d295f55ffaa_1440w.jpg)
![avatar](https://pic4.zhimg.com/80/v2-62033a0eeea7ebfddab26aa4f27932c3_1440w.jpg)

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
![tcp/ip](https://img-blog.csdn.net/20180708124241228?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3h1ZWRhbjE5OTI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

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
* Singleton(单例) 一个类只有唯一实例，这个实例在整个程序中有一个全局的访问点
* Factory (工厂) 解决实列化对象产生重复的问题
* Strategy(策略) 将每一个算法封装起来，使它们还可以相互替换，让算法独立于使用
* Observer(观察者) 多个观察者同时监听一个主体，当主体对象发生改变时，所有观察者都将得到通知
* Prototype(原型) 一个完全初始化的实例，用于拷贝或者克隆
* Adapter(适配器) 将不同类的接口进行匹配调整，尽管内部接口不兼容，不同的类还是可以协同工作
* Proxy(代理模式) 一个充当过滤转发的对象用来代表一个真实的对象
* Iterator(迭代器) 在不需要直到集合内部工作原理的情况下，顺序访问一个集合里面的元素
* Chain of Responsibility(职责连) 处理请求组成的对象一条链，请求链中传递，直到有对象可以处理
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

### 十二、前端工程化
什么是前端工程化？
前端工程化就是把一整套前端工作流程使用工具自动化完成

前端开发基本流程：

* 项目初始化：yeoman, FIS
* 引入依赖包：bower, npm
* 模块化管理：npm, browserify, Webpack
* 代码编译：babel, sass, less
* 代码优化(压缩/合并)：Gulp, Grunt
* 代码检查：JSHint, ESLint
* 代码测试：Mocha
* 目前最知名的构建工具：Gulp, Grunt, npm + Webpack

### 十三、什么是函数柯里化Currying)？
柯里化：

通常也称部分求值，含义是给函数分步传递参数，每次递参部分应用参数，并返回一个更具体的函数，继续接受剩余参数
期间会连续返回具体函数，直至返回最后结果。因此，函数柯里化是逐步传参，逐步缩小函数的适用范围，逐步求解的过程
柯里化的作用：延迟计算；参数复用；动态创建函数

柯里化的缺点：函数柯里化会产生开销（函数嵌套，比普通函数占更多内存），但性能瓶颈首先来自其它原因（DOM 操作等）

### 十四、移动端的点击事件的延迟时间是多长，为什么会有延迟？ 如何解决这个延时？

移动端 click 有 300ms 延迟，浏览器为了区分“双击”（放大页面）还是“单击”而设计

解决方案：
* 禁用缩放(对safari无效)
* 使用指针事件(IE私有特性，且仅IE10+)
* 使用 Zepto 的 tap 事件(有点透BUG)
* 使用 FastClick 插件(体积大[压缩后8k])

### 十五、对 Node.js 的优点、缺点提出了自己的看法？ Node.js的特点和适用场景？

* Node.js的特点：单线程，非阻塞I/O，事件驱动
* Node.js的优点：擅长处理高并发；适合I/O密集型应用
* Node.js的缺点：不适合CPU密集运算；不能充分利用多核CPU；可靠性低，某个环节出错会导致整个系统崩溃
* Node.js的适用场景：
  * RESTful API
  * 实时应用：在线聊天、图文直播
  * 工具类应用：前端部署(npm, gulp)
  * 表单收集：问卷系统

### 十六、如何测试前端代码? 知道 Unit Test，BDD, TDD 么? 怎么测试你的前端工程(mocha, jasmin..)?

通过为前端代码编写单元测试(Unit Test)来测试前端代码
Unit Test：一段用于测试一个模块或接口是否能达到预期结果的代码

* BDD：行为驱动开发 -- 业务需求描述产出产品代码的开发方法
* TDD：测试驱动开发 -- 单元测试用例代码产出产品代码的开发方法
```
单元测试框架：
// mocha 示例
describe('Test add', function() {
  it('1 + 2 = 3', function() {
      expect(add(1, 2)).to.be.equal(3);
  });
});

// jasmin 示例
describe('Test add', function () {
    it('1 + 2 = 3', function () {
        expect(add(1, 2)).toEqual(3);
    });
});
```

### 十七、谈一谈你了解ECMAScript6的新特性？
* 块级作用区域 let a = 1;
* 可定义常量 const PI = 3.141592654;
* 变量解构赋值 var [a, b, c] = [1, 2, 3];
* 字符串的扩展(模板字符串) var sum =${a + b};
* 数组的扩展(转换数组类型) Array.from($('li'));
* 函数的扩展(扩展运算符) [1, 2].push(...[3, 4, 5]);
* 对象的扩展(同值相等算法) Object.is(NaN, NaN);
* 新增数据类型(Symbol) let uid = Symbol('uid');
* 新增数据结构(Map) let set = new Set([1, 2, 2, 3]);
* for...of循环 for(let val of arr){};
* Promise对象 var promise = new Promise(func);
* Generator函数 function* foo(x){yield x; return x*x;}
* 引入Class(类) class Foo {}
* 引入模块体系 export default func;
* 引入async函数[ES7]

  ```
  async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value)
  }
  ```

### 十八、DOM事件总结

1. 基本概念：DOM事件的级别

2. DOM事件模型、DOM事件流
面试官如果问你“DOM事件模型”，你不一定知道怎么回事。其实说的就是捕获和冒泡。

3. DOM事件流，指的是事件传递的三个阶段。
    * 描述DOM事件捕获的具体流程
    讲的是事件的传递顺序。参数为false（默认）、参数为true，各自代表事件在什么阶段触发。
    * Event对象的常见应用（Event的常用api方法）
    DOM事件的知识点，一方面包括事件的流程；另一方面就是：怎么去注册事件，也就是监听用户的交互行为。第三点：在响应时，Event对象是非常重要的。

4. 自定义事件（非常重要）

一般人可以讲出事件和注册事件，但是如果让你讲自定义事件，能知道的人，就更少了。

5. DOM事件的级别

    DOM事件的级别，准确来说，是DOM标准定义的级别。包括：

    DOM0的写法：
      ```
      element.onclick = function () {
      }
      ```
    上面的代码是在 js 中的写法；如果要在html中写，写法是：在onclick属性中，加 js 语句。

    DOM2的写法：
    ```
    element.addEventListener('click', function () {
    }, false);
    ```
    【重要】上面的第三参数中，true表示事件在捕获阶段触发，false表示事件在冒泡阶段触发（默认）。如果不写，则默认为false。

    DOM3的写法：
    ```
    element.addEventListener('keyup', function () {
    }, false);
    ```
    DOM3中，增加了很多事件类型，比如鼠标事件、键盘事件等。

    PS：为何事件没有DOM1的写法呢？因为，DOM1标准制定的时候，没有涉及与事件相关的内容。

    总结：关于“DOM事件的级别”，能回答出以上内容即可，不会出题目让你做。


6. 捕获的流程

    说明：捕获阶段，事件依次传递的顺序是：window --> document --> html--> body --> 父元素、子元素、目标元素。

    PS1：第一个接收到事件的对象是 window（有人会说body，有人会说html，这都是错误的）。
    PS2：JS中涉及到DOM对象时，有两个对象最常用：window、doucument。它们俩也是最先获取到事件的。
代码如下：
    ```
    window.addEventListener("click", function () {
        alert("捕获 window");
    }, true);

    document.addEventListener("click", function () {
        alert("捕获 document");
    }, true);

    document.documentElement.addEventListener("click", function () {
        alert("捕获 html");
    }, true);

    document.body.addEventListener("click", function () {
        alert("捕获 body");
    }, true);

    fatherBox.addEventListener("click", function () {
        alert("捕获 father");
    }, true);

    childBox.addEventListener("click", function () {
        alert("捕获 child");
    }, true);
    ```
7. 获取body节点和html节点：

    在 js中：
    如果想获取 body 节点，方法是：`document.body；`
    但是，如果想获取 html节点，方法是`document.documentElement`

8. Event对象的常见 api 方法

    用户做的是什么操作（比如，是敲键盘了，还是点击鼠标了），这些事件基本都是通过Event对象拿到的。这些都比较简单，我们就不讲了。我们来看看下面这几个方法：
    * `event.preventDefault();`
    
      解释：阻止默认事件。
      
      比如，已知\<a>标签绑定了click事件，此时，如果给\<a>设置了这个方法，就阻止了链接的默认跳转。
    
    * `event.stopPropagation();`
      
      解释：阻止冒泡

      业务这样要求：单击子元素做事件A，单击父元素做事件B，如果不阻止冒泡的话，出现的问题是：单击子元素时，子元素和父元素都会做事件A。这个时候，就要用到阻止冒泡了。

      * w3c的方法：（火狐、谷歌、IE11）`event.stopPropagation();`
      
      * IE10以下则是：`event.cancelBubble = true;`
      
      * 兼容代码如下：

        ```
        box3.onclick = function (event) {

            alert("child");

            //阻止冒泡
            event = event || window.event;

            if (event && event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
        ```
        上方代码中，我们对box3进行了阻止冒泡，产生的效果是：事件不会继续传递到 father、grandfather、body了。

    * `event.stopImmediatePropagation();`
    
      解释：设置事件优先级

      比如说，我用addEventListener给某按钮同时注册了事件A、事件B。此时，如果我单击按钮，就会依次执行事件A和事件B。现在要求：单击按钮时，只执行事件A，不执行事件B。该怎么做呢？这是时候，就可以用到stopImmediatePropagation方法了。做法是：在事件A的响应函数中加入这句话。

    * `event.currentTarget`   
    当前所绑定的事件对象。在事件委托中，指的是【父元素】。

    * `event.target`  
    当前被点击的元素。在事件委托中，指的是【子元素】。
    上面这两个属性，在事件委托中经常用到。

9. 自定义事件
    ```
    var myEvent = new Event('clickTest');
    element.addEventListener('clickTest', function () {
        console.log('smyhvae');
    });
    //元素注册事件
    element.dispatchEvent(myEvent); 
    //注意，参数是写事件对象 myEvent，不是写 事件名clickTest
    ```
	 
    上面这个事件是定义完了之后，就直接自动触发了。在正常的业务中，这个事件一般是和别的事件结合用的。比如延时器设置按钮的动作：
    ```
    var myEvent = new Event('clickTest');

    element.addEventListener('clickTest', function () {
        console.log('smyhvae');
    });

    setTimeout(function () {
        element.dispatchEvent(myEvent); //注意，参数是写事件对象 myEvent，不是写 事件名 clickTest
    }, 1000);
    ```

### 十九、CSS有哪些继承属性

关于文字排版的属性如：
* font
  * word-break
  * letter-spacing
  * text-align
  * text-rendering
  * word-spacing
  * white-space
  * text-indent
  * text-transform
  * text-shadow
* line-height
* color
* visibility
* cursor

### 二十、CSS选择符有哪些？哪些属性可以继承？
* id选择器（ # myid）
* 类选择器（.myclassname）
* 标签选择器（div, h1, p）
* 相邻选择器（h1 + p）
* 子选择器（ul > li）
* 后代选择器（li a）
* 通配符选择器（ * ）
* 属性选择器（a[rel = "external"]）
* 伪类选择器（a:hover, li:nth-child）
* 可继承的样式： font-size font-family color, UL LI DL DD DT
* 不可继承的样式：border padding margin width height

### 二十一、 Vnode详解
* 虚拟DOM，是一个用于表示真实 DOM 结构和属性的 JavaScript 对象，这个对象用于对比虚拟 DOM 和当前真实 DOM 的差异化，然后进行局部渲染从而实现性能上的优化。在Vue.js 中虚拟 DOM 的 JavaScript 对象就是 VNode
* VNode是什么？
既然是虚拟 DOM 的作用是转为真实的 DOM，那这就是一个渲染的过程。所以我们看看 render 方法。vue 的渲染函数 _render 方法返回的就是一个 VNode 对象。而在 initRender 初始化渲染的方法中定义的 vm._c 和 vm.$createElement 方法中，createElement 最终也是返回 VNode 对象。所以 VNode 是渲染的关键所在。

* patch将新老VNode节点进行比对，然后将根据两者的比较结果进行最小单位地修改视图，而不是将整个视图根据新的VNode重绘。patch的核心在于diff算法，这套算法可以高效地比较virtual DOM的变更，得出变化以修改视图。

  那么patch如何工作的呢？

  首先说一下patch的核心diff算法，diff算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)，是一种相当高效的算法。
  ```
  // patch代码
  /*createPatchFunction的返回值，一个patch函数*/
  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    /*vnode不存在则直接调用销毁钩子*/
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      /*oldVnode未定义的时候，其实也就是root节点，创建一个新的节点*/
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue, parentElm, refElm)
    } else {
      /*标记旧的VNode是否有nodeType*/
      /*Github:https://github.com/answershuto*/
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        /*是同一个节点的时候直接修改现有的节点*/
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            /*当旧的VNode是服务端渲染的元素，hydrating记为true*/
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = true
          }
          if (isTrue(hydrating)) {
            /*需要合并到真实DOM上*/
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              /*调用insert钩子*/
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              )
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          /*如果不是服务端渲染或者合并到真实DOM失败，则创建一个空的VNode节点替换它*/
          oldVnode = emptyNodeAt(oldVnode)
        }
        // replacing existing element
        /*取代现有元素*/
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          /*组件根节点被替换，遍历更新父节点element*/
          let ancestor = vnode.parent
          while (ancestor) {
            ancestor.elm = vnode.elm
            ancestor = ancestor.parent
          }
          if (isPatchable(vnode)) {
            /*调用create回调*/
            for (let i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent)
            }
          }
        }

        if (isDef(parentElm)) {
          /*移除老节点*/
          removeVnodes(parentElm, [oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          /*Github:https://github.com/answershuto*/
          /*调用destroy钩子*/
          invokeDestroyHook(oldVnode)
        }
      }
    }

    /*调用insert钩子*/
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
  ```
  从代码中不难发现，当oldVnode与vnode在sameVnode的时候才会进行patchVnode，也就是新旧VNode节点判定为同一节点的时候才会进行patchVnode这个过程，否则就是创建新的DOM，移除旧的DOM。
* 判断两个VNode节点是否是同一个节点，需要满足以下条件
  * key相同
  * tag（当前节点的标签名）相同
  * isComment（是否为注释节点）相同
  * 是否data（当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息）都有定义
  当标签是\<input>的时候，type必须相同
    ```
    // 源码学习
    function sameVnode (a, b) {
    return (
      a.key === b.key &&
      a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)
    )
    }

    // Some browsers do not support dynamically changing type for <input>
    // so they need to be treated as different nodes
    /*
      判断当标签是<input>的时候，type是否相同
      某些浏览器不支持动态修改<input>类型，所以他们被视为不同节点
    */
    function sameInputType (a, b) {
      if (a.tag !== 'input') return true
      let i
      const typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type
      const typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type
      return typeA === typeB
    }
    ```
    当两个VNode的tag、key、isComment都相同，并且同时定义或未定义data的时候，且如果标签为input则type必须相同。这时候这两个VNode则算sameVnode，可以直接进行patchVnode操作
* patchVnode
  ```
  /*patch VNode节点*/
    function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
      /*两个VNode节点相同则直接返回*/
      if (oldVnode === vnode) {
        return
      }
      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      /*
        如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），
        并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），
        那么只需要替换elm以及componentInstance即可。
      */
      if (isTrue(vnode.isStatic) &&
          isTrue(oldVnode.isStatic) &&
          vnode.key === oldVnode.key &&
          (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
        vnode.elm = oldVnode.elm
        vnode.componentInstance = oldVnode.componentInstance
        return
      }
      let i
      const data = vnode.data
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        /*i = data.hook.prepatch，如果存在的话，见"./create-component componentVNodeHooks"。*/
        i(oldVnode, vnode)
      }
      const elm = vnode.elm = oldVnode.elm
      const oldCh = oldVnode.children
      const ch = vnode.children
      if (isDef(data) && isPatchable(vnode)) {
        /*调用update回调以及update钩子*/
        for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
        if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
      }
      /*如果这个VNode节点没有text文本时*/
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          /*新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren*/
          if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
        } else if (isDef(ch)) {
          /*如果老节点没有子节点而新节点存在子节点，先清空elm的文本内容，然后为当前节点加入子节点*/
          if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
        } else if (isDef(oldCh)) {
          /*当新节点没有子节点而老节点有子节点的时候，则移除所有ele的子节点*/
          removeVnodes(elm, oldCh, 0, oldCh.length - 1)
        } else if (isDef(oldVnode.text)) {
          /*当新老节点都无子节点的时候，只是文本的替换，因为这个逻辑中新节点text不存在，所以直接去除ele的文本*/
          nodeOps.setTextContent(elm, '')
        }
      } else if (oldVnode.text !== vnode.text) {
        /*当新老节点text不一样时，直接替换这段文本*/
        nodeOps.setTextContent(elm, vnode.text)
      }
      /*调用postpatch钩子*/
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
      }
    }
  ```
  patchVnode的规则是这样的：

  1. 如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），那么只需要替换elm以及componentInstance即可。
  2. 新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心。
  3. 如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。
  4. 当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。
  5. 当新老节点都无子节点的时候，只是文本的替换。
* updateChildren

  ![node1](https://camo.githubusercontent.com/1a740887f89d1ad19d92762a64b79671fd06c5f3/68747470733a2f2f692e6c6f6c692e6e65742f323031372f30382f32382f353961343031356262323736352e706e67)
  
  首先，在新老两个VNode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个变量都会向中间靠拢。当oldStartIdx > oldEndIdx或者newStartIdx > newEndIdx时结束循环。

  索引与VNode节点的对应关系： oldStartIdx => oldStartVnode oldEndIdx => oldEndVnode newStartIdx => newStartVnode newEndIdx => newEndVnode

  在遍历中，如果存在key，并且满足sameVnode，会将该DOM节点进行复用，否则则会创建一个新的DOM节点。

  首先，oldStartVnode、oldEndVnode与newStartVnode、newEndVnode两两比较一共有2*2=4种比较方法。

  当新老VNode节点的start或者end满足sameVnode时，也就是sameVnode(oldStartVnode, newStartVnode)或者sameVnode(oldEndVnode, newEndVnode)，直接将该VNode节点进行patchVnode即可。

  ![node2](https://camo.githubusercontent.com/019c92655ee462692af0013a1ebbcf0f76d2ba1f/68747470733a2f2f692e6c6f6c692e6e65742f323031372f30382f32382f353961343063313263313635352e706e67)

  如果oldStartVnode与newEndVnode满足sameVnode，即sameVnode(oldStartVnode, newEndVnode)。

  这时候说明oldStartVnode已经跑到了oldEndVnode后面去了，进行patchVnode的同时还需要将真实DOM节点移动到oldEndVnode的后面。

  ![node3](https://camo.githubusercontent.com/0969996b7998a30ea4f21470a090e0bd4a5bd080/68747470733a2f2f6f6f6f2e306f302e6f6f6f2f323031372f30382f32382f353961343231343738343937392e706e67)

  如果oldEndVnode与newStartVnode满足sameVnode，即sameVnode(oldEndVnode, newStartVnode)。

  这说明oldEndVnode跑到了oldStartVnode的前面，进行patchVnode的同时真实的DOM节点移动到了oldStartVnode的前面。

  ![node3](https://camo.githubusercontent.com/dd5c4be285dec169fe458b8e0219f307a7b11d64/68747470733a2f2f692e6c6f6c692e6e65742f323031372f30382f32392f353961346337303638356431322e706e67)

  如果以上情况均不符合，则通过createKeyToOldIdx会得到一个oldKeyToIdx，里面存放了一个key为旧的VNode，value为对应index序列的哈希表。从这个哈希表中可以找到是否有与newStartVnode一致key的旧的VNode节点，如果同时满足sameVnode，patchVnode的同时会将这个真实DOM（elmToMove）移动到oldStartVnode对应的真实DOM的前面。

  ![node4](https://camo.githubusercontent.com/0d7072c5a5b674d757c35b8f00b7562d6bba292b/68747470733a2f2f692e6c6f6c692e6e65742f323031372f30382f32392f353961346437353532643239392e706e67)
  
  当然也有可能newStartVnode在旧的VNode节点找不到一致的key，或者是即便key相同却不是sameVnode，这个时候会调用createElm创建一个新的DOM节点。

  ![node5](https://camo.githubusercontent.com/f27a4dc6febc556732a351f8fba65895479a28ac/68747470733a2f2f692e6c6f6c692e6e65742f323031372f30382f32392f353961346465306661346462612e706e67)

  到这里循环已经结束了，那么剩下我们还需要处理多余或者不够的真实DOM节点。

  当结束时oldStartIdx > oldEndIdx，这个时候老的VNode节点已经遍历完了，但是新的节点还没有。说明了新的VNode节点实际上比老的VNode节点多，也就是比真实DOM多，需要将剩下的（也就是新增的）VNode节点插入到真实DOM节点中去，此时调用addVnodes（批量调用createElm的接口将这些节点加入到真实DOM中去）。
  
  ![node5](https://camo.githubusercontent.com/de70d7fd6e556d54cc42478e178a1aa5954533ec/68747470733a2f2f692e6c6f6c692e6e65742f323031372f30382f32392f353961353039663064313738382e706e67)

  同理，当newStartIdx > newEndIdx时，新的VNode节点已经遍历完了，但是老的节点还有剩余，说明真实DOM节点多余了，需要从文档中删除，这时候调用removeVnodes将这些多余的真实DOM删除。

  ![node6](https://camo.githubusercontent.com/33ec0996ad25502c26b06bf6e77c529bbd0bfb1e/68747470733a2f2f692e6c6f6c692e6e65742f323031372f30382f32392f353961346633383962393863622e706e67)

https://www.jianshu.com/p/c6f53c5c8a8a

### 二十二、VirtualDOM与diff(Vue实现)
https://github.com/answershuto/learnVue/blob/master/docs/VirtualDOM%E4%B8%8Ediff(Vue%E5%AE%9E%E7%8E%B0).MarkDown

### 二十三、从源码角度看数据绑定
https://github.com/answershuto/learnVue/blob/master/docs/%E4%BB%8E%E6%BA%90%E7%A0%81%E8%A7%92%E5%BA%A6%E5%86%8D%E7%9C%8B%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.MarkDown

![v-model](https://camo.githubusercontent.com/3845b9554e62650727fa7cae8f1c169060b879f7/68747470733a2f2f636e2e7675656a732e6f72672f696d616765732f646174612e706e67)

这张图比较清晰地展示了整个流程，首先通过一次渲染操作触发Data的getter（这里保证只有视图中需要被用到的data才会触发getter）进行依赖收集，这时候其实Watcher与data可以看成一种被绑定的状态（实际上是data的闭包中有一个Deps订阅者，在修改的时候会通知所有的Watcher观察者），在data发生变化的时候会触发它的setter，setter通知Watcher，Watcher进行回调通知组件重新渲染的函数，之后根据diff算法来决定是否发生视图的更新。

Vue在初始化组件数据时，在生命周期的beforeCreate与created钩子函数之间实现了对data、props、computed、methods、events以及watch的处理。

* proxy代理。
  ```
  /*添加代理*/
  export function proxy (target: Object, sourceKey: string, key: string) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
  }
  ```
  这里比较好理解，通过proxy函数将data上面的数据代理到vm上，这样就可以用app.text代替app._data.text了

* observe 这个函数定义在core文件下observer的index.js文件中。
  ```
  /**
    * Attempt to create an observer instance for a value,
    * returns the new observer if successfully observed,
    * or the existing observer if the value already has one.
    */
    /*
    尝试创建一个Observer实例（__ob__），如果成功创建Observer实例则返回新的Observer实例，如果已有Observer实例则返回现有的Observer实例。
    */
    export function observe (value: any, asRootData: ?boolean): Observer | void {
      /*判断是否是一个对象*/
      if (!isObject(value)) {
        return
      }
      let ob: Observer | void

      /*这里用__ob__这个属性来判断是否已经有Observer实例，如果没有Observer实例则会新建一个Observer实例并赋值给__ob__这个属性，如果已有Observer实例则直接返回该Observer实例*/
      if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
      } else if (

        /*这里的判断是为了确保value是单纯的对象，而不是函数或者是Regexp等情况。*/
        observerState.shouldConvert &&
        !isServerRendering() &&
        (Array.isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value._isVue
      ) {
        ob = new Observer(value)
      }
      if (asRootData && ob) {

        /*如果是根数据则计数，后面Observer中的observe的asRootData非true*/
        ob.vmCount++
      }
      return ob
    }
    ```
    Vue的响应式数据都会有一个__ob__的属性作为标记，里面存放了该属性的观察器，也就是Observer的实例，防止重复绑定。

### 24、React和Vue的相同和不同
https://www.cnblogs.com/ray123/p/11225807.html

### 25、HTML渲染机制
https://blog.csdn.net/qq_34817440/article/details/102253688

### 26、vue高频原理面试题
https://zhuanlan.zhihu.com/p/101330697

https://www.cnblogs.com/yalong/p/9881926.html
