import san from 'san'
import React, { ComponentType as ReactComponentType } from 'react'
import ReactDOM from 'react-dom/client'
import { kebabCaseToCamelCase, kebabCaseToPascalCase, REACT_ELEMENT } from '../util'
import { sanInReact } from './sanInReact'

function Container(ReactComponent) {
  return class ReactInSanContainer extends san.Component {
    children: [any]
    parentComponent: any
    childrenComponent: any
    reactDOMRoot: ReactDOM.Root

    static template = '<template><slot/></template>' // 不声明template会报错
    created() {
    }

    attached() {
      if (this.children?.[0].children.length > 0) {
        const Slot = san.defineComponent({
          name: 'slot',
          aNode: this.children[0].aNode, // ? 低版本可能不支持根元素有多个
          filters: this.parentComponent.filters,
          components: this.parentComponent.components
        })
        // TODO 暂时只从data里取
        const slot = new Slot({
          owner: this.parentComponent,
          source: sourceGen(this)
        })
        this.childrenComponent = sanInReact(slot)
      }
      this.reactDOMRoot = ReactDOM.createRoot(this.el as HTMLElement)
      this.render()
    }

    updated() {
      this.render()
    }

    disposed() {
      this.reactDOMRoot.unmount()
    }

    render() {
      // ? 会不会有直接使用 react element 的需求，而不是现在的传一个 react component
      const porps = getAllProps(this)
      if (typeof ReactComponent === 'function') {
        this.reactDOMRoot.render(
          <ReactComponent {...porps} >
            {this.childrenComponent && <this.childrenComponent />}
          </ReactComponent>
        )
      } else if (this.data.get(REACT_ELEMENT)) {
        this.reactDOMRoot.render(this.data.get(REACT_ELEMENT))
      }
    }
  }
}

export const reactInSan = (ReactComponent?: ReactComponentType<any>) => {
  // 不用判断是否传了值
  return Container(ReactComponent)
}
function getBind(self) {
  const bindObj = {}
  // TODO 属性为slot的时候，parent.data是空的，不知道是为啥
  for (const item of self.binds.filter(v => v.name !== 'slot')) {
    bindObj[item.name] = self.parentComponent.data.get(item.expr)
    // react 调用 {变量名}Change 的函数修改变量
    // TODO react 事件转为原始事件
    bindObj[`${item.name}Change`] = (...porps) => {
      self.parentComponent.data.set(item.expr, ...porps)
    }
  }
  return bindObj
}
function getEvent(self) {
  const eventObj = {}
  for (const key in self.listeners) {
    // TODO 不确定 this 指向对不对
    // TODO 回调的是 react 事件，不是原始事件
    eventObj[`on${kebabCaseToPascalCase(key)}`] = (...porps) => self.listeners[key].forEach(({ fn }) => fn.call(self.parent, ...porps))
  }
  return eventObj
}
function getProps(self) {
  const propsOjb = {}
  Object.entries(self.data.get()).forEach(([key, value]) => {
    propsOjb[kebabCaseToCamelCase(key)] = value
  })
  return propsOjb
}
function getAllProps(self) {
  return { ...getProps(self), ...getEvent(self), ...getBind(self) }
}
function sourceGen(self) {
  return {
    directives: {},
    props: Object.keys(self.parentComponent.data.get()).map((key) => {
      return {
        name: key,
        expr: {
          type: 4,
          paths: [
            {
              type: 1,
              value: key
            }
          ]
        },
        x: 1 // 全都双向了
      }
    }),
    events: [],
    children: [],
    tagName: 'x-app'
  }
}