// 驼峰转下划线
function humpToLine(humpStr) {
  let lineStr = ''
  for(let i = 0; i < humpStr.length; i++) {
    lineStr += humpStr[i].replace(/([A-Z])/, function(match, key){
      return `_${key.toLowerCase()}`
    })
  }
  return lineStr
}
const humpStr = 'getUserName'
console.log(humpToLine(humpStr))
// humpStr.toLowerCase()