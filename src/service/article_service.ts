import axios from '~/request';
import { SortType } from '~/types/common_types';
import { ArticleFacade, CategoryEnum } from '~/types/article_types';
import { PagedResponseData } from '~/types/response_types';

export type ArticleForm = {
  categoryId?: CategoryEnum;
  pageNum?: number;
  sortedBy?: SortType;
};

export default class ArticleService {
  async getArticleList(form: ArticleForm) {
    const { data } = await axios.get<PagedResponseData<ArticleFacade>>('posts', {
      params: form,
    });
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

  async getHotSearchList() {
    const { data } = await axios.get('search/hotWords');
    return data;
  }

  async careUser(userId: number) {
    const { data } = await axios.post(`user/follow/${userId}`);
    return data;
  }

  async unfollow(userId: number) {
    const { data } = await axios.delete(`user/follow/${userId}`);
    return data;
  }

  async reportArticle(postId: number) {
    const { data } = await axios.post(`post/${postId}/report`);
    return data;
  }

  async hotIndexSort() {
    const { data } = await axios.post('api/post/heat');
    return data;
  }

  async searchArticle(keyWord: string) {
    const url = 'search/posts';
    const { data } = await axios.get(url, {
      params: { keyWord },
    });
    return data;
  }
}
