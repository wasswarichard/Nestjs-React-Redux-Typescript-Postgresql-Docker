import axios, { AxiosError } from 'axios';

axios.interceptors.request.use(
   (config) => {
      const accessToken = localStorage.getItem('access-token');
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

export const get = axios.get;
export const post = axios.post;

export const patch = axios.patch;

export const put = axios.put;

export const remove = axios.delete;

export const fetcher = async (url: string) => {
   try {
      const { data } = await get(url);

      return data;
   } catch (err) {
      const error = err as AxiosError;
      throw error.response;
   }
};
