// const obj = {};
// Object.prototype.x = 'x'  
// obj.x === 'x' 因为去找到obj自己的原型是Object

// const func = ()=>{};
// Function.prototype.y = 'y'
/* 会发现：func.y === 'y' 
因为func的原型是Function ，而Function的原型上有y
func.x === 'x'
因为func的原型是Function，Function的原型是挂载在Object上，而Object上有x
*/
// 和遍历链表思路一样
// const instanceOf = (A, B) => {
//   let p = A;
//   while(p){
//     if(p === B.prototype){
//       return true;
//     }
//     p = p.__proto__;
//   }
//   return false;
// }

// 面试题二
var foo = {}, F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

