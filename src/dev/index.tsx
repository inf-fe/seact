import san from 'san'
import { reactInSan } from '../lib/reactInSan'

const ReactApp = ({ propsValue, propsValueChange }) => {
    return (
        <div>
            <p>react app</p>
            <div>props value:{propsValue}</div>
            <input onChange={propsValueChange} value={propsValue} />
        </div>
    )
}
const ReactApp2 = ({ count, countChange }) => {
    return (
        <div>
            <p>react app2</p>
            <div>props count:{count}</div>
            <input value={count} onChange={e => countChange(e.target.value)}></input>
        </div>
    )
}
const ReactAppInSan = reactInSan(ReactApp)
const ReactAppInSan2 = reactInSan(ReactApp2)
const SanApp = san.defineComponent({
    template:/*html*/`
        <div>
            <!-- <p>parent value:{{value}}</p> -->
            <!-- <react-app-in-san props-value="{{value}}" props-value-change="propsValueChange"/> -->

            <p>parent count.vlaue:{{count.value}}</p>
            <react-app-in-san2 count="{=count.value=}"/>
        </div>
    `,
    initData() {
        return {
            value: 'defaultValue',
            count: {
                value: 111
            }
        }
    },
    components: {
        'react-app-in-san': ReactAppInSan,
        'react-app-in-san2': ReactAppInSan2
    },
    propsValueChange(e) {
        this.data.set('value', e.target.value)
    }
})
const sanApp = new SanApp()

sanApp.attach(document.querySelector('#main'))