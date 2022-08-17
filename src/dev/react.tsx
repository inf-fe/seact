import ReactDOM from 'react-dom/client'
import React, { useState } from 'react'
import san from 'san'
import { reactInSan } from '../lib/reactInSan'

const ReactApp = ({ children }) => {
    console.log('children', children)
    return (
        <div>children:{children}</div>
    )
}
const ReactAppInSan = reactInSan(ReactApp)
const SanApp2 = san.defineComponent({
    template: /* html */`
        <p><slot/></p>
    `
})
const SanApp = san.defineComponent({
    template:/*html*/`
        <div>
            <react-app-in-san>
                <input value="{=value=}"/>
                <input value="{{value}}"/>
            </react-app-in-san>
            <div>{{value}}</div>
            <button on-click="count">+1</button>
        </div>
    `,
    initData() {
        return {
            value: 'defaultValue'
        }
    },
    // updated(){
    //     console.log('update')
    // },
    components: {
        'react-app-in-san': ReactAppInSan
    },
    count() {
        this.data.set('value', this.data.get('value') + 1)
    }
})
const sanApp = new SanApp()
sanApp.attach(document.querySelector('#root'))

// const ReactApp2 = () => {
//     return (
//         <ReactApp>children???</ReactApp>
//     )
// }
// ReactDOM.createRoot(document.querySelector('#root')).render(<ReactApp2/>)

// const SanApp4=san.defineComponent({
//     template: /* html */`
//         <input/>
//     `
// })
// const SanApp3 = san.defineComponent({
//     template: /* html */`
//         <div>1:<sss/></div>
//     `,
//     components:{
//         sss:SanApp4
//     }
// })
// const sanApp3 = new SanApp3()
// sanApp3.attach(document.querySelector('#root'))