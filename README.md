# Seact

React in San, San in React.

## 什么是 Seact

Seact 是一个工具库，可以使 React 和 San 组件相互调用对方。

## 应用场景

* 从 San 迁移至 React 或者 React 迁移至 San
* 在一个应用中同时使用 React 和 San

请注意，在针对上述应用场景的情况下，无论是 iframe 还是各种微前端的方案都是不错的选择。

只有在极其希望用粒度更小的混合方式的前提下，才建议使用 Seact。因为一旦使用 Seact，项目的工程管理难度将陡然提升。之所以一个项目要用到类似 Seact 这样的库，那么说明该项目本身就在工程管理上做的不够优秀。所以，我们建议，除非万不得已不要使用，如果使用，尽量保证粒度够大，逻辑简单清晰。

## 安装

```shell
npm i @inf-fe/seact
```

## 案例

[案例](https://github.com/inf-fe/seact/tree/main/src/example)

## 注意

* sanInReact 中，san 挂载在一个类名是 seact-san-in-react-mount-container 的 div 标签中

## TODO

* 使用styled时效果与预期不符

## License

[MIT](http://opensource.org/licenses/MIT)
