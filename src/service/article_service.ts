import axios from '~/request';
import { SortType } from '~/types/common_types';
import { ArticleFacade, CategoryEnum } from '~/types/article_types';
import { PagedResponseData, CustomResponseData } from '~/types/response_types';

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
    const url = 'search/hotWords';
    const { data } = await axios.get<CustomResponseData<string[]>>(url);
    return data;
  }

  followUser(userId: number) {
    const url = `user/follow/${userId}`;
    return axios.post<void>(url);
  }

  unFollowUser(userId: number) {
    const url = `user/follow/${userId}`;
    axios.delete<void>(url);
  }

  async reportArticle(postId: number) {
    return axios.post<void>(`post/${postId}/report`);
  }

  async searchArticle(keyWord: string) {
    const url = 'search/posts';
    const { data } = await axios.get(url, {
      params: { keyWord },
    });
    return data;
  }
}
