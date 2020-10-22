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





