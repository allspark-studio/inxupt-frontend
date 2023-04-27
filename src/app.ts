import { createApp } from 'vue';
import './app.less';
import { createPinia } from 'pinia';
import './assets/styles/icon/iconfont.css';
import '@nutui/nutui-taro/dist/style.css';
// 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
const App = createApp({});
App.use(createPinia());
export default App;
