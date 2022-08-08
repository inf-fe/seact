import React from 'react'
import san from 'san'
import { getId, firstLetterDowncase, REACT_ELEMENT } from '../util'
import { omit, merge, forOwn } from 'lodash'
import { ReactInSan } from './ReactInSan'
/**
 * props
 * event
 * 双向绑定
 * 匿名插槽、具名插槽
 */
// const SanContainer = san.defineComponent({
//   template: ''
// })
// TODO 默认插槽，如果不用对象声明的呢种和default的合并
function Container (SanComponent) {
  return class Container extends React.Component {
    constructor () {
      super()
      this.id = getId()
    }

    componentDidMount () {
      const self = this
      // * -> attach-el 这一层dom可以去掉，不过可能有隐患
      const node = document.querySelector(`.wrap-${this.id}`)
      console.log('children', this.props.children)
      // * 开发测试用
      this.sanAppComponents = {}
      const aNode = {
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
          events: [],
          props: [],
          tagName: 'san-app'
        }],
        directives: {},
        events: [],
        props: []
      }
      if (isNormalObject(this.props.children)) {
        Object.entries(this.props.children).forEach(([key, value]) => {
          if (key === 'default') {
            aNode.children[0].children.push({
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
            this.sanAppComponents['san-child-default'] = ReactInSan()
          } else {
            aNode.children[0].children.push({
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
            this.sanAppComponents[`san-child-${key}`] = ReactInSan()
          }
        })
      }

      // if (isReactChildren(this.props.children)) {
      //   sanAppComponents['san-child'] = ReactInSan()
      // }
      // * san-app 调用 SanInReact 的参数
      const SanContainer = san.defineComponent({
        aNode, // '<san-app s-ref="sanApp"><san-child s-ref="sanChild"></san-child></san-app>',
        // template: '<san-app s-ref="sanApp"><san-child-default/><san-child-slot1 slot="slot1"/></san-app>',
        components: {
          'san-app': SanComponent,
          // 'san-child-default': ReactInSan()
          ...self.sanAppComponents
        },
        attached () {
          console.log('ref san', this.ref('sanApp'))
          // console.log('ref san child', this.ref('sanChild'))
          self.sanApp = this.ref('sanApp')
          // self.sanChild = this.ref('sanChild')
          // 直接控制sanApp，而不是通过 sanContainer控制
          self.sanApp.data.assign(getData(self))
          console.log('this.sanAppComponents', self.sanAppComponents)
          console.log('slots', ...Object.keys(self.sanAppComponents).map(v => {
            return `${v}-ref`
          }))
          Object.keys(self.sanAppComponents).forEach(v => {
            this.ref(`${v}-ref`).data.assign({
              [REACT_ELEMENT]: <>{self.props.children[v.slice(10)]}</>
            })
          })
          // console.log('san-child-default', this.ref('san-child-default-ref'))
          // this.ref('san-child-default-ref').data.assign({
          //   [REACT_ELEMENT]: <>{self.props.children.default}</>
          // })
          // if (isReactChildren(self.props.children)) {
          //   self.sanChild?.data.assign({
          //     [REACT_ELEMENT]: <>{self.props.children}</> // 兼容数组children
          //   })
          // }

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
      // console.log('empty', JSON.stringify(this.sanApp.aNode))
      // SanComponent.constructor.prototype.components = {
      //   'san-child': temp
      // }
      // this.sanApp = new SanComponent({
      //   source: /* html */`
      //     <x-san-app>
      //       <p>pppp</p>
      //       <san-child></san-child>
      //     </x-san-app>
      //   `,
      //   owner: this.sanAppContainer,
      //   data: getData(this), // * -> initData data和initData声明的地方不同，直接new的data，在组件里定义就是initData
      //   components: {
      //     'san-child': temp
      //   }
      // })
      console.log('this.sanAppContainer', this.sanAppContainer)
      console.log('this.lifeCycle', this.sanAppContainer.lifeCycle)
      console.log('this.sanApp', this.sanApp)
      console.log('props', this.props)
      // const parentNode = node.parentNode
      // * <- initData
      // this.sanApp.data.assign(getData(this))

      // const eventObj = getEvent(this)
      // Object.keys(eventObj).forEach(key => {
      //   this.sanApp.on(key, eventObj[key])
      // })

      // if (this.props.sModels) {
      //   forOwn(this.props.sModels, (value, key) => {
      //     this.sanApp.watch(key, value[1])
      //   })
      // }
      this.sanAppContainer.attach(node)
      console.log('this.lifeCycle', this.sanAppContainer.lifeCycle)
      // this.sanApp.attach(this.sanAppContainer.el)
      // * <- attach-el
      // parentNode.replaceChild(parentNode.children[1].children[0], parentNode.children[1])
    }

    componentDidUpdate () {
      // console.log('update', this.sanChild)
      // this.sanChild?.data.assign({
      //   [REACT_ELEMENT]: <>{this.props.children}</>
      // })
      Object.keys(this.sanAppComponents).forEach(v => {
        this.sanAppContainer.ref(`${v}-ref`).data.assign({
          [REACT_ELEMENT]: <>{this.props.children[v.slice(10)]}</>
        })
      })
      this.sanAppContainer.data.assign(getData(this))
    }

    componentWillUnmount () {
      // this.sanApp.dispose()
      this.sanAppContainer.dispose()
    }

    render () {
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

export function SanInReact (SanComponent) {
  if (!SanComponent) {
    console.warn('Component must be passed in SanInReact!')
    return
  }
  return Container(SanComponent)
}
// 事件也一起传进来，不过滤
function getData (self) {
  const obj = {}
  if (self.props.sModels) {
    forOwn(self.props.sModels, (value, key) => {
      obj[key] = value[0]
    })
  }
  return { ...omit(self.props, ['sModels', 'children']), ...obj }
}
function getEvent (self) {
  const eventObj = {}
  Object.keys(self.props).forEach(key => {
    if (key.startsWith('on')) {
      eventObj[firstLetterDowncase(key.slice(2))] = self.props[key]
    }
  })
  return eventObj
}
function setEvent (self, sanApp) {
  const eventObj = getEvent(self)
  Object.keys(eventObj).forEach(key => {
    sanApp.on(key, eventObj[key])
  })
}

function isReactChildren (children) {
  return Array.isArray(children) || React.isValidElement(children)
}
function isNormalObject (children) {
  return !Array.isArray(children) && !React.isValidElement(children) && children instanceof Object
}
