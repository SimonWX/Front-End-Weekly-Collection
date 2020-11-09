Function.prototype.a = () => alert(1);
Object.prototype.b = () => alert(2);
function A() {};
var a = new A();
console.log(typeof a)
a.a();
a.b();
