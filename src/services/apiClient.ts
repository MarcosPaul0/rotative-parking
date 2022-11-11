import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://172.26.112.1:3333',
});

export { apiClient };
