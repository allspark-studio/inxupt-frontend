import axios from '~/request';

export default class PostService {
  followUser(userId: number) {
    const url = `user/follow/${userId}`;
    return axios.post<void>(url);
  }

  unFollowUser(userId: number) {
    const url = `user/follow/${userId}`;
    axios.delete<void>(url);
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
