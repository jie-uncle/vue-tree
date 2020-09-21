/* eslint-disable */
export const flattenTree = (data,keyField) => {
  function flat(data, parent) { // 数组拍平
    let key = null
      return data.reduce((obj, currentNode) => { // [{},{}]
      key =keyField?currentNode[keyField]: getOnlyKey();
          currentNode.key = key; // 给每个节点添加一个标识
          obj[key] = {
              parent,
              node: currentNode
          }
          if (currentNode.children) {
              obj = { ...obj, ...flat(currentNode.children, currentNode) }
          }
          return obj
      }, {})
  }
  return flat(data)
}
const getOnlyKey = () => Number(Math.random().toString().substr(3, 32) + Date.now()).toString(36) + 1;