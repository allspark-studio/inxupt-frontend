import axios from '~/request/index';

export default class OthersViewService {
  async getUserInfo(userId: Number) {
    const data = await axios.get(`https://inxupt.alkaidchen.com:443/user/${userId}/page`);
    return data;
  }

  async getFansInfo(userId: Number, pageNum: Number) {
    const data = await axios.get(
      `https://inxupt.alkaidchen.com:443/user/${userId}/fans?pageNum=${pageNum}`
    );
    return data;
  }

  async getfollowsInfo(userId: Number, pageNum: Number) {
    const data = await axios.get(
      `https://inxupt.alkaidchen.com:443/user/${userId}/follows?pageNum=${pageNum}`
    );
    return data;
  }

  async getPosts(userId: number, pageNum: Number) {
    const data = await axios.get(
      `https://inxupt.alkaidchen.com:443/user/${userId}/posts?pageNum=${pageNum}`
    );
    return data;
  }
}
