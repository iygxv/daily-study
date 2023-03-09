/**
 * 编写函数list 转 tree。
 * 给出一个数组，将其转为树结构类型；
 */
 const arr = [
  { id: 1, name: '节点1', parentId: null },
  { id: 2, name: '节点2', parentId: 1 },
  { id: 3, name: '节点3', parentId: 1 },
  { id: 4, name: '节点4', parentId: null },
  { id: 5, name: '节点5', parentId: 3 },
];
// 输出
const tree = [
  {
    id: 1,
    name: '节点1',
    parentId: null,
    children: [
      {
        id: 2,
        name: '节点2',
        parentId: 1
      },
      {
        id: 3,
        name: '节点3',
        parentId: 1,
        children: [
          { id: 5, name: '节点5', parentId: 3 }
        ]
      }
    ]
  },
  { id: 4, name: '节点4', parentId: null }
]

function listToTree(list) {
  const res = []
  let temp = {}
  list.forEach(item => {
    temp[item.id] = item
  })

  for(let key in temp) {
    if(temp[key].parentId) {
      const parentId =  temp[key].parentId
      if(temp[parentId].children) {
        temp[parentId].children.push(temp[key])
      }else {
        (temp[parentId].children = []) && temp[parentId].children.push(temp[key])
      }
    }else {
      res.push(temp[key])
    }
  }

  return res

}
console.log(listToTree(arr))


