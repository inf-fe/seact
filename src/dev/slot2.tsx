import san from 'san'
import ReactDOM from 'react-dom/client'
import { ReactInSan } from '../lib/ReactInSan'

function getChildrenANode(children) {
    return children.map(v => v.aNode)
}

function GenerateComponent() {
    return san.defineComponent({
        name: 'child',
        template: '<template><slot/></template>',
        attached() {
            console.log(this)
            const self = this
            const InputC = san.defineComponent({
                name: 'input',
                aNode: this.children[0].aNode, // ? 低版本可能不支持根元素有多个
                filters: this.parentComponent.filters,
                components: this.parentComponent.components,
                // computed: self.parentComponent.computed,
                // template: '<template><slot/></template>',
                // template: '<input value="{=value=}"/>'
            })
            console.log(' self.children[0].children[1].scope', self.children[0].children[1].scope)
            // ? 这种是最完善的方法，不用手动维护作用域之类的的东西，但是声明数据关系有点复杂
            // TODO 暂时只从data里取
            const source = {
                directives: {},
                props: Object.keys(this.parentComponent.data.get()).map((key) => {
                    return {
                        name: key,
                        expr: {
                            type: 4,
                            paths: [
                                {
                                    type: 1,
                                    value: key
                                }
                            ]
                        },
                        x: 1 // 全都双向了
                    }
                }),
                events: [],
                children: [],
                tagName: "x-app"
            }
            console.log('data', this.parentComponent.data.get())
            const inputC = new InputC({
                owner: this.parentComponent,
                source
                // data: self.children[0].children[1].scope
            })

            // const self = this
            // console.log('this', this)
            // console.log(this.children[0].children[0])
            // const inputANode = this.children[0].children[0].aNode
            // const InputC = san.defineComponent({
            //     name: 'input',
            //     aNode: inputANode,
            //     updated() {
            //         console.log('input updated')
            //     },
            //     initData() {
            //         return self.children[0].children[0].scope.get()
            //     },
            // })
            // const inputC = new InputC({
            //     // owner: self.parentComponent
            //     // data: this.children[0].children[0].scope.get()
            // })
            // console.log('inputC', inputC)

            // this.children[0].children.push(inputC)
            inputC.attach(this.el)

            // 监听父组件的更新
            // const originFn = this.parentComponent.updated || function () { }
            // this.parentComponent.updated = (...args) => {
            //     console.log('update from children')
            //     originFn.call(this.parentComponent, ...args)
            //     inputC.data.assign(self.children[0].children[0].scope.get())
            // }
        },
        updated() {
            console.log('updated')
        }
    })
}
const SanApp2 = san.defineComponent({
    template: '<div>222:<slot/></div>',
})
const Child = ({ children, value }) => {
    return <div>Children:{value}:{children}</div>
}
const SanApp3 = san.defineComponent({
    template: /* html */`
        <input type="file">
    `
})
// const SanAppNew = GenerateComponent()
const SanAppNew = ReactInSan(Child)
const SanApp = san.defineComponent({
    name: 'parent',
    template: /*html*/`
        <div>
            san:
            <div>------</div>
            <san-app-new value="{{obj.value}}">
                <div>
                    <input value="{=obj.value=}"/>
                    <div>
                        <div>{{value | fil}},{{comValue}}</div>
                    </div>
                    <san-app-3/>
                </div>
            </san-app-new>
            <div>------</div>
            <button on-click="add">+1</button>
        </div>
    `,
    components: {
        'san-app-new': SanAppNew,
        'san-app-3': SanApp3,
    },
    initData() {
        return {
            value: 1,
            obj: {
                value: 1
            }
        }
    },
    add() {
        this.data.set('obj.value', this.data.get('obj.value') + 1)
    },
    filters: {
        fil(val) {
            return val + 'fil'
        }
    },
    computed: {
        comValue() {
            return this.data.get('obj.value') + 'computed'
        }
    }
})
const sanApp = new SanApp()
sanApp.attach(document.querySelector('#root'))

// const R1 = ({ value, onChange }) => {
//     return (
//         <input value={value} onChange={onChange}></input>
//     )
// }
// const R2 = ({ children }) => {
//     return (
//         <div>
//             {children}
//         </div>
//     )
// }
// const R3 = () => {
//     return (
//         <R2>
//             <R1></R1>
//         </R2>
//     )
// }
// ReactDOM.createRoot(document.querySelector('#main')).render(<R3/>)