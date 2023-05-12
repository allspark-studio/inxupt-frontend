export enum ResponseStatusCode {
  SUCCESS = 0,
  ERROR = -1,
  PARAM_ERROR = 1,
  USER_NAME_EXIST = 101,
  PHONE_EXIST = 102,
  USER_NOT_REGISTER = 103,
  INCONSISTENT_PASSWORDS = 104,
  CODE_NOT_MATCH = 105,
  CODE_SENT_FREQUENTLY = 106,
  USERNAME_OR_PASSWORD_ERROR = 107,
  PASSWORD_IS_EMPTY = 108,
  TOKEN_VALIDATE_FAILED = 109,
  NEED_LOGIN = 110,
  REGISTER_FAILED = 111,
  HAVE_NOT_PASSWORD = 112,
}

export interface CustomResponseData<T> {
  status: ResponseStatusCode;
  msg: string;
  data: T;
}