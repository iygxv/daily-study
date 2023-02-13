


function A() {}
function B() {}

const a = new A()
console.log(a.constructor === A) // true

a.__proto__ = B.prototype
console.log(a.constructor === A)  // false
console.log(a.constructor === B)  // true

