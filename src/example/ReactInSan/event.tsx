import { defineComponent } from 'san'
import React from 'react'
import { ReactInSan } from '../../lib/ReactInSan'

const ReactApp = ({ onClick }) => (
    <button onClick={onClick}>+1</button>
)
export default defineComponent({
    template:/*html*/`
        <div>
            <h1>react in san:event</h1>
            <div>{{count}}</div>
            <react-app on-click="add"/>
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