import axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = API_BASE_URL;

export default instance;
