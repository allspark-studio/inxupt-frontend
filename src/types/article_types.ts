export interface ArticleFacade {
  postId: number;
  type: number;
  top: boolean;
  title: null | string;
  pureText: null | string;
  cover: null | string;
  body: null | string;
  mediaUrls: string[];
  authorId: number;
  authorName: string;
  authorAvatar: string;
  authorLevel: number;
  accountAuth: string[];
  authorDescription: string;
  createTime: string;
  tags: object[];
  likeNum: number;
  commentNum: number;
  favoriteNum: number;
  coinsNum: number;
  liked: boolean;
  favorited: boolean;
  coined: boolean;
  followed: boolean;
}

export enum CategoryEnum {
  ALL = '1',
  LIFE = '2',
  ACADEMIC = '3',
  EMOTION = '4',
  OTHERS = '5',
}
