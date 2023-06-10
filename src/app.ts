import '@nutui/nutui-taro/dist/style.css';
import '~/assets/styles/icon/iconfont.css';
import { createPinia } from 'pinia';
import { ConfigProvider, Textarea, Button, Popup } from '@nutui/nutui-taro';
import { createApp } from 'vue';
import dayjs from '~/day/dayjs.config';

// 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
const App = createApp({});
App.config.globalProperties.$dayjs = dayjs;
App.use(createPinia());
App.use(ConfigProvider);
App.use(Textarea);
App.use(Button);
App.use(Popup);
export default App;
