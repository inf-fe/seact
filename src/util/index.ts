import React from 'react'
import { omit, forOwn } from 'lodash-es'

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
export function kebabCaseToCamelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  }
  )
}
export function kebabCaseToPascalCase(str) {
  function clearAndUpper(text) {
    return text.replace(/-/, '').toUpperCase()
  }
  return str.replace(/(^\w|-\w)/g, clearAndUpper)
}
export function firstLetterDowncase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}
export const REACT_ELEMENT = '__$ReactElement'
type TANodeGen = (self: any) => {
  children: [{
    children: any[],
    directives: {
      ref: {
        value: {
          type: 1,
          value: string
        }
      }
    },
    events: any[],
    props: any[],
    tagName: string
  }],
  directives: {},
  events: [],
  props: []
}
export const aNodeGen: TANodeGen = (self) => {
  const props = Object.keys(getDataOnly(self)).map((key) => {
    return {
      name: key,
      expr: {
        type: ExprType.ACCESSOR,
        paths: [
          {
            type: ExprType.STRING,
            value: key
          }
        ]
      }
    }
  })
  const events = Object.keys(getEvent(self)).map((key) => {
    return {
      name: key,
      modifier: {},
      expr: {
        type: ExprType.CALL,
        name: {
          type: ExprType.ACCESSOR,
          paths: [
            {
              type: ExprType.STRING,
              value: key
            }
          ]
        },
        args: [
          {
            type: ExprType.ACCESSOR,
            paths: [
              {
                type: ExprType.STRING,
                value: "$event"
              }
            ]
          }
        ]
      }
    }
  })
  return {
    children: [{
      children: [],
      directives: {
        ref: {
          value: {
            type: 1,
            value: 'sanApp'
          }
        }
      },
      events,
      props,
      tagName: 'san-app'
    }],
    directives: {},
    events: [],
    props: []
  }
}
// TODO 插槽是否也需要处理props和event来保证初始化时和san一致？
export const defaultSlotGen = () => ({
  children: [],
  directives: {
    ref: {
      value: {
        type: 1,
        value: 'san-child-default-ref'
      }
    }
  },
  events: [],
  props: [],
  tagName: 'san-child-default'
})
export const namedSlotGen = (key: string) => ({
  children: [],
  directives: {
    ref: {
      value: {
        type: 1,
        value: `san-child-${key}-ref`
      }
    }
  },
  events: [],
  props: [{
    expr: {
      type: 1,
      value: key
    },
    name: 'slot'
  }],
  tagName: `san-child-${key}`
})
// 事件也一起传进来，不过滤
export function getData(self) {
  const obj = {}
  if (self.props.sModels) {
    forOwn(self.props.sModels, (value, key) => {
      obj[key] = value[0]
    })
  }
  return { ...omit(self.props, ['sModels', 'children']), ...obj }
}
export function getDataOnly(self) {
  const obj = {}
  if (self.props.sModels) {
    forOwn(self.props.sModels, (value, key) => {
      obj[key] = value[0]
    })
  }
  const eventKeys = Object.keys(self.props).filter(v => v.startsWith('on'))
  return { ...omit(self.props, ['sModels', 'children', ...eventKeys]), ...obj }
}
export function getEvent(self) {
  return Object.keys(self.props).reduce((acc, cur) => {
    if (cur.startsWith('on')) {
      acc[firstLetterDowncase(cur.slice(2))] = self.props[cur]
    }
    return acc
  }, {})
}
export function isNormalObject(children) {
  return !Array.isArray(children) && !React.isValidElement(children) && children instanceof Object
}

/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

type IsUnion<T, B = T> = T extends T
  ? [Exclude<B, T>] extends [never]
  ? false
  : true
  : never;

export type ExpandRecursive<T> = IsUnion<T> extends true
  ? UnionToTuple<T>[number]
  : T extends infer O
  ? O extends object
  ? {
    [K in keyof O]: Expand<O[K]>
  }
  : O
  : never

export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

// export type ExpandRecursive<T> = T extends object
//   ? T extends infer O
//   ? { [K in keyof O]: ExpandRecursive<O[K]> }
//   : never
//   : T;