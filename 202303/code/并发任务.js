
class Scheduler {
  constructor() { 
    this.taskQueue = [] // 任务队列
    this.maxCount = 2 // 最大运行数量
    this.runningCount = 0 // 正在运行的数量
  }
  add(fn, time) {
    const task = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fn()
          resolve()
        }, time)
      })
    }
    this.taskQueue.push(task)
  }
  run() {
    if (!this.taskQueue.length || this.runningCount > this.maxCount) return
    this.runningCount++ // 每执行一个任务++
    const task = this.taskQueue.shift() // 取出任务, task是一个函数(shift删除最前面一个, 并返回删除的元素)
    task().then(() => {
      // then后,说明执行完毕 runningCount --
      this.runningCount--
      this.run() // 没结束, 执行下一个任务, 知道所有任务完成
    })
  }
  start() {
    for (let i = 0; i < this.maxCount; i++) {
      this.run()
    }
  }
}

const task1 = () => {
  console.log('task1')
}
const task2 = () => {
  console.log('task2')
}
const task3 = () => {
  console.log('task3')
}
const task4 = () => {
  console.log('task4')
}
const task5 = () => {
  console.log('task5')
}

const scheduler = new Scheduler()
scheduler.add(task1, 0)
scheduler.add(task2, 1000)
scheduler.add(task3, 1000)
scheduler.add(task4, 3000)
scheduler.add(task5, 1000)


scheduler.start()
