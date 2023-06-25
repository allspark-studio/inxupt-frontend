import Taro from '@tarojs/taro';
import { UserFacade, UserTokenId } from '~/types/user_types';
import axios from '~/request/index';
import { CustomResponseData, ResponseStatusCode } from '~/types/response_types';
import { CustomResponseError } from '~/request/global_error_handler';
import { USER_ID_KEY, USER_TOKEN_KEY } from '~/constants/storage';

export const USER_SERVICE_BASE = 'user';

export default class UserService {
  async loginByWechat() {
    const { code, errMsg } = await Taro.login();
    if (!code) {
      throw new CustomResponseError(ResponseStatusCode.ERROR, errMsg);
    }
    const url = `${USER_SERVICE_BASE}/loginByWechat`;
    const { data } = await axios.post<CustomResponseData<UserTokenId>>(url, { code });
    Taro.setStorageSync(USER_TOKEN_KEY, data.data.token);
    Taro.setStorageSync(USER_ID_KEY, data.data.userId);
    return data;
  }

  async getUserInfoById(userId: number) {
    const url = `${USER_SERVICE_BASE}/${userId}/info`;
    const { data } = await axios.get<CustomResponseData<UserFacade>>(url);
    return data;
  }

  followUser(userId: number) {
    const url = `${USER_SERVICE_BASE}/follow/${userId}`;
    return axios.post(url);
  }

  cancelFollowUser(userId: number) {
    const url = `${USER_SERVICE_BASE}/follow/${userId}`;
    return axios.delete(url);
  }
}
export const UserServiceInstance = new UserService();
