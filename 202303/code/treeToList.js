/**
 * 编写函数tree 转  list
 * 给出一个树结构，将其扁平化转为普通数组类型； 
 */
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
// 输出
const arr = [
  { id: 1, name: '节点1', parentId: null },
  { id: 2, name: '节点2', parentId: 1 },
  { id: 3, name: '节点3', parentId: 1 },
  { id: 4, name: '节点4', parentId: null },
  { id: 5, name: '节点5', parentId: 3 },
];


function treeToList (treeData) {
  const res = []
  const dfs = (treeData) => {
    treeData.forEach(item => {
      console.log(item);
      if(item.children) {
        dfs(item.children)
        delete item.children
      }
      res.push(item)
    })
  }
  dfs(treeData)
  // 排序
  res.sort((a, b) => a.id - b.id)
  return res
}

console.log(treeToList(tree))