// 对象
// const {a = 'a', b, c: ccc} = {a: 'aa', b: 'bb', c: 'ccc'}

// 转化为es5
var obj = {
    a: "aa",
    b: "bb",
    c: "ccc"
  },
  _a = obj.a,
  a = _a === undefined ? "a" : _a,
  b = obj.b,
  ccc = obj.c;

// 原理: 赋值操作


// 数组
// const [a, b, c, d = 666] = [1, 2, 3]
console.log(a) // 1
console.log(b) // 2
console.log(c) // 3
console.log(d) // 666

// 转化为es5
var arr = [1, 2, 3]
var a = arr[0]
var b = arr[1]
var c = arr[2]
var d = arr[3] === undefined ? 666 : arr[3] 



