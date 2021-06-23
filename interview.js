function getEach(tree = {}, parentkey='') {
  const res 
  let tempKey = ''
  let tempArr = []
  for (let key in tree) {
    debugger
    if (typeof (tree[key]) == 'object') {
      tempKey += `${key}.`
      getEach(tree[key], key)
    } else {
      res[tempKey] = tree[key]
    }
  }
  return res
}

var entry = {
  a: {
    b: {
      c: {
        dd: "abcdd",
      },
    },
    d: {
      xx: "adxx",
    },
    e: "ae",
  },
};

// 期望输出
var output = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae",
};



let res = getEach(entry)
console.log('res', res)


  