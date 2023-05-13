import Taro from '@tarojs/taro';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseStatusCode, CustomResponseData } from '~/types/response_types';
import { handleError } from '~/request/global_error_handler';
import { USER_TOKEN_KEY } from '~/constants/storage';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.set('token', Taro.getStorageSync(USER_TOKEN_KEY));
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse<CustomResponseData<any>>) => {
    // 如果 status 不是 0，则说明是后端自定义的错误。
    if (response.data.status !== ResponseStatusCode.SUCCESS) {
      handleError(response.data);
      throw response;
    }
    return response;
  },
  (error: AxiosError) => {
    throw error;
  }
);

export default instance;
