let id = 0
export const getId = () => {
  return ++id
}
export const ExprType = {
  STRING: 1,
  NUMBER: 2,
  BOOL: 3,
  ACCESSOR: 4,
  INTERP: 5,
  CALL: 6,
  TEXT: 7,
  BINARY: 8,
  UNARY: 9,
  TERTIARY: 10,
  ARRAY: 11,
  OBJECT: 12
}
export const NodeType = {
  TEXT: 1,
  IF: 2,
  FOR: 3,
  ELEM: 4,
  CMPT: 5,
  SLOT: 6,
  FRAG: 7,
  LOADER: 8,
  IS: 9
}
export function kebabCaseToCamelCase (str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  }
  )
}
export function kebabCaseToPascalCase (str) {
  function clearAndUpper (text) {
    return text.replace(/-/, '').toUpperCase()
  }
  return str.replace(/(^\w|-\w)/g, clearAndUpper)
}
export function firstLetterDowncase (str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}
export const REACT_ELEMENT = '__$ReactElement'
