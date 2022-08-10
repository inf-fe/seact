import React from 'react'
import san, { defineComponent } from 'san'
import { ReactInSan } from '../lib/ReactInSan'
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

export default SanApp
