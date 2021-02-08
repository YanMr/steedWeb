### 技术栈

- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Antd-Design](https://ant.design/index-cn)
- [React](https://reactjs.org)
- [React-Router](https://reacttraining.com/react-router/)
- [React-Redux](https://react-redux.js.org)
- [Webpack](https://www.webpackjs.com)
- [ECMAScript 6](http://es6.ruanyifeng.com)
- [Babel](https://babeljs.io)

### 项目结构

```javascript
├── src                     项目主文件目录
│   ├── assets              样式图片及SVG文件
│   │   └── ...
│   ├── axios               axios请求
│   │   └── ...
│   ├── components          组件
│   │   ├── xxx.js
│   │   └── ...
│   ├── redux               redux目录
│   │   ├── actions
│   │   │   └── xxx.js
│   │   ├── constants
│   │   │   └── xxx.js
│   │   ├── reducers
│   │   │   └── xxx.js
│   │   └── store.js
│   ├── router              路由配置
│   │   ├── xxx.js
│   │   └── ...
│   ├── utils               工具
│   │   └── xxx.js
│   └── views               页面目录
│       ├── layout
│       │   │── xxx.js
│       │   └── ...
│       └── xx
│           │── xxx.js
│           └── ...
└── package.json
```

### 开始

克隆源碼

```
git clone https://github.com/YanMr/steedWeb.git
```

安裝依賴

```
cd react-antd-admin
npm i or yarn
```

调试

```
npm start
```

发布应用

```
npm run build
```

### Components

### data

| 参数         | 说明                                             | 类型                                                                               | 默认  |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------- | ----- |
| type         | 组件类型                                         | sting                                                                              | -     |
| label        | 文本                                             | sting                                                                              | -     |
| name         | 验证字段(必填)                                   | sting                                                                              | -     |
| width        | 宽度(px)                                         | sting                                                                              | -     |
| defaultValue | 指定默认选中的条目                               | [**input**/**button**]支持 string [**slelect**]支持 sting/string[]/number/number[] | -     |
| disabled     | 是否禁用                                         | boolean                                                                            | false |
| listData     | 数据源(select 可用)                              | object[]                                                                           | -     |
| icon         | 图标(button 可用)                                | sting                                                                              | -     |
| placeholder  | 描述输入字段预期值                               | sting                                                                              | -     |
| color        | 颜色(button 可用)                                | sting                                                                              | -     |
| required     | 是否校验                                         | boolean                                                                            | false |
| message      | 校验信息                                         | sting                                                                              | -     |
| submit       | 是否触发校验(类型为 button,多个 button 设置唯一) | boolean                                                                            | false |

```
[
{label: '位置：', name:'location', type: 'slelct', defaultValue: '0',  required: true, message: '请选择位置！', listData:[{value:'0',name:'全部'}, {value:'1',name:'全部1'}]},

{label: '设备状态：', name:'status', type: 'slelct', defaultValue: '0', required: true, message: '请选择设备状态', listData:[{value:'0',name:'全部'}, {value:'1',name:'在线'}, {value:'2',name:'离线'}]},

{type: 'input', name:'text', width: '300', defaultValue: '0', placeholder: '输入位置、IP地址或序列号进行搜索'},

{type: 'button', name:'search', submit: true, icon: 'icon-sousuo', color: '#4164F0', defaultValue: '搜索'},

{type: 'button', name: 'task', icon: 'icon-add', color: '#4586F3', defaultValue: '新建任务'},

{type: 'button', name: 'refresh', icon: 'icon-ai-spin', color: '#35AA53', defaultValue: '刷新'}
]
```

### operation

返回多个操作类型

根据 **name** 获取操作类型, 如果某个按钮需要触发验证， 需要设置 **submit：true**

当 submit = true 表示需要验证是否必填等信息 返回类型

{type: 'search', data:{location: "0", status: "0", text: undefined}}

其他情况

{type: 'task', data: null}

type 的值 和 button 的 name 值对应
