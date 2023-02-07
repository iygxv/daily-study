// 简易版本Promise, 主要实现异步链式调用
class simplePromise {
  constructor(executor) {
    this.value = undefined
    this.onResolvedCallbacks = []
    // 这里只实现resolve
    const resolve = (value) => {
      setTimeout(() => {
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      })
    }
    executor(resolve) // 执行器会立即执行
  }
  then(onFulfilled) {
    return new simplePromise((resolve) => {
      // 使用回调(AOP思想), 易于扩展
      this.onResolvedCallbacks.push(() => {
        const x = onFulfilled(this.value)
        // x 使用user promise
        if(x instanceof simplePromise) {
          debugger
          x.then(resolve)
        }else {
          resolve(x)
        }
      })
    })
  }
}

const p = new simplePromise((resolve) => {
  resolve(1)
})
p.then(res => {
  console.log(res)
  return new simplePromise(resolve => {
    resolve(6666)
  })
}).then(res => {
  console.log(res)
})







p.then(res => {
  // 在这里 x 是指 new simplePromise(resolve => {
  //               resolve(6666)
  //              })
  return new simplePromise(resolve => {
    resolve(6666)
  })
  // x.then(resolve) 中的 resolve 是指
  // res => {
  //   return new simplePromise(resolve => {
  //     resolve(6666)
  // })
})


