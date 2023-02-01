# CHANGELOG

## 0.4.1(2023-2-1)

bug fixed

* 修复 sanInReact 中，san 组件在 inited、attached 等初始化相关生命周期无法获取 props 的 bug
* 修改 event 注册的方式

## 0.4.0(2023-1-31)

bug fixed

* 修改 react 和 san 的依赖为 peer

## 0.2.2(2022-8-17)

feature

* 优化打包体积，lodash 不用的函数 shaking 掉

## 0.2.1(2022-8-17)

bug fixed

* 错误引用了 react-dom 而不是 react-dom/client

## 0.2.0(2022-8-17)

breaking chagnes

* 修改导出函数名

bug fixed

* 补全类型
