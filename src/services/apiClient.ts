import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.139:3333',
});

export { apiClient };
