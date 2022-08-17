import { defineComponent } from 'san'
import React from 'react'
import { reactInSan } from '../../lib/reactInSan'
function ReactApp({ children }) {
    return (
        <div>
            children:{children}
        </div>
    )
}
type obj = {
    key: string;
    value: number;
}
export default defineComponent({
    template:/*html*/`
        <div>
            <h1>react in san:children</h1>
            <button on-click="add">+1</button>
            <react-app>
                <div>{{count}}</div>
            </react-app>
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