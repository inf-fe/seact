import React from 'react'
import san, { defineComponent } from 'san'
import { ReactInSan } from '../lib/ReactInSan2'
import ReactDOM from 'react-dom/client'

function ReactApp2 ({ onClick, count, children }) {
  return <div onClick={onClick}>react child:{count}<div>children:{children}</div></div>
}
function ReactApp3 ({ value, onChange }) {
  return <div>
        3:<input type="text" value={value} onChange={onChange} />
    </div>
}
const ReactAppInSan = ReactInSan(ReactApp2)
const ReactAppInSan2 = ReactInSan(ReactApp3)
const SanApp3 = san.defineComponent({
  template: /* html */`
        <template>
            <input value="{=count=}"/>
        </template>
    `,
  attached () {
    console.log('template anode', this.aNode)
  }
})
const SanApp = san.defineComponent({
  template: /* html */`
    <div class="app">
        <button on-click="increment">click +1</button>
        <button on-click="incrementObj">click obj key +1</button>
        <div>cout:{{count}}:{{obj.key.key}}</div>
        <react-app-in-san count="{{count}}">
            <div id="{{value}}">1111</div>
            <button on-click="handleClick($event,count)">click event</button>
            <div>2222:{{count}}:{{value}}:{{obj.key.key}}</div>
            <san-app-3 count="{=count=}"/>
        </react-app-in-san>
    </div>
    `,
  // TODO slot 内的 filter
  // TODO 组件上的双向绑定
  // <react-app-in-san2 value="{=count=}"/>
  components: {
    'react-app-in-san': ReactAppInSan,
    'react-app-in-san2': ReactAppInSan2,
    'san-app-3': SanApp3
  },
  initData () {
    return {
      count: 100,
      value: 'thisisstring',
      obj: {
        key: {
          key: 4
        }
      }
    }
  },
  increment () {
    this.data.set('count', this.data.get('count') + 1)
  },
  handleClick (e) {
    console.log('click event', e)
    console.log(this.data.get('count'))
  },
  incrementObj () {
    this.data.set('obj.key.key', this.data.get('obj.key.key') + 1)
  }
})

// let aNode = {
//     "directives": {},
//     "props": [
//         {
//             "name": "class",
//             "expr": {
//                 "type": 5,
//                 "expr": {
//                     "type": 4,
//                     "paths": [
//                         {
//                             "type": 1,
//                             "value": "class"
//                         }
//                     ]
//                 },
//                 "filters": [
//                     {
//                         "type": 6,
//                         "args": [],
//                         "name": {
//                             "type": 4,
//                             "paths": [
//                                 {
//                                     "type": 1,
//                                     "value": "_class"
//                                 }
//                             ]
//                         }
//                     }
//                 ]
//             }
//         },
//         {
//             "name": "style",
//             "expr": {
//                 "type": 5,
//                 "expr": {
//                     "type": 4,
//                     "paths": [
//                         {
//                             "type": 1,
//                             "value": "style"
//                         }
//                     ]
//                 },
//                 "filters": [
//                     {
//                         "type": 6,
//                         "args": [],
//                         "name": {
//                             "type": 4,
//                             "paths": [
//                                 {
//                                     "type": 1,
//                                     "value": "_style"
//                                 }
//                             ]
//                         }
//                     }
//                 ]
//             }
//         },
//         {
//             "name": "id",
//             "expr": {
//                 "type": 4,
//                 "paths": [
//                     {
//                         "type": 1,
//                         "value": "id"
//                     }
//                 ]
//             }
//         }
//     ],
//     "events": [],
//     "children": [
//         {
//             "textExpr": {
//                 "type": 7,
//                 "segs": [
//                     {
//                         "type": 1,
//                         "value": "Hello "
//                     },
//                     {
//                         "type": 5,
//                         "expr": {
//                             "type": 4,
//                             "paths": [
//                                 {
//                                     "type": 1,
//                                     "value": "name"
//                                 }
//                             ]
//                         },
//                         "filters": []
//                     }
//                 ]
//             }
//         }
//     ],
//     "tagName": "p"
// }
// const SanApp = san.defineComponent({
//     template: `<div>111</div>`,
//     beforeCompile() {
//         console.log(this)
//         // this.prototype.template = `<div class="wrap-{{id}}"><slot/></div>`;
//         console.log('template', this.template)
//         aNode.tagName='div'
//     },
//     aNode
// })

// const Child = san.defineComponent({
//     name: 'childddd',
//     template: `<div>111:<slot/><slot name="namedslot"/></div>`,
//     attached() {
//         console.log(this)
//         // 递归取所有的slot
//         // console.log(this.slot())
//         // console.log(this.slot().map(v => v.isInserted))
//         // console.log(this.slot().map(v => v.isScoped))
//         // console.log(this.parentComponent.children.find(v => v === this))
//     }
// })
// console.log(Child.prototype.name)
// console.log(Child.prototype.template)
// const SanApp = san.defineComponent({
//     template: /*html*/`
//         <div>
//             222
//             <child>
//                 <p>ppppp</p>
//                 <main>main:{{fff}}</main>
//             </child>
//         </div>`,
//     components: {
//         child: Child
//     },
//     initData() {
//         return {
//             fff: 9
//         }
//     },
//     attached() {
//         console.log('parent', this)
//         // console.log('parent', JSON.stringify(this.aNode, null, 2))
//     }
// })

const sanApp = new SanApp()
sanApp.attach(document.getElementById('root'))

// function ReactApp4({value}) {
//     return (
//         <div>react4:{value}</div>
//     )
// }

// function ReactApp3({ children }) {
//     console.log('children',children)
//     // children.props.value = '3333'
//     return (
//         <div>react2:{children}</div>
//     )
// }

// function ReactApp() {
//     return (
//         <div>react
//             <ReactApp3>
//                 <ReactApp4 value="1111"></ReactApp4>
//             </ReactApp3>
//         </div>
//     )
// }

// class ReactApp extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             value: '111'
//         }
//     }
//     componentDidUpdate() {
//         console.log('update')
//     }
//     render() {
//         return (
//             <div>react:{this.props.value}</div>
//         )
//     }
// }
// const root = ReactDOM.createRoot(document.getElementById('main'))
// setInterval(() => {
//     root.render(
//         <ReactApp value={(new Date()).getTime()}/>
//     )
// }, 3000)
