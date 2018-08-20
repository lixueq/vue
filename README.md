# admin-vue-41

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

- 电商管理系统
- 业务
- 技术
- 业务 + 技术 如何结合的
- 代码规范、洁癖都是锦上添花
- git 分支
  - 拉取分支、合并代码，推送分支，

用于管理电商后台：

- 商品

- 用户

- 操作权限

- 订单

- 数据统计

- 简短描述项目是做什么的，用来解决什么问题，使用用户。

  - 电商内部人员：运营。

- 管理系统

- 单页面应用程序（SPA）

  - 啥是单页面

  - 单页面有啥好处？

    - 交互体验好
    - 无刷新，响应快
    - 好维护
    - 缺点：不利于 SEO
    - 目前的电商前台不可能做成单页面

    一般的单页面都是出现在管理系统 + 移动APP（用 Web 做的移动端）

    有没有办法解决单页面不利于 SEO 的问题？

    ​	服务端渲染

    [Vue Server Render](https://ssr.vuejs.org/zh/)

    技术不成熟，技术爱好者会拿来去用一下。

    项目使用 JavaScript Standard Style 代码规范，使用 ESLint 帮助代码规范强制校验，保证了项目的代码质量。

    有代码洁癖。

    保持匠人的态度。

    本人有轻度代码洁癖。

    能折腾，喜欢玩儿。

    - 使用 ECMAScript 6 编码语言
    - 使用 Promise + async 保证了异步代码的可读性

## 技术栈

- [Vue](https://cn.vuejs.org/)
  - Vue 框架
  - MVVM 数据驱动视图
  - 无 DOM 操作
  - 效率高
  - 可以用来开发单页面
  - 简单易上手
- [Vue Router](https://router.vuejs.org/)
  - 路由
  - 单页面视图导航
  - 导航守卫
  - 拦截视图导航
    - 看一下有没有 token
- [axios](https://github.com/axios/axios)
  - http 请求
  - 拦截器
  - 请求拦截器
    - 为需要授权的 API 接口统一加 Token
  - 响应拦截器
    - 统一处理 403、401、500 状态码
- [Element UI](https://element.eleme.io/)
  - UI 组件库
  - 对话框
  - 分页
  - 表格
  - 面包屑
  - 优先找第三方的
  - 自己写
    - Element 没有表格树组件
    - 自己写了一个表格树组件
      - 组件通信
        - props down
        - events up
  - 基于它的基础之上再做业务组件封装
- [webpack](https://webpack.js.org/)
  - 核心：模块化打包
  - 让浏览器 JavaScript 拥有了模块化的能力
  - css
  - img
  - fonts
  - es6 转 es5（babel）
  - less 转 css（less编译器）
  - sass（sass 编译器）
- [Babel](https://babeljs.io/)
  - es6 转 es5
  - 保证使用新的语法还不用担心低版本浏览器兼容问题
- [ESLint](https://eslint.org/)
  - 多人开发每个人的代码风格都不一样
  - 团队需要约束，保证代码质量
  - ESLint 帮我们做代码规范校验
  - JavaScript Stand Style
- [Vue CLI](https://github.com/vuejs/vue-cli)
  - 自己搭建 webpack 比较麻烦
  - 所以使用 VUE CLI 脚手架工具，基于 webpack 模板快速初始化项目
- [ECMAScript 6](https://www.ecma-international.org/ecma-262/6.0/)
  - let、const
  - 模板字符串
  - 解构赋值
  - 对象展开、数组展开
  - 模块化
  - 箭头函数
  - async 函数
- [Vue Loader](https://vue-loader.vuejs.org/)
  - 打包 .vue 单文件组件
  - 组件书写细则
  - 组件可以划分到多个文件中。
  - 在 .vue 组件中可以使用css预处理器（less、sass ）
- [Less](https://sass-lang.com/)
- [ECharts](http://echarts.baidu.com/)
  - 数据统计

## Todos（你负责的业务模块）

### 用户登陆

如何做登陆权限认证？

- 基于 Token 的权限认证
  - 用户名 + 密码
  - 获取 token
  - 把 token 放到了本地存储
  - 客户端使用路由拦截器来校验 token 从而拦截视图导航
  - 服务器校验 token 来授权
  - 还使用了 axios 响应拦截器对 401 做了 token 无效判断，我们会让用户重新登陆获取授权
  - 画图


- 用户
- 退出

### 用户管理

- [x] 用户列表
- [x] 用户列表搜索
- [x] 添加用户
- [x] 编辑用户
- [x] 删除用户
- [x] 修改用户状态
- [x] 用户角色分配

### 权限管理

你觉得项目中最难的是什么？

业务：

- 用户
  - 一个用户对应一个角色
  - 不同用户登陆管理系统可以执行不同的操作
  - 不同用户看到的菜单不一样
  - 不同用户执行的操作也不一样，例如有的用户只能查看列表，。不能做新增操作
- 角色
  - 一个角色有多种操作权限
  - tree 组件树
    - 取值
    - 赋值
    - 处理
  - 带有结构的层级标签
- 权限
  - 三级权限
  - 递归展示菜单
  - 递归获取数据

实现流程：

- [X] 权限列表
- [X] 角色列表
- [X] 添加角色
- [X] 编辑角色
- [X] 删除角色
- [X] 查看角色权限列表
- [X] 删除角色指定权限
- [X] 角色授权

### 商品管理

- 递归表格树组件
- 封装商品分类级联选择器业务组件
- 添加商品
  - 基本信息
  - 图片商品
  - 富文本编辑器


- [x] 商品分类列表
- [x] 添加分类
- [X] 编辑分类
- [X] 删除分类
- [X] 分类参数列表
- [X] 添加分类参数
- [X] 添加分类参数标签
- [X] 删除分类参数标签
- [X] 商品列表
- [ ] 商品列表搜索
- [ ] 添加商品
- [ ] 编辑商品
- [ ] 删除商品

### 订单管理

- 调用物流接口查看订单物流信息


- [ ] 订单列表
- [ ] 订单列表搜索
- [ ] 编辑订单
- [ ] 查看订单物流信息

### 数据统计模块

- 主要使用 echarts 图标展示


- [ ] 用户来源统计
- [ ] 每日用户行为统计
