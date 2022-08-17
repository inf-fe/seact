import { useState } from 'react'
import { defineComponent } from 'san'
import { sanInReact } from '../../lib/sanInReact'

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

const SanAppInReact = sanInReact<SanAppInReactProps>(SanApp)

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