import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { USER_ID_KEY, USER_TOKEN_KEY } from '~/constants/storage';
import UserService from '~/service/user_service';
import { UserFacade } from '~/types/user_types';

export interface UserStoreState {
  userInfo: UserFacade | null;
  userId: number | null;
}

const userService = new UserService();
export const USER_STORE_NAME = 'user_store';

export const useUserStore = defineStore(USER_STORE_NAME, () => {
  const userInfo = ref<UserFacade | null>(null);
  const userId = ref<number>(0);
  const state = reactive<UserStoreState>({
    userInfo: null,
    userId: Taro.getStorageSync(USER_ID_KEY),
  });

  async function initUserTokenId() {
    const tokenFromStorage = Taro.getStorageSync(USER_TOKEN_KEY);
    const userIdFromStorage = Taro.getStorageSync(USER_ID_KEY);
    if (tokenFromStorage) {
      userId.value = userIdFromStorage;
      return;
    }
    try {
      const { data } = await userService.loginByWechat();
      userId.value = data.userId;
    } catch (e) {
      Taro.showToast({
        icon: 'none',
        title: e.msg,
      });
    }
  }

  async function initUserInfo() {
    if (!state.userId) {
      console.error('userStore.userId has not init');
      return;
    }
    try {
      const { data } = await userService.getUserInfoById(state.userId);
      userInfo.value = data;
    } catch (e) {
      Taro.showToast({
        icon: 'none',
        title: e.msg,
      });
    }
  }

  return { userId, userInfo, initUserTokenId, initUserInfo };
});
