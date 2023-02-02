// 符合Promise A+ 规范的Promise

/**
 *
 * @param {*} promise  promise.then方法返回的新的promise对象
 * @param {*} x    then函数执行返回的值  (promise或者值)
 * @param {*} resolve  成功回调
 * @param {*} reject   失败回到
 * @returns
 */
const resolvePromise = (promise, x, resolve, reject) => {
  // 首先,如果promise 和 x 是同一个promise
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  if (typeof x === 'function' || (x != null && typeof x === 'object')) {
    let called // 处理其他Promise,多次调用成功和失败

    // new promise((resolve,reject)=>{
    // 在promise中抛出错误
    //    throw new Error...
    // })
    // 所以使用try catch
    try {
      // 是promise,就可以直接拿到它的then方法
      let then = x.then
      // 那么如果这个then方法是函数的话
      if (typeof then === 'function') {
        // 是函数,那么就执行函数,then函数接受俩个函数
        then.call(
          x,
          y => {
            // 把值往下传,但是如果这个值是一个promise,那么就递归resolvePromise再次解析(then调用之后就递归了)
            if (called) {
              // 多次调用了
              return
            }
            called = true // 防止多次调用
            // resolve(new Promise...)resolve返回promise, 所以要递归
            resolvePromise(promise, y, resolve, reject)
          },
          err => {
            if (called) {
              return
            }
            called = true // 防止多次调用
            reject(err)
          }
        )
      } else {
        // 不是函数,就说明是一个普通对象的属性,直接返回值就好
        resolve(x)
      }
    } catch (e) {
      //  x.then 的值时抛出错误 e
      if (called) {
        return
      }
      called = true // 防止多次调用
      reject(e)
    }
  } else {
    // 不是promise,就直接把值resolve出去 => 值穿透
    resolve(x)
  }
}

// 三种状态：`pending`（进行中）、`fulfilled使用resolve来表示`（已成功）和`rejected`（已失败）
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
  /**
   * Promise`构造函数接受一个函数执行器(executor)作为参数, 该函数的两个参数分别是`resolve`和`reject
   * @param {*} executor 函数执行器
   */
  constructor(executor) {
    this.status = PENDING //初始状态
    this.value = undefined //存储成功的值
    this.reason = undefined //存储失败的值

    this.onResolvedCallbacks = [] //存储因为异步的成功回调
    this.onRejectedCallbacks = [] //存储因为异步的失败回调

    const resolve = value => {
      //成功的触发
      //状态一旦改变,无法再次改变状态了
      if (this.status === PENDING) {
        this.value = value // value指的是resolve(value)中value的值
        this.status = RESOLVED //变为成功态
        //循环遍历执行存储异步的回调(等待真正触发的时候执行回调)
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      //失败的触发
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED //变为失败态
        //循环遍历执行存储异步的回调
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      //刚开始就抛出了错误,也就是失败
      reject(e)
    }
  }
  /**
   * then接受俩个函数
   * @param {*} onFulfilled 成功执行函数
   * @param {*} onRejected 失败执行函数
   */
  then(onFulfilled, onRejected) {
    // 判断then的俩个参数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val //是函数返回函数,不是函数返回值传给下面
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err
          } //是函数返回函数,不是函数抛出err
    // 链式的调用需要使用到递归
    let promise2 = new Promise((resolve, reject) => {
      // 判断当前状态
      if (this.status === RESOLVED) {
        // 当前成功的状态
        // 用setTimeout保证返回的promise能找到
        setTimeout(() => {
          // 如果在函数内部中出现错误
          try {
            let x = onFulfilled(this.value) //需要通x来存储上一个的值
            // 然后执行解析promise函数
            resolvePromise(promise2, x, resolve, reject) //这里因为promise是先new 后在给值的,所以必须是异步,使用定时器
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === REJECTED) {
        //当前失败的状态
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      // 异步处理,也就是状态还是处于PENDING
      if (this.status === PENDING) {
        // 这时候就需要先把他们存起来,等异步玩在执行
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
}

Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
