import { createApp } from 'vue';
import './app.less';
import dayjs from './day/dayjs.config';

// 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
const App = createApp({});
App.config.globalProperties.$dayjs = dayjs;

export default App;
