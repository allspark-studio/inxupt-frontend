import { PagedResponseData } from './response_types';

export interface UserInfoFacade {
  accountAuth: string[];
  articleNum: number;
  avatarUrl: string;
  backgroundUrl: string;
  description: string;
  fansNum: number;
  followNum: number;
  followed: boolean;
  gender: number;
  grade: string;
  hisId: number;
  level: number;
  likedNum: number;
  major: string;
  newsNum: number;
  nickname: string;
}

export interface FansInfoFacade extends PagedResponseData<object> {
  endRow: number;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatePages: number;
  navigatepageNums: number[];
  nextPage: number;
  prePage: number;
  size: number;
  startRow: number;
}

export interface FollowsInfoFacade extends PagedResponseData<object> {
  endRow: number;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatePages: number;
  navigatepageNums: number[];
  nextPage: number;
  prePage: number;
  size: number;
  startRow: number;
}

export interface PostsInfoFacade extends PagedResponseData<object> {
  endRow: number;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatePages: number;
  navigatepageNums: number[];
  nextPage: number;
  prePage: number;
  size: number;
  startRow: number;
}

export interface FavoriteInfoFacade extends PagedResponseData<object> {
  endRow: number;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatePages: number;
  navigatepageNums: number[];
  nextPage: number;
  prePage: number;
  size: number;
  startRow: number;
}

export interface PostInfoFacade {
  postId: number;
  type: number;
  top: boolean;
  title: string;
  pureText: string;
  body: string;
  mediaUrls: null | string;
  ats: null;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  authorLevel: number;
  accountAuth: string[];
  authorDescription: string;
  createTime: string;
  tags: null;
  likeNum: number;
  commentNum: number;
  favoriteNum: number;
  coinsNum: number;
  liked: boolean;
  favorited: boolean;
  coined: boolean;
}
