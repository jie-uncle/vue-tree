/* eslint-disable */
const getOnlyKey = () => Number(Math.random().toString().substr(3, 32) + Date.now()).toString(36) + 1;
export const flattenTree = (data,keyField) => {
  let key = null
  let index = 0
  function flat(data, parent) { // 数组拍平
      return data.reduce((obj, currentNode) => { // [{},{}]
      key =keyField?currentNode[keyField]: getOnlyKey();
          currentNode.key = key; // 给每个节点添加一个标识
          currentNode._index = index
          index = index+1
          obj.obj[key] = {
              parent,
              node: currentNode
          }
          obj.arr.push(obj.obj[key])
          if (currentNode.children) {
            let newObj = flat(currentNode.children, currentNode)
              obj.obj = { ...obj.obj, ...newObj.obj }
              obj.arr.push(...newObj.arr)
          }
          return obj
      }, {obj:{},arr:[]})
  }
  return flat(data)
}