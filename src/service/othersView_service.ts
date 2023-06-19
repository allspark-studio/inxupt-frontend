import axios from '~/request/index';
import {
  FansInfoFacade,
  FollowsInfoFacade,
  PostsInfoFacade,
  UserInfoFacade,
} from '~/types/person_types';
import { CustomResponseData, PagedResponseData } from '~/types/response_types';

export default class OthersViewService {
  async getUserInfo(userId: Number) {
    const { data } = await axios.get<UserInfoFacade>(`user/${userId}/page`);
    return data;
  }

  async getFansInfo(userId: Number, pageNum: Number) {
    const { data } = await axios.get<PagedResponseData<FansInfoFacade>>(`user/${userId}/fans`, {
      params: { pageNum },
    });
    return data;
  }

  async getfollowsInfo(userId: Number, pageNum: Number) {
    const { data } = await axios.get<PagedResponseData<FollowsInfoFacade>>(
      `user/${userId}/follows`,
      {
        params: { pageNum },
      }
    );
    return data;
  }

  async getPosts(userId: number, pageNum: Number) {
    const { data } = await axios.get<PagedResponseData<PostsInfoFacade>>(`user/${userId}/posts`, {
      params: { pageNum },
    });
    return data;
  }

  async getFavoriteArticles(userId: Number, pageNum: Number) {
    const { data } = await axios.get<CustomResponseData<string[]>>(`user/${userId}/articles`, {
      params: { pageNum },
    });
    return data;
  }

  async getPost(postId: Number) {
    const { data } = await axios.get(`post/${postId}`);
    return data;
  }
}
