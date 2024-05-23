import{_ as s,c as n,o as a,a1 as p}from"./chunks/framework.B2LAFC3B.js";const g=JSON.parse('{"title":"信息收集工具支持低版本浏览器","description":"","frontmatter":{},"headers":[],"relativePath":"2024/antd.md","filePath":"2024/antd.md"}'),e={name:"2024/antd.md"},l=p(`<h1 id="信息收集工具支持低版本浏览器" tabindex="-1">信息收集工具支持低版本浏览器 <a class="header-anchor" href="#信息收集工具支持低版本浏览器" aria-label="Permalink to &quot;信息收集工具支持低版本浏览器&quot;">​</a></h1><p>背景：在开发信息收集工具并投入使用后，根据现场技服同事的反馈，该工具在低版本的谷歌浏览器中不支持，会出现样式错乱的情况，基于此对低版本浏览器的兼容问题进行开发。</p><p>项目配置：信息收集工具前端采用react+ant Design组件库（简称antd）+webpack进行搭建</p><p>兼容低版本浏览器主要分以下三个模块：</p><h2 id="一、低版本浏览器es6语法兼容" tabindex="-1">一、低版本浏览器ES6语法兼容 <a class="header-anchor" href="#一、低版本浏览器es6语法兼容" aria-label="Permalink to &quot;一、低版本浏览器ES6语法兼容&quot;">​</a></h2><p>低版本的浏览器通常不支持或仅部分支持ES6（ECMAScript 2015）及之后版本的JavaScript新特性。ES6引入了许多新的语法和功能，例如箭头函数、类、模板字符串、Promise、let和const等，这些在旧版浏览器中可能不被识别。</p><p>需要在webpack配置中配置babel，babel可以将新的JavaScript语法转换为浏览器能够理解的旧语法，这样即使在不支持ES6的浏览器中，代码也能正常执行。</p><h4 id="_1、安装babel的核心库以及必要的插件" tabindex="-1">1、安装Babel的核心库以及必要的插件 <a class="header-anchor" href="#_1、安装babel的核心库以及必要的插件" aria-label="Permalink to &quot;1、安装Babel的核心库以及必要的插件&quot;">​</a></h4><p><code>npm install --save-dev @babel/core @babel/preset-env babel-loader</code></p><p>值得注意的是插件版本的适配问题，否则可能会报错。</p><h4 id="_2、配置babel" tabindex="-1">2、配置babel <a class="header-anchor" href="#_2、配置babel" aria-label="Permalink to &quot;2、配置babel&quot;">​</a></h4><p>新建babel.config.js配置文件，配置babel的预设：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>    presets: [&#39;@babel/preset-env&#39;],</span></span>
<span class="line"><span>    plugins: [[&#39;@babel/plugin-transform-runtime&#39;]]</span></span>
<span class="line"><span> };</span></span></code></pre></div><h4 id="_3、配置webpack" tabindex="-1">3、配置webpack <a class="header-anchor" href="#_3、配置webpack" aria-label="Permalink to &quot;3、配置webpack&quot;">​</a></h4><p>在<code>webpack.config.js</code>文件中，对webpack进行配置，添加<code>module</code>规则来处理<code>.jsx</code>、<code>.tsx</code>、<code>.js</code>文件，对他们使用<code>babel-loader</code>进行转换：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  module.exports = {</span></span>
<span class="line"><span>     //其他配置</span></span>
<span class="line"><span>     module: {</span></span>
<span class="line"><span>       rules: [</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>           test: /\\.js$/, // 匹配.js文件</span></span>
<span class="line"><span>           exclude: /node_modules/, // 排除node_modules目录下的文件</span></span>
<span class="line"><span>           use: {</span></span>
<span class="line"><span>             loader: &#39;babel-loader&#39;,</span></span>
<span class="line"><span>           },</span></span>
<span class="line"><span>         },</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>           test: /\\.tsx?$/, // 匹配.ts 和 .tsx 文件</span></span>
<span class="line"><span>           exclude: /node_modules/, // 排除node_modules目录下的文件</span></span>
<span class="line"><span>           use: {  // 使用babel-loader处理TypeScript和JSX语法</span></span>
<span class="line"><span>            loader: &#39;babel-loader&#39;,</span></span>
<span class="line"><span>            options: {</span></span>
<span class="line"><span>              presets: [&#39;@babel/preset-typescript&#39;, &#39;@babel/preset-react&#39;, &#39;@babel/preset-env&#39;]</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>         },</span></span>
<span class="line"><span>         {</span></span>
<span class="line"><span>           test: /\\.jsx?$/, // 匹配.js和.jsx文件</span></span>
<span class="line"><span>           exclude: /node_modules/, // 排除node_modules目录下的文件</span></span>
<span class="line"><span>           use: {</span></span>
<span class="line"><span>             loader: &#39;babel-loader&#39;,</span></span>
<span class="line"><span>             options: {</span></span>
<span class="line"><span>              // Babel的配置选项</span></span>
<span class="line"><span>               presets: [&#39;@babel/preset-react&#39;, &#39;@babel/preset-env&#39;],</span></span>
<span class="line"><span>               plugins: [[&#39;@babel/plugin-transform-runtime&#39;]]</span></span>
<span class="line"><span>             }</span></span>
<span class="line"><span>           }</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>       ],</span></span>
<span class="line"><span>     },</span></span>
<span class="line"><span>   };</span></span></code></pre></div><h2 id="二、ant-design组件库兼容" tabindex="-1">二、ant Design组件库兼容 <a class="header-anchor" href="#二、ant-design组件库兼容" aria-label="Permalink to &quot;二、ant Design组件库兼容&quot;">​</a></h2><p>开发信息收集工具为了适配使用的react框架，选择Ant Design组件库。其中Ant Design V5 是截止目前 Ant Design 组件库最新版本。 Ant Design V5 组件的样式中大量使用了 :where() 选择器降低 CSS Selector 优先级，以减少用户升级时额外调整自定义样式的成本。而:where语法的兼容性在低版本浏览器比较差。对于 Chrome 和 Edge浏览器版本仅支持 88版本以上，因此低版本浏览器就无法正确显示组件样式。</p><p>对于此样式兼容问题，主要解决思路如下：</p><h3 id="_1、移除掉-where-选择器" tabindex="-1">1、移除掉 :where() 选择器 <a class="header-anchor" href="#_1、移除掉-where-选择器" aria-label="Permalink to &quot;1、移除掉 :where() 选择器&quot;">​</a></h3><p>首先参照官方样式兼容文档，使用其提供的降级方案，移除掉 :where() 选择器。主要是通过 Context 为组件传入配置，关闭降低样式优先级的配置，以此移除 :where() 选择器。可以使用 <code>@ant-design/cssinjs</code> 取消默认的降权操作（请注意版本保持与 antd 一致)。切换后样式将从:where切换为类选择器。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//index.tsx文件</span></span>
<span class="line"><span>import { StyleProvider, legacyLogicalPropertiesTransformer} from &#39;@ant-design/cssinjs&#39;;</span></span>
<span class="line"><span>ReactDOM.createRoot(document.getElementById(&#39;root&#39;)).render(</span></span>
<span class="line"><span>// \`hashPriority\` 默认为 \`low\`，配置为 \`high\` 后，会移除 \`:where\` 选择器封装</span></span>
<span class="line"><span>  &lt;StyleProvider hashPriority=&quot;high&quot; transformers={[legacyLogicalPropertiesTransformer]}&gt;</span></span>
<span class="line"><span>    &lt;MyApp/&gt;</span></span>
<span class="line"><span>  &lt;/StyleProvider&gt;</span></span>
<span class="line"><span>);</span></span></code></pre></div><h3 id="_2、hooks-调用组件" tabindex="-1">2、Hooks 调用组件 <a class="header-anchor" href="#_2、hooks-调用组件" aria-label="Permalink to &quot;2、Hooks 调用组件&quot;">​</a></h3><p>其次针对无法接收Context的场景，比如在项目中使用 Message、Modal 和 Notification 组件，则需要避免静态调用形式，采用官方推荐的 Hook 调用形式，可以通过 App 包裹组件完成此操作。比如Message组件，通过 <code>message.useMessage</code> 创建支持读取 context 的 <code>contextHolder</code>。通过顶层注册的方式代替 <code>message</code> 静态方法，因为静态方法无法消费上下文，因而 ConfigProvider 的数据也不会生效。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { message } from &#39;antd&#39;;</span></span>
<span class="line"><span>const App: React.FC = () =&gt; {</span></span>
<span class="line"><span>  const [messageApi, contextHolder] = message.useMessage();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const info = () =&gt; {</span></span>
<span class="line"><span>    messageApi.info(&#39;Hello, Ant Design!&#39;);</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      {contextHolder}</span></span>
<span class="line"><span>      &lt;Button type=&quot;primary&quot; onClick={info}&gt;</span></span>
<span class="line"><span>        Display normal message</span></span>
<span class="line"><span>      &lt;/Button&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default App;</span></span></code></pre></div><h3 id="_3、非组件内调用使用redux" tabindex="-1">3、非组件内调用使用Redux <a class="header-anchor" href="#_3、非组件内调用使用redux" aria-label="Permalink to &quot;3、非组件内调用使用Redux&quot;">​</a></h3><p>Hook 调用形式只能在组件使用，业务场景上常常需要在非组件内调用相关，比如在请求的响应拦截器中调用 Message 或Notification组件实现错误提示。对于在非组件调用可以通过Redux 数据全局共享与通信方案，在相关逻辑中（例如响应拦截器中）通知组件调用 Notification，从而实现此需求。</p><h4 id="_1-、封装notificationalert组件" tabindex="-1">1）、封装NotificationAlert组件 <a class="header-anchor" href="#_1-、封装notificationalert组件" aria-label="Permalink to &quot;1）、封装NotificationAlert组件&quot;">​</a></h4><p>当要触发通知的时候通过该组件来触发相关的提示</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import {useEffect} from &quot;react&quot;;</span></span>
<span class="line"><span>import {App} from &quot;antd&quot;;</span></span>
<span class="line"><span>import {useSelector} from &quot;react-redux&quot;;</span></span>
<span class="line"><span>import {RootState} from &quot;@/store&quot;;</span></span>
<span class="line"><span>import { getnotificationInfo } from &#39;@/store/selector&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function NotificationAlert() {</span></span>
<span class="line"><span>  const {notification } = App.useApp();</span></span>
<span class="line"><span>  const notificationInfo = useSelector(getnotificationInfo);</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    const {type, content} = notificationInfo;</span></span>
<span class="line"><span>    if (notification &amp;&amp; content) {</span></span>
<span class="line"><span>      switch (type) {</span></span>
<span class="line"><span>        case &quot;success&quot;:</span></span>
<span class="line"><span>            notification.success(content);</span></span>
<span class="line"><span>          break;</span></span>
<span class="line"><span>        case &quot;error&quot;:</span></span>
<span class="line"><span>            notification.error(content);</span></span>
<span class="line"><span>          break;</span></span>
<span class="line"><span>        case &quot;warning&quot;:</span></span>
<span class="line"><span>            notification.warning(content);</span></span>
<span class="line"><span>          break;</span></span>
<span class="line"><span>        case &quot;info&quot;:</span></span>
<span class="line"><span>            notification.info(content);</span></span>
<span class="line"><span>          break;</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            notification.error(content);</span></span>
<span class="line"><span>          break;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }, [notification, notificationInfo]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return null;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default NotificationAlert;</span></span></code></pre></div><h4 id="_2-、全局注册通知提示组件" tabindex="-1">2）、全局注册通知提示组件 <a class="header-anchor" href="#_2-、全局注册通知提示组件" aria-label="Permalink to &quot;2）、全局注册通知提示组件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//App.tsx</span></span>
<span class="line"><span>import NotificationAlert from &#39;./components/NotificationAlert/index.tsx&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function App(){</span></span>
<span class="line"><span>  useEffect(()=&gt;{</span></span>
<span class="line"><span>    store.dispatch(clearNotificationInfo())</span></span>
<span class="line"><span>  },[])</span></span>
<span class="line"><span>  return(</span></span>
<span class="line"><span>    // Suspense 包裹路由组件，防止路由页面懒加载时，js未请求完成，渲染页面报错</span></span>
<span class="line"><span>    &lt;Suspense  &gt;</span></span>
<span class="line"><span>       &lt;RouterProvider router={router}&gt;&lt;/RouterProvider&gt;</span></span>
<span class="line"><span>       &lt;NotificationAlert&gt;&lt;/NotificationAlert&gt;</span></span>
<span class="line"><span>    &lt;/Suspense&gt;</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-、设置redux相关配置" tabindex="-1">3）、设置redux相关配置 <a class="header-anchor" href="#_3-、设置redux相关配置" aria-label="Permalink to &quot;3）、设置redux相关配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { createSlice } from &#39;@reduxjs/toolkit&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export  interface contentType {</span></span>
<span class="line"><span>    key: string,</span></span>
<span class="line"><span>    message: string,</span></span>
<span class="line"><span>    description: string,</span></span>
<span class="line"><span>    duration: number</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export interface NotificationInfoType {</span></span>
<span class="line"><span>    type: &#39;success&#39; | &#39;error&#39; | &#39;info&#39; | &#39;warning&#39;|&#39;&#39;;</span></span>
<span class="line"><span>    content?: contentType;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export interface GlobalState {</span></span>
<span class="line"><span>    notificationInfo: NotificationInfoType;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const defaultValue: GlobalState = {</span></span>
<span class="line"><span>    notificationInfo: {</span></span>
<span class="line"><span>        type: &#39;&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const global = createSlice({</span></span>
<span class="line"><span>    name: &#39;global&#39;,</span></span>
<span class="line"><span>    initialState: { ...defaultValue },</span></span>
<span class="line"><span>    reducers: {</span></span>
<span class="line"><span>        savenotificationInfo: (state, action:  { payload: GlobalState }) =&gt; {</span></span>
<span class="line"><span>            state.notificationInfo = { ...action.payload.notificationInfo };</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        clearNotificationInfo(state){</span></span>
<span class="line"><span>            Object.assign(state, {...defaultValue});</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>export const { savenotificationInfo,clearNotificationInfo } = global.actions;</span></span>
<span class="line"><span>export default global.reducer;</span></span></code></pre></div><h4 id="_4-、请求拦截器内调用相关action实现通知提醒" tabindex="-1">4）、请求拦截器内调用相关action实现通知提醒 <a class="header-anchor" href="#_4-、请求拦截器内调用相关action实现通知提醒" aria-label="Permalink to &quot;4）、请求拦截器内调用相关action实现通知提醒&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { savenotificationInfo } from &#39;@/store/reducers/globalSlice&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//其他配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 响应拦截</span></span>
<span class="line"><span>http.interceptors.response.use(</span></span>
<span class="line"><span>  (response) =&gt; {</span></span>
<span class="line"><span>    //其他配置</span></span>
<span class="line"><span>    store.dispatch(</span></span>
<span class="line"><span>      savenotificationInfo({</span></span>
<span class="line"><span>        notificationInfo: {</span></span>
<span class="line"><span>          type: &#39;error&#39;,</span></span>
<span class="line"><span>          content: {</span></span>
<span class="line"><span>            key: url,</span></span>
<span class="line"><span>            message: &#39;请求出错&#39;,</span></span>
<span class="line"><span>            description: responseData.message,</span></span>
<span class="line"><span>            duration: 3</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    return Promise.reject(responseData.message);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  (err) =&gt; {</span></span>
<span class="line"><span>    console.log(err);</span></span>
<span class="line"><span>    const httpCode = err.response.status;</span></span>
<span class="line"><span>    if (httpCode === REQUEST_UNAUTHORIZED_CODE) {</span></span>
<span class="line"><span>      store.dispatch(</span></span>
<span class="line"><span>        savenotificationInfo({</span></span>
<span class="line"><span>          notificationInfo: {</span></span>
<span class="line"><span>            type: &#39;error&#39;,</span></span>
<span class="line"><span>            content: {</span></span>
<span class="line"><span>              key: &#39;&#39;,</span></span>
<span class="line"><span>              message: &#39;认证信息失效，请重新登陆&#39;,</span></span>
<span class="line"><span>              description: err.response.message,</span></span>
<span class="line"><span>              duration: 3</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>      );</span></span>
<span class="line"><span>      Navigate({ to: &#39;/login&#39; });</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      store.dispatch(</span></span>
<span class="line"><span>        savenotificationInfo({</span></span>
<span class="line"><span>          notificationInfo: {</span></span>
<span class="line"><span>            type: &#39;error&#39;,</span></span>
<span class="line"><span>            content: {</span></span>
<span class="line"><span>              key: &#39;&#39;,</span></span>
<span class="line"><span>              message: httpCode,</span></span>
<span class="line"><span>              description: err.config.url + &#39;:&#39; + (err.response.data.message || err.message),</span></span>
<span class="line"><span>              duration: 3</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>      );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return Promise.reject(err);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default http;</span></span></code></pre></div><p>到此为止就解决了antd组件库兼容低版本浏览器，在开发环境验证成功。但是在生产环境中低版本浏览器中样式仍然错乱。查看antd官方文档，发现在服务端渲染样式的话还需要进行进一步处理。</p><h2 id="三、服务端渲染兼容" tabindex="-1">三、服务端渲染兼容 <a class="header-anchor" href="#三、服务端渲染兼容" aria-label="Permalink to &quot;三、服务端渲染兼容&quot;">​</a></h2><p>官方文档提供了两种方案：</p><ul><li><strong>内联样式</strong>：在渲染时无需额外请求样式文件，好处是减少额外的网络请求，缺点则是会使得 HTML 体积增大，影响首屏渲染速度。</li><li><strong>整体导出</strong>：提前烘焙 antd 组件样式为 css 文件，在页面中时引入。好处是打开任意页面时如传统 css 方案一样都会复用同一套 css 文件以命中缓存，缺点是如果页面中存在多主题，则需要额外进行烘焙。</li></ul><p>出于性能考虑，在信息收集工具，我们采用整体导出的方式。</p><p>1、安装依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install ts-node tslib cross-env --save-dev</span></span></code></pre></div><p>2、新增 <code>tsconfig.node.json</code> 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span>    &quot;strictNullChecks&quot;: true,</span></span>
<span class="line"><span>    &quot;module&quot;: &quot;NodeNext&quot;,</span></span>
<span class="line"><span>    &quot;jsx&quot;: &quot;react&quot;,</span></span>
<span class="line"><span>    &quot;esModuleInterop&quot;: true</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;include&quot;: [&quot;next-env.d.ts&quot;, &quot;**/*.ts&quot;, &quot;**/*.tsx&quot;]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3、新增 <code>scripts/genAntdCss.tsx</code> 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// scripts/genAntdCss.tsx</span></span>
<span class="line"><span>const fs = require(&#39;fs&#39;);;</span></span>
<span class="line"><span>const { extractStyle } = require(&#39;@ant-design/static-style-extract&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const outputPath = &#39;./public/antd.min.css&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const css = extractStyle();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fs.writeFileSync(outputPath, css);</span></span></code></pre></div><p>4、配置webpack执行上述脚本，会在指定的目录下直接生成一个全量的antd.min.css文件</p><p>首先要安装WebpackShellPluginNext插件，它可以帮助我们在Webpack 构建过程前后执行自定义脚本。</p><p>（若webpack是5以上版本则需要安装2以上版本的WebpackShellPluginNext插件，若webpack是4以上版本则需要安装1以上版本的WebpackShellPluginNext插件，否则会因为版本不兼容而导致报错）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>    plugins:[</span></span>
<span class="line"><span>    new WebpackShellPluginNext({</span></span>
<span class="line"><span>      onBuildStart: {</span></span>
<span class="line"><span>        scripts: [    </span></span>
<span class="line"><span>          &#39;cross-env NODE_ENV=development ts-node --project ./tsconfig.node.json ./scripts/genAntdCss.tsx&#39;,</span></span>
<span class="line"><span>          &#39;cross-env NODE_ENV=production ts-node --project ./tsconfig.node.json ./scripts/genAntdCss.tsx&#39;</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        blocking: true,</span></span>
<span class="line"><span>        parallel: false</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>自此在生产环境，antd也支持低版本浏览器了。</p>`,52),t=[l];function i(c,o,r,d,u,h){return a(),n("div",null,t)}const f=s(e,[["render",i]]);export{g as __pageData,f as default};
