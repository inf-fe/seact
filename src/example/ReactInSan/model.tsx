import { defineComponent } from 'san'
import React from 'react'
import { ReactInSan } from '../../lib/ReactInSan'

const ReactApp = ({ count, countChange }) => {
    return (
        <input value={count} onChange={(e) => countChange(e.target.value)}></input>
    )
}
export default defineComponent({
    template:/*html*/`
        <div>
            <h1>react in san:model</h1>
            <react-app count="{=count=}"/>
            <div>count:{{count}}</div>
            <button on-click="add">+1</button>
        <div>
    `,
    components: {
        'react-app': ReactInSan(ReactApp)
    },
    initData() {
        return {
            count: 1
        }
    },
    add() {
        this.data.set('count', this.data.get('count') + 1)
    }
})