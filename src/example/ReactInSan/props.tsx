import { defineComponent } from 'san'
import React from 'react'
import { reactInSan } from '../../lib/reactInSan'
const ReactApp = ({ count }) => (
    <div>props value:{count}</div>
)
export default defineComponent({
    template:/*html*/`
        <div>
            <h1>react in san:props</h1>
            <react-app count="{{count}}"/>
            <button on-click="add">+1</button>
        <div>
    `,
    components: {
        'react-app': reactInSan(ReactApp)
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