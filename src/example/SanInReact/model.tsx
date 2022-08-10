import { useState } from 'react'
import { defineComponent } from 'san'
import { SanInReact } from '../../lib/SanInReact'

const SanApp = defineComponent({
    template: /*html*/`
        <input value="{=count=}"/>
    `,
})
const SanAppInReact = SanInReact(SanApp)
const ReactApp = () => {
    const [count, setCount] = useState(1)
    return (
        <>
            <h1>san in react:model</h1>
            <SanAppInReact sModels={{
                count: [count, setCount]
            }} />
            <div>count:{count}</div>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    )
}
export default ReactApp