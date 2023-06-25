import axios from '~/request';

export const POST_SERVICE_BASE = 'post';
export interface IPostDetail {
  accountAuth: string[];
  ats: any[];
  authorAvatar: string;
  authorDescription: string;
  authorId: number;
  authorLevel: number;
  authorName: string;
  body: string;
  coined: boolean;
  coinsNum: number;
  commentNum: number;
  cover: string;
  createTime: string;
  favoriteNum: number;
  favorited: boolean;
  followed: boolean;
  likeNum: number;
  liked: boolean;
  mediaUrls: string[];
  postId: number;
  pureText: string;
  tags: any[];
  title: string;
  top: boolean;
  type: number;
}
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

  submitPost(dataParam) {
    const url = `/${POST_SERVICE_BASE}`;
    return axios.post(url, dataParam);
  }

  async getPostDetail(postId: string) {
    const url = `post/${postId}`;
    const { data } = await axios.get<IPostDetail>(url);
    return data;
  }
}
export const PostServiceInstance = new PostService();
