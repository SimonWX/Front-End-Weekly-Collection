// 顺序搜索的实现
Array.prototype.sequentialSearch = function (item) {
  for (let i = 0; i < this.length; i += 1) {
    if (this[i] === item) {
      return i;
    }
  }
  return -1;
}
const res = [1, 2, 3, 4, 5].sequentialSearch(3);
