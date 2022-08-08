import React, { useState } from 'react'
import { SanInReact } from '../lib/SanInReact'
import { defineComponent } from 'san'
import './index.css'

const SanAppChild = defineComponent({
  template: /* html */`
    <div class="san-app-child">
        <h1>san app child</h1>
        <div>
            <slot name="title"></slot>
            <slot></slot>
        </div>
    </div>
    `
})

const SanApp = defineComponent({
  template: /* html */`
        <div class="san-app">
            <slot/>
            <h1>san app</h1>
            <div>props count:{{value}}</div>
            <input value="{=status=}"/>
            <san-app-child s-ref="app2">
                <div>slotData:{{value}}</div>
                <a href="" slot="title">nameSlotData:{{value}}</a>
            </san-app-child>
        </div>
    `,
  components: {
    'san-app-child': SanAppChild
  },
  attached () {
    console.log('app2', this.ref('app2'))
  }
})
const SanAppInReact = SanInReact(SanApp)
export default function SanInReactExample () {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('0')
  return (
        <div className="react-container">
            <h1>react container</h1>
            <button onClick={() => setCount(v => v + 1)}>+1 current count:{count}</button>
            <button onClick={() => setStatus(v => v + '1')}>status:{status}</button>
            <SanAppInReact
                value={count}
                sModels={{
                  status: [status, setStatus]
                }}
            >
                {{
                  default: (
                        <>
                            <div>222:{count}</div>
                            <div>3</div>
                        </>
                  ),
                  slot1: (
                        <div>nameSlot:{count}</div>
                  )
                }}
                <div>4</div>
                <div>5</div>
            </SanAppInReact>
            {/* <SanInReact san={SanApp} value={count} >
                 {{
                    default: (
                        <>
                            {({ count }) => <div id='a'>1111{count + 1}</div>}
                            <span>222</span>
                        </>
                    ),
                    slot1: (
                        <div>nameSlot:{count}</div>
                    )
                }}
                <div>4</div>
            </SanInReact> */}
        </div>
  )
}
