import { useState } from 'react'
import { defineComponent } from 'san'
import { sanInReact } from '../../lib/sanInReact'

const SanApp = defineComponent({
    template: /*html*/`
        <div><slot/><slot name="slot"/></div>
    `,
})
const SanAppInReact = sanInReact(SanApp)
const ReactApp = () => {
    const [count, setCount] = useState(1)
    return (
        <>
            <h1>san in react:slot</h1>
            <button onClick={() => setCount(v => v + 1)}>+1</button>
            <SanAppInReact>
                <div>{count}</div>
            </SanAppInReact>
            <SanAppInReact>
                {{
                    default: <div>default:{count}</div>,
                    slot: <div>slot:{count}</div>,
                }}
            </SanAppInReact>
        </>
    )
}
export default ReactApp
