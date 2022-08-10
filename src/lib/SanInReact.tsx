import React, { ReactNode, Component as ReactComponent } from 'react'
import san, { Component as SanComponent } from 'san'
import { getId, firstLetterDowncase, REACT_ELEMENT, aNodeGen, defaultSlotGen, namedSlotGen } from '../util'
import { omit, forOwn } from 'lodash'
import { ReactInSan } from './ReactInSan'
type TPropsChildren = {
  [key: string]: ReactNode
}
type Children = TPropsChildren | ReactNode
interface IPropType {
  children?:  any,
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
      const aNode = aNodeGen()
      setPropsChildren(this)
      if (isNormalObject(this.propsChildren)) {
        Object.keys(this.propsChildren as TPropsChildren).forEach((key) => {
          if (key === 'default') {
            aNode.children[0].children.push(defaultSlotGen())
            this.sanAppComponents['san-child-default'] = ReactInSan()
          } else {
            aNode.children[0].children.push(namedSlotGen(key))
            this.sanAppComponents[`san-child-${key}`] = ReactInSan()
          }
        })
      }
      // * san-app 调用 SanInReact 的参数
      const SanContainer = san.defineComponent({
        aNode,
        components: {
          'san-app': SanComponent,
          ...self.sanAppComponents
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
          const eventObj = getEvent(self)
          Object.keys(eventObj).forEach(key => {
            self.sanApp.on(key, eventObj[key])
          })

          if (self.props.sModels) {
            forOwn(self.props.sModels, (value, key) => {
              self.sanApp.watch(key, value[1])
            })
          }
        }
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

export function SanInReact<T>(SanComponent) {
  if (!SanComponent) {
    console.warn('Component must be passed in SanInReact!')
  }
  return Container<T>(SanComponent)
}
function setPropsChildren(self){
  if (!isNormalObject(self.props.children) && self.props.children) {
    self.propsChildren = {
      default: self.props.children
    }
  } else {
    self.propsChildren = self.props.children
  }
}
// 事件也一起传进来，不过滤
function getData(self) {
  const obj = {}
  if (self.props.sModels) {
    forOwn(self.props.sModels, (value, key) => {
      obj[key] = value[0]
    })
  }
  return { ...omit(self.props, ['sModels', 'children']), ...obj }
}
function getEvent(self) {
  return Object.keys(self.props).reduce((acc,cur)=>{
    if (cur.startsWith('on')) {
      acc[firstLetterDowncase(cur.slice(2))] = self.props[cur]
    }
    return acc
  },{})
}
function isNormalObject(children) {
  return !Array.isArray(children) && !React.isValidElement(children) && children instanceof Object
}
