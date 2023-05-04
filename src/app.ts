import { createApp } from 'vue';
import '@nutui/nutui-taro/dist/style.css';
import './assets/styles/icon/iconfont.css';
import { createPinia } from 'pinia';
import { ConfigProvider } from '@nutui/nutui-taro';

// 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
const App = createApp({});
App.use(createPinia());
App.use(ConfigProvider);
export default App;
