import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { USER_TOKEN_KEY } from '~/constants/storage';
import UserService from '~/service/user_service';
import { UserFacade } from '~/types/user_types';

export interface UserStoreState {
  userInfo: UserFacade | null;
  userId: number | null;
}

const userService = new UserService();
export const USER_STORE_NAME = 'user_store';

export const useUserStore = defineStore(USER_STORE_NAME, () => {
  const state = reactive<UserStoreState>({
    userInfo: null,
    userId: null,
  });

  async function initUserTokenId() {
    try {
      const { data } = await userService.loginByWechat();
      state.userId = data.userId;
      Taro.setStorageSync(USER_TOKEN_KEY, data.token);
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
      state.userInfo = data;
    } catch (e) {
      Taro.showToast({
        icon: 'none',
        title: e.msg,
      });
    }
  }

  return { ...state, initUserTokenId, initUserInfo };
});
