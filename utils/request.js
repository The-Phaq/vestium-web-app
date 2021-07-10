import axios from 'axios';

const TIME_OUT = 30000;
const request = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: TIME_OUT,
  // withCredentials: true,
});

const getAuthToken = () => localStorage.getItem('token')

export const setInitHeader = (ctx) => {
  if (!ctx) {
    const token = getAuthToken();
    if (token) {
      request.defaults.headers.common.authorization = `Bearer ${token}`;
    }
  }
  request.interceptors.request.use(
    (config) => {
      const token = getAuthToken(ctx);
      if (token) {
        // eslint-disable-next-line
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error?.response || error.message)
    },
  );
};


request.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(
      error?.response?.data,
    );
  },
);


export default request;
