const a = { val: 'a'};
const b = { val: 'b'};
const c = { val: 'c'};
const d = { val: 'd'};
a.next = b;
b.next = c;
c.next = d;

// 遍历链表
let p = a; // 声明指针
while(p){
  console.log(p.val)
  p = p.next;
}

// 链表中插入值
const e = {val: 'e'};
c.next = e;
e.next = d;

// 链表中删除值
c.next = d;