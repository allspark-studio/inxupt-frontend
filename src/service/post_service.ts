import axios from 'axios';

export const POST_SERVICE_BASE = 'post';
export default class PostService {
  submitPost(dataParam) {
    const url = `/${POST_SERVICE_BASE}`;
    return axios.post(url, dataParam);
  }
}
