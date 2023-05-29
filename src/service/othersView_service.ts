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

  async getFavoriteArticles(userId: Number, pageNum: Number) {
    const data = await axios.get(
      `https://inxupt.alkaidchen.com:443/user/${userId}/articles?pageNum=${pageNum}`
    );
    return data;
  }

  async follow(userId: Number) {
    const data = await axios.post(`https://inxupt.alkaidchen.com:443/user/follow/${userId}`);
    return data;
  }

  async unFollow(userId: Number) {
    const data = await axios.delete(`https://inxupt.alkaidchen.com:443/user/follow/${userId}`);
    return data;
  }

  async like(postId: Number) {
    const data = await axios.post(`https://inxupt.alkaidchen.com:443/post/${postId}/like`);
    return data;
  }

  async unlike(postId: Number) {
    const data = await axios.delete(`https://inxupt.alkaidchen.com:443/post/${postId}/like`);
    return data;
  }

  async favorite(postId: Number) {
    const data = await axios.post(`https://inxupt.alkaidchen.com:443/post/${postId}/favorite`);
    return data;
  }

  async unfavorite(postId: Number) {
    const data = await axios.delete(`https://inxupt.alkaidchen.com:443/post/${postId}/favorite`);
    return data;
  }

  async getPost(postId: Number) {
    const data = await axios.get(`https://inxupt.alkaidchen.com:443/post/${postId}`);
    return data;
  }
}
