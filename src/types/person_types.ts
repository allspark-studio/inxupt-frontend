import { UserFacade } from './user_types';

export interface UserInfoFacade extends UserFacade {
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

export interface FansInfoFacade {
  id: number;
  nickName: string;
  avatarUrl: string;
  accountAuth: string[];
  description: string;
  followed: boolean;
  level: number;
}

export interface FollowsInfoFacade {
  id: number;
  nickName: string;
  avatarUrl: string;
  accountAuth: string[];
  description: string;
  followed: boolean;
  level: number;
}

export interface FavoriteInfoFacade {
  accountAuth: string[];
  ats: object[];
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
  mediaUrls: string;
  postId: number;
  pureText: string;
  title: string;
  top: boolean;
  type: number;
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
