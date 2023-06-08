import { ComponentInternalInstance, onMounted } from 'vue';
import { useUserStore } from '~/store/user_store';

export function onLoginMounted(callback: () => any, target?: ComponentInternalInstance | null) {
  onMounted(async () => {
    // 初始化 jwt 和用户 userInfo
    const userStore = useUserStore();
    await userStore.initUserTokenId();
    await userStore.initUserInfo();
    callback();
  }, target);
}
