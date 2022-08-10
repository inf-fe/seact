import ReactDOM from 'react-dom/client'
// import SanInReactExample from './example/SanInReactExample'
// import './dev/san'
// import './example/ReactInSanExample'

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <SanInReactExample />
// )

// import './dev'
// import './dev/index2'
// import './dev/slot'
// import './dev/react'
// import './dev/slot2'
import demo1 from './example/ReactInSanExample'
import demo2 from './example/SanInReactExample'
import ReactInSanProps from './example/ReactInSan/props'
import ReactInSanEvent from './example/ReactInSan/event'
import ReactInSanModel from './example/ReactInSan/model'
import ReactInSanChildren from './example/ReactInSan/children'

import SanInReactProps from './example/SanInReact/props'
import SanInReactEvent from './example/SanInReact/event'
import SanInReactModel from './example/SanInReact/model'
import SanInReactSlot from './example/SanInReact/slot'

let reactRoot = null// ReactDOM.createRoot(document.getElementById('root'))
const viewPath = {
    '/demo1': demo1,
    '/demo2': demo2,
    '/react-in-san/props': ReactInSanProps,
    '/react-in-san/event': ReactInSanEvent,
    '/react-in-san/model': ReactInSanModel,
    '/react-in-san/children': ReactInSanChildren,
    '/san-in-react/props': SanInReactProps,
    '/san-in-react/event': SanInReactEvent,
    '/san-in-react/model': SanInReactModel,
    '/san-in-react/slot': SanInReactSlot
}
Object.keys(viewPath).forEach(key => {
    const a = document.createElement('a')
    a.addEventListener('click', function () {
        goto(key)
    })
    a.href = "javascript:;"
    a.innerText = key
    document.querySelector('#nav')?.appendChild(a)
})
let currentView = null
const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;
window.history.pushState = function (state, title, url) {
    originalPushState.apply(this, arguments);
    render(location.pathname)
};
window.history.replaceState = function (state, title, url) {
    originalReplaceState.apply(this, arguments);
    render(location.pathname)
};

//回退拦截
window.addEventListener('popstate', function () {
    render(location.pathname)
})
function goto(href) {
    window.history.pushState(null, null, href);
}
function render(path) {
    const App = viewPath[path]
    console.log('currentView', currentView)
    if (currentView !== null) {
        if (typeof currentView === 'function') {
            reactRoot.unmount(<currentView />)
        } else {
            currentView.dispose()

        }
    }

    if (App.prototype?.template) {
        const app = new App()
        app.attach(document.querySelector('#root'))
        currentView = app
    } else {
        reactRoot = ReactDOM.createRoot(document.getElementById('root'))
        reactRoot.render(<App />)
        currentView = App
    }

}