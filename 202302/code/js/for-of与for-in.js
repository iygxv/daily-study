
class A {
  constructor() {
    this.name = 'gx'
    this.age = 18
  }
}
A.prototype.test = function() {
  console.log('test')
}

const a = new A()

for(let key in a){
  console.log(`in--- ${key}`)
  // in--- name
  // in--- age
  // in--- test
}

for(let key of Object.keys(a)){
  console.log(`of--- ${key}`)
  // in--- name
  // in--- age
}



