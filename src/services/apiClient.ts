import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://123.123.123.123:3333',
});

export { apiClient };
