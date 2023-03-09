// 大驼峰、小驼峰、下划线命名  互转


// 大驼峰 => 小驼峰
const humpChange1 = (greatHump) => {
  return greatHump.replace(greatHump[0], greatHump[0].toLowerCase())
}

// 小驼峰 => 小驼峰
const humpChange2 = (greatHump) => {
  return greatHump.replace(greatHump[0], greatHump[0].toUpperCase())
}

// 大驼峰 => 下划线

const humpToLine1 = (humpStr) => {
  let lineStr = ''
  for(let i = 0; i < humpStr.length; i++) {
    lineStr += humpStr[i].replace(/([A-Z])/g, (match, key) => {
      return `_${key.toLowerCase()}`
    })
  }
  return lineStr.slice(1)
}
console.log(humpToLine1('GetUserName')) // get_user_name

// 小驼峰 => 下划线
const humpToLine2 = (humpStr) => {
  let lineStr = ''
  for(let i = 0; i < humpStr.length; i++) {
    lineStr += humpStr[i].replace(/([A-Z])/g, (match, key) => {
      return `_${key.toLowerCase()}`
    })
  }
  return lineStr
}
console.log(humpToLine2('getUserName')) // get_user_name

// 下划线 => 大小驼峰是相反的操作