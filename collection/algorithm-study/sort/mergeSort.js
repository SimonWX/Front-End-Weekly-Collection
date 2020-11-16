// 归并排序的实现
Array.prototype.mergeSort = function () {
  // 分
  const rec = (arr) => {
    if (arr.length === 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2); // 获取中间下标
    const left = arr.slice(0, mid); // 获取左边数组
    const right = arr.slice(mid, arr.length); // 获取右边数组
    const orderLeft = rec(left); // 左边数组有序
    const orderRight = rec(right); // 右边数组有序
    const res = [];
    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        // 比较队头
        res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift());
      } else if (orderLeft.length) {
        res.push(orderLeft.shift());
      } else if (orderRight.length) {
        res.push(orderRight.shift());
      }
    }
    return res;
  }
  const res = rec(this);
  res.forEach((n, i) => {
    this[i] = n;
  })
}
const arr = [5, 4, 3, 2, 1];
arr.mergeSort();