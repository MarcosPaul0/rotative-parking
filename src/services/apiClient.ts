import axios from 'axios';
import { CONFIGS } from '@configs/configs';

const apiClient = axios.create({
  baseURL: CONFIGS.apiURL,
});

export { apiClient };
