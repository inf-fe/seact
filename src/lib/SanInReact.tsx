import React, { ReactNode, Component as ReactComponent } from 'react'
import san, { Component as SanComponent } from 'san'
import {
  getId,
  REACT_ELEMENT,
  aNodeGen,
  defaultSlotGen,
  namedSlotGen,
  isNormalObject,
  getData,
  getDataOnly,
  getEvent
} from '../util'
import { forOwn } from 'lodash-es'
import { reactInSan } from './reactInSan'
type TPropsChildren = {
  [key: string]: ReactNode
}
type Children = TPropsChildren | ReactNode
interface IPropType {
  children?: any,
  sModels?: {
    [key: string]: [any, any]
  }
}

function Container<T>(SanComponent) {
  return class SanInReactContainer extends ReactComponent<IPropType & T> {
    id: number;
    propsChildren: Children
    sanAppComponents: {
      [key: string]: any
    }
    sanApp: SanComponent
    sanAppContainer: SanComponent

    constructor(props) {
      super(props)
      this.id = getId()
      this.sanAppComponents = {}
    }

    componentDidMount() {
      const self = this
      // TODO 去掉这一层div
      const node = document.querySelector(`.wrap-${this.id}`)
      const aNode = aNodeGen(self)
      setPropsChildren(this)
      if (isNormalObject(this.propsChildren)) {
        Object.keys(this.propsChildren as TPropsChildren).forEach((key) => {
          if (key === 'default') {
            aNode.children[0].children.push(defaultSlotGen())
            this.sanAppComponents['san-child-default'] = reactInSan()
          } else {
            aNode.children[0].children.push(namedSlotGen(key))
            this.sanAppComponents[`san-child-${key}`] = reactInSan()
          }
        })
      }
      // * san-app 调用 sanInReact 的参数
      const SanContainer = san.defineComponent({
        aNode,
        components: {
          'san-app': SanComponent,
          ...self.sanAppComponents
        },
        initData() {
          return getDataOnly(self)
        },
        attached() {
          self.sanApp = this.ref('sanApp')
          // 直接控制sanApp，而不是通过 sanContainer控制
          self.sanApp.data.assign(getData(self))
          Object.keys(self.sanAppComponents).forEach(v => {
            this.ref(`${v}-ref`).data.assign({
              [REACT_ELEMENT]: <>{self.propsChildren?.[v.slice(10)]}</>
            })
          })
          if (self.props.sModels) {
            forOwn(self.props.sModels, (value, key) => {
              self.sanApp.watch(key, value[1])
            })
          }
        },
        ...getEvent(self)
      })
      this.sanAppContainer = typeof SanComponent === 'function' ? new SanContainer() : SanComponent
      this.sanAppContainer.attach(node as HTMLElement)
      // * <- attach-el
      // parentNode.replaceChild(parentNode.children[1].children[0], parentNode.children[1])
    }

    componentDidUpdate() {
      setPropsChildren(this)
      Object.keys(this.sanAppComponents).forEach(v => {
        this.sanAppContainer.ref(`${v}-ref`).data.assign({
          [REACT_ELEMENT]: <>{this.propsChildren?.[v.slice(10)]}</>
        })
      })
      this.sanApp.data.assign(getData(this))
    }

    componentWillUnmount() {
      this.sanAppContainer.dispose()
    }

    render() {
      if (SanComponent) {
        return (
          <div className={`wrap-${this.id}`}></div>
        )
      } else {
        return null
      }
    }
  }
}

export function sanInReact<T>(SanComponent) {
  if (!SanComponent) {
    console.warn('Component must be passed in sanInReact!')
  }
  return Container<T>(SanComponent)
}
function setPropsChildren(self) {
  if (!isNormalObject(self.props.children) && self.props.children) {
    self.propsChildren = {
      default: self.props.children
    }
  } else {
    self.propsChildren = self.props.children
  }
}
