# 信息收集工具支持低版本浏览器

背景：在开发信息收集工具并投入使用后，根据现场技服同事的反馈，该工具在低版本的谷歌浏览器中不支持，会出现样式错乱的情况，基于此对低版本浏览器的兼容问题进行开发。

项目配置：信息收集工具前端采用react+ant Design组件库（简称antd）+webpack进行搭建

兼容低版本浏览器主要分以下三个模块：

## 一、低版本浏览器ES6语法兼容

低版本的浏览器通常不支持或仅部分支持ES6（ECMAScript 2015）及之后版本的JavaScript新特性。ES6引入了许多新的语法和功能，例如箭头函数、类、模板字符串、Promise、let和const等，这些在旧版浏览器中可能不被识别。

需要在webpack配置中配置babel，babel可以将新的JavaScript语法转换为浏览器能够理解的旧语法，这样即使在不支持ES6的浏览器中，代码也能正常执行。

#### 1、安装Babel的核心库以及必要的插件

`npm install --save-dev @babel/core @babel/preset-env babel-loader`

值得注意的是插件版本的适配问题，否则可能会报错。

#### 2、配置babel

新建babel.config.js配置文件，配置babel的预设：

```
module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [['@babel/plugin-transform-runtime']]
 };
```

#### 3、配置webpack

在`webpack.config.js`文件中，对webpack进行配置，添加`module`规则来处理`.jsx`、`.tsx`、`.js`文件，对他们使用`babel-loader`进行转换：

```
  module.exports = {
     //其他配置
     module: {
       rules: [
         {
           test: /\.js$/, // 匹配.js文件
           exclude: /node_modules/, // 排除node_modules目录下的文件
           use: {
             loader: 'babel-loader',
           },
         },
         {
           test: /\.tsx?$/, // 匹配.ts 和 .tsx 文件
           exclude: /node_modules/, // 排除node_modules目录下的文件
           use: {  // 使用babel-loader处理TypeScript和JSX语法
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-react', '@babel/preset-env']
            }
          }
         },
         {
           test: /\.jsx?$/, // 匹配.js和.jsx文件
           exclude: /node_modules/, // 排除node_modules目录下的文件
           use: {
             loader: 'babel-loader',
             options: {
              // Babel的配置选项
               presets: ['@babel/preset-react', '@babel/preset-env'],
               plugins: [['@babel/plugin-transform-runtime']]
             }
           }
         }
       ],
     },
   };
```

## 二、ant Design组件库兼容

开发信息收集工具为了适配使用的react框架，选择Ant Design组件库。其中Ant Design V5 是截止目前 Ant Design 组件库最新版本。 Ant Design V5 组件的样式中大量使用了 :where() 选择器降低 CSS Selector 优先级，以减少用户升级时额外调整自定义样式的成本。而:where语法的兼容性在低版本浏览器比较差。对于 Chrome 和 Edge浏览器版本仅支持 88版本以上，因此低版本浏览器就无法正确显示组件样式。

对于此样式兼容问题，主要解决思路如下：

### 1、移除掉 :where() 选择器

首先参照官方样式兼容文档，使用其提供的降级方案，移除掉 :where() 选择器。主要是通过 Context 为组件传入配置，关闭降低样式优先级的配置，以此移除 :where() 选择器。可以使用 `@ant-design/cssinjs` 取消默认的降权操作（请注意版本保持与 antd 一致)。切换后样式将从:where切换为类选择器。

```
//index.tsx文件
import { StyleProvider, legacyLogicalPropertiesTransformer} from '@ant-design/cssinjs';
ReactDOM.createRoot(document.getElementById('root')).render(
// `hashPriority` 默认为 `low`，配置为 `high` 后，会移除 `:where` 选择器封装
  <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
    <MyApp/>
  </StyleProvider>
);
```

### 2、Hooks 调用组件

其次针对无法接收Context的场景，比如在项目中使用 Message、Modal 和 Notification 组件，则需要避免静态调用形式，采用官方推荐的 Hook 调用形式，可以通过 App 包裹组件完成此操作。比如Message组件，通过 `message.useMessage` 创建支持读取 context 的 `contextHolder`。通过顶层注册的方式代替 `message` 静态方法，因为静态方法无法消费上下文，因而 ConfigProvider 的数据也不会生效。

```
import { message } from 'antd';
const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info('Hello, Ant Design!');
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={info}>
        Display normal message
      </Button>
    </>
  );
};

export default App;
```

### 3、非组件内调用使用Redux

Hook 调用形式只能在组件使用，业务场景上常常需要在非组件内调用相关，比如在请求的响应拦截器中调用 Message 或Notification组件实现错误提示。对于在非组件调用可以通过Redux 数据全局共享与通信方案，在相关逻辑中（例如响应拦截器中）通知组件调用 Notification，从而实现此需求。

#### 1）、封装NotificationAlert组件

当要触发通知的时候通过该组件来触发相关的提示

```
import {useEffect} from "react";
import {App} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import { getnotificationInfo } from '@/store/selector'

function NotificationAlert() {
  const {notification } = App.useApp();
  const notificationInfo = useSelector(getnotificationInfo);
  useEffect(() => {
    const {type, content} = notificationInfo;
    if (notification && content) {
      switch (type) {
        case "success":
            notification.success(content);
          break;
        case "error":
            notification.error(content);
          break;
        case "warning":
            notification.warning(content);
          break;
        case "info":
            notification.info(content);
          break;
        default:
            notification.error(content);
          break;
      }
    }
  }, [notification, notificationInfo]);

  return null;
}

export default NotificationAlert;
```

#### 2）、全局注册通知提示组件

```
//App.tsx
import NotificationAlert from './components/NotificationAlert/index.tsx';

export default function App(){
  useEffect(()=>{
    store.dispatch(clearNotificationInfo())
  },[])
  return(
    // Suspense 包裹路由组件，防止路由页面懒加载时，js未请求完成，渲染页面报错
    <Suspense  >
       <RouterProvider router={router}></RouterProvider>
       <NotificationAlert></NotificationAlert>
    </Suspense>
  )
}
```

#### 3）、设置redux相关配置

```
import { createSlice } from '@reduxjs/toolkit';

export  interface contentType {
    key: string,
    message: string,
    description: string,
    duration: number
}

export interface NotificationInfoType {
    type: 'success' | 'error' | 'info' | 'warning'|'';
    content?: contentType;
}

export interface GlobalState {
    notificationInfo: NotificationInfoType;
}

const defaultValue: GlobalState = {
    notificationInfo: {
        type: '',
    }
};

export const global = createSlice({
    name: 'global',
    initialState: { ...defaultValue },
    reducers: {
        savenotificationInfo: (state, action:  { payload: GlobalState }) => {
            state.notificationInfo = { ...action.payload.notificationInfo };
        },
        clearNotificationInfo(state){
            Object.assign(state, {...defaultValue});
        }
    },
});
export const { savenotificationInfo,clearNotificationInfo } = global.actions;
export default global.reducer;
```

#### 4）、请求拦截器内调用相关action实现通知提醒

```
import { savenotificationInfo } from '@/store/reducers/globalSlice';

//其他配置

// 响应拦截
http.interceptors.response.use(
  (response) => {
    //其他配置
    store.dispatch(
      savenotificationInfo({
        notificationInfo: {
          type: 'error',
          content: {
            key: url,
            message: '请求出错',
            description: responseData.message,
            duration: 3
          }
        }
      })
    );
    return Promise.reject(responseData.message);
  },
  (err) => {
    console.log(err);
    const httpCode = err.response.status;
    if (httpCode === REQUEST_UNAUTHORIZED_CODE) {
      store.dispatch(
        savenotificationInfo({
          notificationInfo: {
            type: 'error',
            content: {
              key: '',
              message: '认证信息失效，请重新登陆',
              description: err.response.message,
              duration: 3
            }
          }
        })
      );
      Navigate({ to: '/login' });
    } else {
      store.dispatch(
        savenotificationInfo({
          notificationInfo: {
            type: 'error',
            content: {
              key: '',
              message: httpCode,
              description: err.config.url + ':' + (err.response.data.message || err.message),
              duration: 3
            }
          }
        })
      );
    }
    return Promise.reject(err);
  }
);

export default http;
```

到此为止就解决了antd组件库兼容低版本浏览器，在开发环境验证成功。但是在生产环境中低版本浏览器中样式仍然错乱。查看antd官方文档，发现在服务端渲染样式的话还需要进行进一步处理。 

## 三、服务端渲染兼容

官方文档提供了两种方案：

- **内联样式**：在渲染时无需额外请求样式文件，好处是减少额外的网络请求，缺点则是会使得 HTML 体积增大，影响首屏渲染速度。
- **整体导出**：提前烘焙 antd 组件样式为 css 文件，在页面中时引入。好处是打开任意页面时如传统 css 方案一样都会复用同一套 css 文件以命中缓存，缺点是如果页面中存在多主题，则需要额外进行烘焙。

出于性能考虑，在信息收集工具，我们采用整体导出的方式。

1、安装依赖

```
npm install ts-node tslib cross-env --save-dev
```

2、新增 `tsconfig.node.json` 文件

```
{
  "compilerOptions": {
    "strictNullChecks": true,
    "module": "NodeNext",
    "jsx": "react",
    "esModuleInterop": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

3、新增 `scripts/genAntdCss.tsx` 文件

```
// scripts/genAntdCss.tsx
const fs = require('fs');;
const { extractStyle } = require('@ant-design/static-style-extract');

const outputPath = './public/antd.min.css';

const css = extractStyle();

fs.writeFileSync(outputPath, css);
```

4、配置webpack执行上述脚本，会在指定的目录下直接生成一个全量的antd.min.css文件

首先要安装WebpackShellPluginNext插件，它可以帮助我们在Webpack 构建过程前后执行自定义脚本。

（若webpack是5以上版本则需要安装2以上版本的WebpackShellPluginNext插件，若webpack是4以上版本则需要安装1以上版本的WebpackShellPluginNext插件，否则会因为版本不兼容而导致报错）

```
module.exports = {
    plugins:[
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: [    
          'cross-env NODE_ENV=development ts-node --project ./tsconfig.node.json ./scripts/genAntdCss.tsx',
          'cross-env NODE_ENV=production ts-node --project ./tsconfig.node.json ./scripts/genAntdCss.tsx'
        ],
        blocking: true,
        parallel: false
      },
    }),
    ]
}
```

自此在生产环境，antd也支持低版本浏览器了。