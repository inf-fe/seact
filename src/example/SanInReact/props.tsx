import { useState } from 'react'
import { defineComponent } from 'san'
import { SanInReact } from '../../lib/SanInReact'

interface SanAppInReactProps{
    count: number
}

const SanApp = defineComponent({
    template: /*html*/`
        <div>props value:{{count}}</div>
    `
})
const SanAppInReact = SanInReact<SanAppInReactProps>(SanApp)
const ReactApp = () => {
    const [count, setCount] = useState(1)
    return (
        <>
            <h1>san in react:props</h1>
            <SanAppInReact count={count}/>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    )
}
export default ReactApp