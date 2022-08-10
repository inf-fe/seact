import { useState } from 'react'
import { defineComponent } from 'san'
import { SanInReact } from '../../lib/SanInReact'

interface SanAppInReactProps {
    onClick: () => void
}
const SanApp = defineComponent({
    template: /*html*/`
        <button on-click="add">+1</button>
    `,
    add() {
        this.fire('click')
    }
})

const SanAppInReact = SanInReact<SanAppInReactProps>(SanApp)

const ReactApp = () => {
    const [count, setCount] = useState(1)
    return (
        <>
            <h1>san in react:event</h1>
            <div>{count}</div>
            <SanAppInReact onClick={() => setCount(v => v + 1)} />
        </>
    )
}
export default ReactApp