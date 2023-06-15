import Taro from '@tarojs/taro';
import qs from 'qs';
import UserService from '~/service/user_service';
import { CustomResponseData, ResponseStatusCode } from '~/types/response_types';

// 后端统一返回的错误格式，前端 service 层捕获某些异常（如 taro.login）后可以将错误封装成该类型返回给业务层
export class CustomResponseError implements CustomResponseData<null> {
  /** 错误状态码 */
  status: ResponseStatusCode;

  /** 错误信息 */
  msg: string;

  /** 错误时返回 data 预期为 null */
  data = null;

  constructor(status: ResponseStatusCode, msg: string) {
    this.status = status;
    this.msg = msg;
  }
}

export async function handleError(error: CustomResponseError) {
  const { status, msg } = error;
  switch (status) {
    case ResponseStatusCode.ERROR: {
      // 如果 status 为 -1，则统一抛出 "服务端错误，请稍后重试"
      throw new CustomResponseError(ResponseStatusCode.ERROR, '服务端错误，请稍后重试');
    }
    // 未登录或身份过期，重新登录后刷新页面
    case ResponseStatusCode.TOKEN_VALIDATE_FAILED:
    case ResponseStatusCode.NEED_LOGIN: {
      const userService = new UserService();
      await userService.loginByWechat();
      // // 获取当前页面路径
      const currentPath = Taro.getCurrentInstance().router?.path;
      // // 获取当前页面路径参数
      const currentParams = Taro.getCurrentInstance().router?.params;
      // // 将参数转化为字符串
      const paramsString = qs.stringify(currentParams);
      // // 刷新页面
      Taro.reLaunch({ url: `${currentPath}?${paramsString}` });
      return;
    }
    default: {
      throw new CustomResponseError(ResponseStatusCode.ERROR, msg);
    }
  }
}
