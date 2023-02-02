import { useState } from 'react'
import { defineComponent,Component } from 'san'
import { sanInReact } from '../../lib/sanInReact'

interface SanAppInReactProps {
    count: number
}

const SanApp = defineComponent({
    template: /*html*/`
        <div>props value:{{count}}</div>
    `
})

const SanAppInReact = sanInReact<SanAppInReactProps>(SanApp)
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