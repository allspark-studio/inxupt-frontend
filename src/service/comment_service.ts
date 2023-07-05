import axios from '~/request';
// import { SortType } from '~/types/common_types';
// import { ArticleFacade, CategoryEnum } from '~/types/article_types';
// import { PagedResponseData, CustomResponseData } from '~/types/response_types';

export interface IComment {
  commentId: number;
  rootId: number;
  parentId: number;
  text: string;
  mediaUrls: any;
  state: number;
  privately: boolean;
  authorId: number;
  authorNickname: string;
  authorAvatar: string;
  authorLevel: number;
  accountAuth: string[];
  createTime: string;
  likeNum: number;
  coinsNum: number;
  liked: boolean;
  coined: boolean;
  subComments: {
    commentId: number;
    rootId: number;
    parentId: number;
    text: string;
    mediaUrls: any;
    state: number;
    privately: boolean;
    authorId: number;
    authorNickname: string;
    authorAvatar: string;
    authorLevel: number;
    accountAuth: string[];
    createTime: string;
    likeNum: number;
    coinsNum: number;
    liked: boolean;
    coined: boolean;
    replyUserId: number;
    replyUserNickname: string;
  }[];
}

export default class CommentService {
  async getPostAllComments(postId: string, type: 'new' | 'hot' = 'new') {
    const { data } = await axios.get(`post/${postId}/comments?sortedBy=${type === 'new' ? 0 : 1}`);
    return data;
  }

  createCommentForPost(
    postId: string,
    data: {
      body: string;
      mediaUrls: string[];
      parentId: number;
      privately: boolean;
      replyUserId: number;
      rootId: number;
    }
  ) {
    return axios.post(`post/${postId}/comment`, data);
  }

  deleteComment(commentId: number) {
    return axios.delete(`comment/${commentId}`);
  }

  coinForComment(commentId: number) {
    return axios.post(`comment/${commentId}/coin`);
  }

  likeComment(commentId: number) {
    return axios.post(`comment/${commentId}/like`);
  }

  unlikeComment(commentId: number) {
    return axios.delete(`comment/${commentId}/like`);
  }

  reportComment(commentId: number) {
    return axios.post(`comment/${commentId}/report`);
  }
}
export const CommentServiceInstance = new CommentService();
