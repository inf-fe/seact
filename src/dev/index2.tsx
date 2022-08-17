import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import san from 'san'
import { sanInReact } from '../lib/sanInReact'

const SanApp = san.defineComponent({
    template:/*html*/`
        <div>
            <p>san app</p>
            <button on-click="add">+1</button>
            <div>value:{{value}}</div>
        </div>
    `,
    add() {
        this.fire('add', this.data.get('value') + 1)
    }
})
const SanApp2 = san.defineComponent({
    template:/*html*/`
        <div>
            <p>san app 2</p>
            <input value="{=value=}"/>
        </div>
    `,
})
const SanAppInReact = sanInReact(SanApp)
const SanAppInReact2 = sanInReact(SanApp2)

function ReactApp() {
    const [value, setValue] = useState(10)
    const handleChange = (e) => {
        console.log('e', e)
        setValue(e.target.value)
    }
    return (
        <div>
            <p>react app</p>
            {/* <div>value:{value}</div> */}

            {/* <SanAppInReact value={value} onAdd={setValue} /> */}
            <input value={value} onChange={handleChange}></input>
            <SanAppInReact2 sModels={{
                value: [value, setValue]
            }} />
            <div>bottom</div>
        </div>
    )
}

createRoot(document.querySelector('#main')).render(<ReactApp />)