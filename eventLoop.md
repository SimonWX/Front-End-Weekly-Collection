## Event Loop面试题集锦
### 一、
```JavaScript
console.log('script start');

setTimeout(function () {
    console.log('setTimeout---0');
}, 0);

setTimeout(function () {
    console.log('setTimeout---200');
    setTimeout(function () {
        console.log('inner-setTimeout---0');
    });
    Promise.resolve().then(function () {
        console.log('promise5');
    });
}, 200);

Promise.resolve().then(function () {
    console.log('promise1');
}).then(function () {
    console.log('promise2');
});
Promise.resolve().then(function () {
    console.log('promise3');
});
console.log('script end');


// script start
// script end
// promise1
// promise3
// promise2
// setTimeout---0
// setTimeout---200
// promise5
// inner-setTimeout---0
```
1. 首先顺序执行完主进程上的同步任务，第一句和最后一句的`console.log`
2. 接着遇到`setTimeout 0`，它的作用是在 `0ms` 后将回调函数放到宏任务队列中(这个任务在下一次的事件循环中执行)。
3. 接着遇到`setTimeout 200`，它的作用是在 `200ms` 后将回调函数放到宏任务队列中(这个任务在再下一次的事件循环中执行)。
4. 同步任务执行完之后，首先检查微任务队列, 即 `microtask`队列，发现此队列不为空，执行第一个`promise`的`then`回调，输出 `'promise1'`，然后执行第二个`promise`的`then`回调，输出`'promise3'`，由于第一个`promise`的`.then()`的返回依然是`promise`，所以第二个`.then()`会放到`microtask`队列继续执行，输出 `'promise2'`;
5. 此时`microtask`队列为空，进入下一个事件循环, 检查宏任务队列，发现有 `setTimeout`的回调函数，立即执行回调函数输出 `'setTimeout---0'`,检查`microtask` 队列，队列为空，进入下一次事件循环.
6. 检查宏任务队列，发现有 `setTimeout`的回调函数, 立即执行回调函数输出`'setTimeout---200'`.
7. 接着遇到`setTimeout 0`，它的作用是在 `0ms` 后将回调函数放到宏任务队列中，检查微任务队列，即 `microtask` 队列，发现此队列不为空，执行`promise`的`then`回调，输出`'promise5'`。
8. 此时`microtask`队列为空，进入下一个事件循环，检查宏任务队列，发现有 `setTimeout` 的回调函数，立即执行回调函数输出，输出`'inner-setTimeout---0'`。代码执行结束.


### 二、
```JavaScript
async function async2(){
    console.log(3)
}
async function async1(){
   console.log(1);
    await async2();
    console.log(2)
}

console.log(4);
setTimeout(function(){
    console.log(5)
},0);
async1();
new Promise(function(resolve){
    console.log(6);
    resolve();
}).then(function(){
    console.log(7)
});
console.log(8)

// 4
// 1
// 3
// 6
// 8
// 2
// 7
// 5
```

### 三、
```JavaScript
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
 
async function async2() {
  console.log('async2')
}
 
console.log('script start')
setTimeout(function() {
  console.log('setTimeout')
}, 0)
 
async1(); 
   
new Promise( function( resolve ) {
 console.log('promise1')
 resolve();
} ).then( function() {
 console.log('promise2')
} )
 
console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```
1. 第一个宏任务：`console.log('script start')`
2. 第一个宏任务中的第一个微任务：
    ```JavaScript
    async1();
    async function async1() {
      console.log('async1 start')
      await async2()
      console.log('async1 end')
    }
    
    async function async2() {
      console.log('async2')
    }
    ```
    在第一个微任务中存在await关键字，因此先输出 `async1 start`
3. 接着输出 `async2`
    
    await阻塞后面的代码执行，因此跳出async函数执行下一个微任务
4. 第一个宏任务中的第二个微任务：
    ```JavaScript
    new Promise(function( resolve ) {
      console.log('promise1')
      resolve();
    } ).then(function() {
      console.log('promise2')
    } )
    ```
    先输出：`promise1`， 碰到 `promise.then` 这个微任务会先执行本轮宏任务的同步代码再执行微任务

5. 接着输出：`script end`
6. 再挨个执行所有的微任务，依次输出（先进先出）：`async1 end` 
7. `promise2`
8. 第一个宏任务执行完成，执行第二个宏任务: 
    ```JavaScript
    setTimeout(function() {
      console.log('setTimeout')
    }, 0)
    ```
   既输出：`setTimeout`
