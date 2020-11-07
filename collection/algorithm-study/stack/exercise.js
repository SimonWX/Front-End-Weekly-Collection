class farkStack{ // 定义一个名字为Stack的类
  constructor(){
    this.dataStore = []
  }
  push(item){
    this.dataStore.push(item);
  }
  pop(){
    return this.dataStore.pop();
  }
  peek(){ // 探出
    return this.dataStore[this.dataStore.length - 1];
  }
  size(){
    return this.dataStore.length;
  }
  clear(){
    this.dataStroe = []
  }
}

function  switchBinary(decNum){
  let stack = new farkStack();
  while(decNum > 0){
    stack.push(decNum % 2);
    decNum = Math.floor(decNum/2)
  }
  let binaryStr = ''
  while(stack.size() !== 0) {
    binaryStr += stack.pop()
  }
  return binaryStr;
}

switchBinary(125)


