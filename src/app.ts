import '@nutui/nutui-taro/dist/style.css';
import '~/assets/styles/icon/iconfont.css';
import { createPinia } from 'pinia';
import { ConfigProvider } from '@nutui/nutui-taro';
import { createApp } from 'vue';
import dayjs from '~/day/dayjs.config';
import { useUserStore } from '~/store/user_store';

// 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
const App = createApp({
  onMounted: async () => {
    // 初始化 jwt 和用户 userInfo
    const userStore = useUserStore();
    await userStore.initUserTokenId();
    await userStore.initUserInfo();
  },
});
App.config.globalProperties.$dayjs = dayjs;
App.use(createPinia());
App.use(ConfigProvider);
export default App;
