import axios from '~/request';

export default class PostService {
  async followUser(userId: number) {
    const { data } = await axios.post<void>(`user/follow/${userId}`);
    return data;
  }

  async unFollowUser(userId: number) {
    const { data } = await axios.delete<void>(`user/follow/${userId}`);
    return data;
  }

  async likeArticle(postId: number) {
    const url = `post/${postId}/like`;
    return axios.post<void>(url);
  }

  async cancelLikeArticle(postId: number) {
    const url = `post/${postId}/like`;
    return axios.delete<void>(url);
  }

  async favoriteArticle(postId: number) {
    const url = `post/${postId}/favorite`;
    return axios.post<void>(url);
  }

  async cancelFavoriteArticle(postId: number) {
    const url = `post/${postId}/favorite`;
    return axios.delete<void>(url);
  }
}
