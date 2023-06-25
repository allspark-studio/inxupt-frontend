import Taro from '@tarojs/taro';

export const useRouteParam = () => {
  return Taro.getCurrentInstance().router?.params ?? {};
};
