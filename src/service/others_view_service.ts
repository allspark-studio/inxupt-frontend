import axios from '~/request/index';
import {
  FansInfoFacade,
  FollowsInfoFacade,
  PostInfoFacade,
  UserInfoFacade,
} from '~/types/person_types';
import { CustomResponseData, PagedResponseData } from '~/types/response_types';

export default class OthersViewService {
  async getUserInfo(userId: number) {
    const { data } = await axios.get<CustomResponseData<UserInfoFacade>>(`user/${userId}/page`);
    return data;
  }

  async getFansInfo(userId: number, pageNum: number) {
    const { data } = await axios.get<PagedResponseData<FansInfoFacade>>(`user/${userId}/fans`, {
      params: { pageNum },
    });
    return data;
  }

  async getFollowersInfo(userId: number, pageNum: number) {
    const { data } = await axios.get<PagedResponseData<FollowsInfoFacade>>(
      `user/${userId}/follows`,
      {
        params: { pageNum },
      }
    );
    return data;
  }

  async getPosts(userId: number, pageNum: number) {
    const { data } = await axios.get<PagedResponseData<PostInfoFacade>>(`user/${userId}/posts`, {
      params: { pageNum },
    });
    return data;
  }

  async getFavoriteArticles(userId: number, pageNum: number) {
    const { data } = await axios.get<PagedResponseData<PostInfoFacade>>(`user/${userId}/articles`, {
      params: { pageNum },
    });
    return data;
  }

  async getPost(postId: number) {
    const { data } = await axios.get(`post/${postId}`);
    return data;
  }
}
