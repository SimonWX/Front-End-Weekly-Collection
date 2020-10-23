// 快速排序
```
function quickSort(arr){
	if(arr.length == 0){
		return []
	}
	var left = []
	var right = []
	var pivot = arr[0]
	for (var i=1; i<arr.length; i++) {
		if(arr[i] < pivot){
			left.push(arr[i])
		}else{
			right.push(arr[i])
		}
	}
	return quickSort(left).concat(pivot, quickSort(right))
}
```

// 二分查找
```
function binSearch(arr,data){
	var low = 0;
	var high = arr.length - 1;
	while(low<=high){
		var middle = Math.floor((low+high)/2);
		if(arr[middle]<data){
			low = middle + 1
		}else if(arr[middle]>data){
			high = middle - 1
		}else{
			return middle
		}
	}
	return -1
}
```

// 原型继承的原理
```
function getProperty(obj, prop){
	if(obj.hasOwnProperty(prop)){
		return obj[prop];
	}else if(obj._proto_!=null){
		return getProperty(obj._proto_, prop);
	}else{
		return undefined
	}
}
```


// 数组降维
```
var list[1,2,[3,4], [5,6,[7,8],9],10,11]
var res = [];
function flatten(list, depth){
	if(depth == 0){
		for(var i=0; i<list.length; i++){
			res.push(list[i]);
		}
		return;
	}
	for(var i=0; i<list.length; i++){
		if(list[i] instanceof Array){
			flatten(list[i],depth - 1);
		}else{
			res.push(list[i])
		}
	}
	return res
}
```


1. Jquery和vue的主要区别是？
 	* 主要区别是jq是通过选择器来选择dom，对其进行赋值，取值，时间绑定等操作，数据和页面是混合在一起的；
	* vue则是通过vue对象将数据和视图完全分割开来，对数据进行操作，不再需要引用相应的dom对象，实现mvvm

2. js数据基本类型？
	* null、boolean、string、undefined、number、symbol

3. 箭头函数和function的区别
	* 写法不同，
	* this指向不同：（使用function定义的函数，this的指向随着调用环境的变化而变化，而箭头函数中的this指向是固定不变的，一直指向的是定义函数的环境）
	```

	```
	* 构造函数
	```
	// 使用function方法定义的构造函数
	function Person(name, age){
		this.name = name;
		this.age = age;
	}
	var lenhart =  new Person(lenhart, 25)
	console.log(lenhart); // {name: 'lenhart', age: 25}
	
	// 尝试使用箭头函数
	var Person = (name, age) => {
		this.name = name;
		this.age = age;
	}
	var lenhart = new Person('lenhart', 25) // Uncaught TypeError : Person is not a constructor
	```

	* 变量提升
	由于JS的内存机制，function的级别最高，而用箭头函数定义函数的时候，需要var（let const 定义的时候更不必说）关键词，而var所定义的变量不能得到变量的提升，故箭头函数一定要定义于调用之前

4. new一个对象
	* 创建一个新对象， 如 var person = {}
	* 新对象的_proto_属性指向构造函数的原型对象
	* 将构造函数的作用域赋值给新对象（也所以this对象指向新对象）
	* 执行构造函数内部的代码，将属性添加给person中的this对象
	* 返回新对象person

5. TCP和UDP的区别是什么
* TCP：面向连接、传输可靠(保证数据正确性,保证数据顺序)、用于传输大量数据(流模式)、速度慢，建立连接需要开销较多(时间，系统资源)
* UDP：面向非连接、传输不可靠、用于传输少量数据(数据包模式)、速度快
* TCP和UDP协议的一些应用例子：
TCP一般用于文件传输（FTP HTTP 对数据准确性要求高，速度可以相对慢），发送或接收邮件（POP IMAP SMTP 对数据准确性要求高，非紧急应用），远程登录（TELNET SSH 对数据准确性有一定要求，有连接的概念）等等；UDP一般用于即时通信（QQ聊天 对数据准确性和丢包要求比较低，但速度必须快），在线视频（RTSP 速度一定要快，保证视频连续，但是偶尔花了一个图像帧，人们还是能接受的），网络语音电话（VoIP 语音数据包一般比较小，需要高速发送，偶尔断音或串音也没有问题）等等。

6. 计算机网络的七层
* 应用层、
* 表示层、
* 会话层、
* 传输层、
* 网络层、
* 数据链路层、
* 物理层

6.TCP和UDP属于计算机网络中的哪一层
* 网际层协议：IP协议、ICMP协议、ARP协议、RARP协议
* 传输层协议：TCP协议、UDP协议
* 应用层协议：FTP、Telnet、SMTP、HTTP、RIP、NFS、DNS

7.HTTPS是什么？
* HTTPS即加密的HTTP，HTTPS并不是一个新协议，而是HTTP+SSL（TLS）。原本HTTP先和TCP（假定传输层是TCP协议）直接通信，而加了SSL后，就变成HTTP先和SSL通信，再由SSL和TCP通信，相当于SSL被嵌在了HTTP和TCP之间

8. 介绍几种常见的状态码
* 2XX系列：代表请求已成功被服务器接收、理解、并接受。
	* 200状态码：表示请求已成功，请求所希望的响应头或数据体将随此响应返回
	* 201状态码：表示请求成功并且服务器创建了新的资源，且其 URI 已经随Location 头信息返回。
* 3XX系列：代表需要客户端采取进一步的操作才能完成请求，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的 Location 域中指明。
	* 301状态码：被请求的资源已永久移动到新位置。服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
	* 302状态码：请求的资源临时从不同的URI响应请求，但请求者应继续使用原有位置来进行以后的请求。
	* 304状态码：自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容。
* 4XX系列：表示请求错误。代表了客户端看起来可能发生了错误，妨碍了服务器的处理。
	* 401状态码：请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
	* 403状态码：服务器已经理解请求，但是拒绝执行它。与401响应不同的是，身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交。
	* 404状态码：请求失败，请求所希望得到的资源未被在服务器上发现。
* 5xx系列：代表了服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理。
	* 500状态码：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。
	* 503状态码：由于临时的服务器维护或者过载，服务器当前无法处理请求。

9. 进程和线程是什么？
* 线程是最小的执行单元，而进程由至少一个线程组成。如何调度进程和线程，完全由操作系统决定，程序自己不能决定什么时候执行，执行多长时间。
* 进程指计算机中已运行的程序。
* 线程指操作系统能够进行运算调度的最小单位。

10. 死锁是什么
* 当两个以上的运算单元，双方都在等待对方停止运行，以获取系统资源，但是没有一方提前退出时，就称为死锁。

11. 获取数组中最大或最小值
```
方法一：
function maxAndMin(arr){
	return {
		max: Math.max.apply(null, arr.join(',').split(',')),
		min: Math.min.apply(null, arr.join(',').split(','))
	}
}

方法二：
Math.max(...arr)

方法三:
function(arr){
	arr.sort(function(a,b){
		rertun a-b;
	})
	var minValue = arr[0]
	var maxValue = arr[arr.length - 1];
	return {
		max: maxValue
		min: minValue
	}
}

```

12. 数组和链表的使用场景
* 数组应用场景：数据比较少；经常做的运算是按序号访问数据元素；数组更容易实现，任何高级语言都支持；构建的线性表较稳定。

* 链表应用场景：对线性表的长度或者规模难以估计；频繁做插入删除操作；构建动态性比较强的线性表。

13. vue相关的题
* 1. Vue 实例的 data 属性，可以在哪些生命周期中获取到？（BCD）
		* A. beforeCreate
		* B. created
		* C. beforeMount
		* D. mounted

* 2. 下列对 Vue 原理的叙述，哪些是正确的？（ABCD）
		* A. Vue 中的数组变更通知，通过拦截数组操作方法而实现
		* B. 编译器目标是创建渲染函数，渲染函数执行后将得到 VNode 树
		* C. 组件内 data 发生变化时会通知其对应 watcher，执行异步更新
		* D. patching 算法首先进行同层级比较，可能执行的操作是节点的增加、删除和更新

* 3. 对于 Vue 中响应式数据原理的说法，下列哪项是不正确的？（BD）
		* A. 采用数据劫持方式，即 Object.defineProperty() 劫持 data 中各属性，实现响应式数据
		* B. 视图中的变化会通过 watcher 更新 data 中的数据
		* C. 若 data 中某属性多次发生变化，watcher 仅会进入更新队列一次
		* D. 通过编译过程进行依赖收集

* 4. 下列说法不正确的是哪项？（B）
		* A. key 的作用主要是为了高效地更新虚拟 DOM
		* B. 若指定了组件的 template 选项，render 函数不会执行
		* C. 使用 vm.$nextTick 可以确保获得 DOM 异步更新的结果
		* D. 若没有 el 选项，vm.$mount(dom) 可将 Vue 实例挂载于指定元素上

* 5. 下列关于 Vuex 的描述，不正确的是哪项？（C）
		* A. Vuex 通过 Vue 实现响应式状态，因此只能用于 Vue
		* B. Vuex 是一个状态管理模式
		* C. Vuex 主要用于多视图间状态全局共享与管理
		* D. 在 Vuex 中改变状态，可以通过 mutations 和 actions

* 6. 关于 Vue 组件间的参数传递，下列哪项是不正确的？（B）
		* A. 若子组件给父组件传值，可使用 $emit 方法
		* B. 祖孙组件之间可以使用 provide 和 inject 方式跨层级相互传值
		* C. 若子组件使用 $emit('say') 派发事件，父组件可使用 @say 监听
		* D. 若父组件给子组件传值，子组件可通过 props 接受数据

* 7. 下列关于 vue-router 的描述，不正确的是哪项？（C）
		* A. vue-router 的常用模式有 hash 和 history 两种
		* B. 可通过 addRoutes 方法动态添加路由
		* C. 可通过 beforeEnter 对单个组件进行路由守卫
		* D. vue-router 借助 Vue 实现响应式的路由，因此只能用于 Vue

* 8. 下列说法不正确的是哪项？（C）
		* A. 可通过 this.$parent 查找当前组件的父组件
		* B. 可使用 this.$refs 查找命名子组件
		* C. 可使用 this.$children 按顺序查找当前组件的直接子组件
		* D. 可使用 $root 查找根组件，并可配合 children 遍历全部组件

* 9. 下列关于 v-model 的说法，哪项是不正确的？（C）
		* A. v-model 能实现双向绑定
		* B. v-model 本质上是语法糖，它负责监听用户的输入事件以更新数据
		* C. v-model 是内置指令，不能用在自定义组件上
		* D. 对 input 使用 v-model，实际上是指定其 :value 和 :input

* 10. 关于 Vue 的生命周期，下列哪项是不正确的？（D）
		* A. DOM 渲染在 mounted 中就已经完成了
		* B. Vue 实例从创建到销毁的过程，就是生命周期
		* C. created 表示完成数据观测、属性和方法的运算和初始化事件，此时 $el 属性还未显示出来
		* D. 页面首次加载过程中，会依次触发 beforeCreate，created，beforeMount，mounted，beforeUpdate，updated






