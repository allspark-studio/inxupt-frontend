import axios from '~/request/http';

export interface User {}

export default class UserService {
  async getUserInfo() {
    const url = 'user/info';
    const { data } = await axios.get<User>(url);
    return data;
  }
}
