// 数组
(function() {
  let data = {
    list: []
  }
  
  let value = data['list'];
  Object.defineProperty(data, 'list', {
    get() {
      return value
    },
    set(newValue) {
      console.log('Array Change!!!')
      value = newValue
    }
  })
  
  data.list.push(1) // 没有触发set
  data.list[0] = 3 // 直接修改索引也也无法触发set
  data.list.length = 10 // 修改数组长度也也无法触发set
  
  data.list = [1, 2, 3] // 触发set
}())

// (function(){}())
// 对象
(function(){
  let data = {
    name: 'gx',
  }
  Object.defineProperty(data, 'name', {
    get() {
      return value
    },
    set(newValue) {
      console.log('name Change!!!')
      value = newValue
    }
  })
  delete data.name // 无法触发set
}())