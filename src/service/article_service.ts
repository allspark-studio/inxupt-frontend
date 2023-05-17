import axios from '~/request';

export default class ArticleService {
  async getArticleCategoryList(paneKey: string | number, pageNum = 1) {
    const { data } = await axios.get(`category/${paneKey}/posts?pageNum=${pageNum}`);
    return data;
  }

  async getArticleList(pageNum = 1) {
    const { data } = await axios.get(`posts?pageNum=${pageNum}`);
    return data;
  }

  async likeArticle(postId) {
    const { data } = await axios.post(`post/${postId}/like`);
    return data;
  }

  async cancelLikeArticle(postId) {
    const { data } = await axios.delete(`post/${postId}/like`);
    return data;
  }

  async favoriteArticle(postId) {
    const { data } = await axios.post(`post/${postId}/favorite`);
    return data;
  }

  async cancelFavoriteArticle(postId) {
    const { data } = await axios.delete(`post/${postId}/favorite`);
    return data;
  }

  async getHotSearchList() {
    const { data } = await axios.get('search/hotWords');
    return data;
  }

  async careUser(id) {
    const { data } = await axios.post(`user/follow/${id}`);
    return data;
  }

  async hotIndexSort() {
    const { data } = await axios.post('api/post/heat');
    return data;
  }
}
