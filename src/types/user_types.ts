export interface UserTokenId {
  token: string;
  userId: number;
}

/** 用户基类 */
export interface UserFacade {
  /** 用户唯一 ID */
  id: number;
  /** 用户昵称 */
  nickname: string;
  /** 用户等级 */
  level: number;
  /** 用户头像 */
  avatarUrl: string;
  /** 用户签名 */
  description: string;
  /** 官方认证 */
  accountAuth: string[];
}

export interface User4ProfileMixin extends UserFacade {
  experience: number;
}
