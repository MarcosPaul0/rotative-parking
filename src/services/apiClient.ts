import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://172.29.224.1:3333',
});

export { apiClient };
