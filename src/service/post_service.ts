import axios from 'axios';
import { PostResponse } from '~/types/post_types';
import { CustomResponseData } from '~/types/response_types';

export const POST_SERVICE_BASE = 'post';
export default class PostService {
  async SubmitPost(dataParam) {
    const url = `/${POST_SERVICE_BASE}`;
    const { data } = await axios.post<CustomResponseData<PostResponse>>(url, dataParam);
    return data;
  }
}
