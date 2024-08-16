import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    }

    return Promise.reject(response.data);
  },
  async (error) => {
    return Promise.reject(error);
  },
);
