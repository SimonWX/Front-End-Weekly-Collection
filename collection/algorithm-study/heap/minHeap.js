// 最小堆实现
class MinHeap{
  constructor(){
    this.heap = [];
  }
  // 交换
  swap(i1, i2){
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i){
    // return Math.floor((i - 1) / 2)
    // 进阶写法，二进制操作，二进制右移一位，即除以2
    // 父节点位置是（index - 1）/ 2 的商
    return (i - 1) >> 1;
  }
  getLeftIndex(i){
    // 左侧子节点的位置是 2 * index + 1
    return i * 2 + 1;
  }
  getRightIndex(i){
    // 右侧子节点的位置是 2 * index + 2
    return i * 2 + 2;
  }
  shiftUp(index){
    if(index == 0){ //如果是堆顶，就不再上移
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if(this.heap[parentIndex] > this.heap[index]){
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index){
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if(this.heap[leftIndex] < this.heap[index]){
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if(this.heap[rightIndex] < this.heap[index]){
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  // 插入
  insert(value){
    this.heap.push(value);
    // 上移（保证堆的结构正确）
    this.shiftUp(this.heap.length-1);
  }
  pop(){
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  // 获取堆顶
  peek(){
    return this.heap[0];
  }
  // 获取堆的大小
  size(){
    return this.heap.length;
  }
}

const h = new MinHeap();
h.insert(3);
h.insert(2);
h.insert(1);
h.pop();