import axios from '~/request';
import { SortType } from '~/types/common_types';
import { ArticleFacade, CategoryEnum } from '~/types/article_types';
import { PagedResponseData } from '~/types/response_types';

export type ArticleForm = {
  category?: CategoryEnum;
  pageNum?: number;
  sortedBy?: SortType;
};

export default class ArticleService {
  async getArticleCategoryList(paneKey: string | number, pageNum = 1) {
    const url = `category/${paneKey}/posts`;
    const { data } = await axios.get<PagedResponseData<ArticleFacade>>(url, {
      params: { pageNum },
    });
    return data;
  }

  async getArticleList(form: ArticleForm) {
    const { data } = await axios.get<PagedResponseData<ArticleFacade>>('posts', {
      params: form,
    });
    return data;
  }

  async likeArticle(postId: number) {
    const url = `post/${postId}/like`;
    const { data } = await axios.post(url);
    return data;
  }

  async cancelLikeArticle(postId: number) {
    const { data } = await axios.delete(`post/${postId}/like`);
    return data;
  }

  async favoriteArticle(postId: number) {
    const { data } = await axios.post(`post/${postId}/favorite`);
    return data;
  }

  async cancelFavoriteArticle(postId: number) {
    const { data } = await axios.delete(`post/${postId}/favorite`);
    return data;
  }

  async getHotSearchList() {
    const { data } = await axios.get('search/hotWords');
    return data;
  }

  async careUser(userId: number) {
    const { data } = await axios.post(`user/follow/${userId}`);
    return data;
  }

  async hotIndexSort() {
    const { data } = await axios.post('api/post/heat');
    return data;
  }
}
