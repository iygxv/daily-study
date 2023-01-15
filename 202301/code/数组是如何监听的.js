// 获取数组原型
const arrayPrototype = Array.prototype;
// 以数组原型为原型创建一个对象
const arrayMethods = Object.create(arrayPrototype);

const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

methodsNeedChange.forEach(methodName => {
  // 备份数组原型上的方法
  const original = arrayPrototype[methodName]
  // 对arrayMethods进行监听
  Object.defineProperty(arrayMethods, methodName, {
    value: function() {
      console.log('进入这里了')
      // 用数组原型执行这个方法
      const result = original.apply(this, arguments);
      // 如果是添加元素, 则需要特殊处理
      // 因为Object.defineProperty只劫持已有属性
      return result;
    }
  })
})

const list = [123]
// 需要让list的原型 使用我们改写后的原型
list .__proto__= arrayMethods
list.shift()