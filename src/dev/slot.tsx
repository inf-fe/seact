import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import san from 'san'
import { SanInReact } from '../lib/SanInReact'

const SanApp = san.defineComponent({
    template:/*html*/`
        <div>
            <p>san app</p>
            <button on-click="add">+1</button>
            <div>value:{{value}}</div>
            <slot></slot>
            <div>san bottom</div>
        </div>
    `,
    add() {
        this.fire('add', this.data.get('value') + 1)
    }
})

const SanAppInReact = SanInReact(SanApp)
const ReactApp2 = () => {
    return (
        <div>
            ReactApp2
        </div>
    )
}

function ReactApp() {
    const [value, setValue] = useState(10)
    const handleChange = (e) => {
        console.log('e', e)
        setValue(e.target.value)
    }
    return (
        <div>
            <p>react app</p>
            <div>value:{value}</div>

            <SanAppInReact value={value} onAdd={setValue} >
                {/* <ReactApp2/> */}
                <p>react app slot</p>
            </SanAppInReact>

            <div>bottom</div>
        </div>
    )
}

createRoot(document.querySelector('#main')).render(<ReactApp />)