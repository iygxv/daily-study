//判断两个对象是否相同（包含绝对相等和他们是否有相同的形状）
function looseEqual (a, b) {
  if (a === b) { //如果是绝对相等就直接返回true
    return true ;
  }
  //如果不是绝对相等就哦按的他们是否有相同的形状
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {//两个均是对象
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {//如果都是数组
        if(a.length === b.length){//如果长度相等
            return a.every(function (e, i) {//用every和递归来比对a数组和b数组的每个元素，并返回
               return looseEqual(e, b[i])
            })
        }
        //长度都不等直接返回false
        return  false;
      } else if (a instanceof Date && b instanceof Date) {//如果是Date 则直接getTime 比较
         return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {//对象的比较
        //拿到两个对象的key
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        if(keysA.length === keysB.length){//如果keys相等
            return keysA.every(function (key) {//用every和递归来比对a对象和b对象的每个元素值，并返回
            return looseEqual(a[key], b[key]);
          })
        }
        //长度都不等直接返回false
        return false;
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {//如果都不是对象则按String来处理
      return String(a) === String(b)
  } else {
      return false
  }
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}