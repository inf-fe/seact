import san, { defineComponent } from 'san'
import ReactDOM from 'react-dom/client'
import React, { useState } from 'react'
import { SanInReact } from '../lib/SanInReact'
const temp = san.defineComponent({
  template: '<a>temp</a>'
})
const SanApp3 = defineComponent({
  template: /* html */`
    <div>
      <slot name="slot1"/>
      <input value="{=value=}"/> san app 3
      <slot></slot>
      <temp></temp>
    </div>
  `,
  components: {
    temp,
    'san-child': temp
  }
})
const SanApp2 = defineComponent({
  template: /* html */`
    <span>
      <slot name="name234"/>
      <div>san app 2</div>
    </span>
  `,
  beforeAttach () {
    console.log('name2342 aNode beforeAttach', this.aNode)
  },
  attached () {
    console.log('name2342 aNode attached', this.aNode)
  }
})

const SanApp = defineComponent({
  template: /* html */`
        <div>
            <child s-ref="child"><a slot="name234">llll</a></child>
            <button on-click="add">+1</button>
        </div>
    `,
  initData () {
    return {
      number: 234
    }
  },
  components: {
    child: SanApp2
  },
  add () {
    this.data.set('number', this.data.get('number') + 1)
  },
  beforeAttach () {
    // console.log('san app aNode', this.aNode)
  },
  attached () {
    // console.log('child ref', this.ref('child'))
  }
})

const React1 = ({ value }) => {
  return <div>1:{value}</div>
}
const SanInReactApp2 = SanInReact(SanApp2)
const SanInReactApp3 = SanInReact(SanApp3)

const React2 = () => {
  // const value = 3333
  const [value, setValue] = useState(333)
  return (
    <div>
      <div>react</div>
      {/* <SanInReactApp2 >
        <a slot="name234">{{ value }}</a>
      </SanInReactApp2> */}
      <div>value:{value}</div>
      <input value={value} onChange={e => setValue(e.target.value)}></input>
      <SanInReactApp3 sModels={{
        value: [value, setValue]
      }}>
        {
          Number(value) > 333 ? <div>{value}</div> : <a href='http://www.baidu.com'>aaaa</a>
        }
      </SanInReactApp3>
    </div>
  )
}
const React3 = () => {
  // const value = 3333
  const [value, setValue] = useState(333)
  return (
    <div>
      <div>react</div>
      {/* <SanInReactApp2 >
        <a slot="name234">{{ value }}</a>
      </SanInReactApp2> */}
      <div>value:{value}</div>
      <input value={value} onChange={e => setValue(e.target.value)}></input>
      <SanInReactApp3 sModels={{
        value: [value, setValue]
      }}>
        <a href='http://www.baidu.com'>aaaa</a>
        <a href='http://www.baidu.com'>bbbb</a>
      </SanInReactApp3>
    </div>
  )
}
const React4 = () => {
  // const value = 3333
  const [value, setValue] = useState(333)
  return (
    <div>
      <div>react</div>
      {/* <SanInReactApp2 >
        <a slot="name234">{{ value }}</a>
      </SanInReactApp2> */}
      <div>value:{value}</div>
      <input value={value} onChange={e => setValue(e.target.value)}></input>
      <SanInReactApp3 sModels={{
        value: [value, setValue]
      }}>
        {{
          default: Number(value) > 333 ? <div>{value}</div> : <a href='http://www.baidu.com'>aaaa</a>,
          slot1: <a href='http://www.baidu.com'>bbbb</a>
        }}
      </SanInReactApp3>
    </div>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React4 />
)
// console.log('React2', React2().props.children[1].type(React2().props.children[1].props))
const sanApp = new SanApp()
console.log('sanApp', sanApp)
window.app = sanApp
// sanApp.attach(document.querySelector('#root'))

// const Table = san.defineComponent({
//   template: '' +
//       '<table>' +
//       '<thead><tr><th s-for="col in columns">{{col.label}}</th></tr></thead>' +
//       '<tbody>' +
//       '<tr s-for="row in datasource">' +
//       '<td s-for="col in columns">' +
//       '<slot name="col-{{col.name}}" var-row="row" var-col="col">{{row[col.name]}}</slot>' +
//       '</td>' +
//       '    </tr>' +
//       '</tbody>' +
//       '</table>'
// })

// const MyComponent = san.defineComponent({
//   components: {
//     'x-table': Table
//   },

//   template: '' +
//       '<div>' +
//       '<x-table columns="{{columns}}" datasource="{{list}}">' +
//       '<b slot="col-name">{{row.name}}</b>' +
//       '</x-table>' +
//       '</div>'

// })

// const myComponent = new MyComponent({
//   data: {
//     columns: [
//       { name: 'name', label: '名' },
//       { name: 'email', label: '邮' }
//     ],
//     list: [
//       { name: 'errorrik', email: 'errorrik@gmail.com' },
//       { name: 'leeight', email: 'leeight@gmail.com' }
//     ]
//   }
// })
// console.log('myComponent', myComponent)
// myComponent.attach(document.querySelector('#root'))

// const Shower = san.defineComponent({
//   template: '<div>shower</div>'
// })
// const Editor = san.defineComponent({
//   template: '<div>editor:<show/>:<slot/></div>',
//   // components: {
//   //   show: Shower
//   // }
//   attached () {
//     console.log('node', this.aNode)
//   }
// })

// Editor.prototype.components = {
//   show: Shower,
//   'x-show': Shower
// }
// console.log('Editor', Editor.prototype)
// const Test = san.defineComponent({
//   template: '<div>test</div>',
//   attached () {
//     if (!this.editor) {
//       // const Container = san.defineComponent({
//       //   template: '<x-editor><x-show/></x-editor>',
//       //   components: {
//       //     'x-show': Shower,
//       //     'x-editor': Editor
//       //   }
//       // })
//       // this.editor = new Container()
//       this.editor = new Editor({
//         owner: this,
//         source: '<x-editor><x-show/></x-editor>'
//         // components: {
//         //   'x-show': Shower
//         // }
//       })
//       this.editor.attach(this.el)
//     }
//   }
// })
// const test = new Test()
// test.attach(document.body)

console.log('parsetemplate', san.parseTemplate('<san-app s-ref="sanApp"><san-child/><san-child2 slot="fff"/></san-app>'))
