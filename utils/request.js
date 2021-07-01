import axios from 'axios';

const TIME_OUT = 30000;
const request = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: TIME_OUT,
  // withCredentials: true,
});

const getAuthToken = () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRkMWQ4NWNjYzBjYzAwMWI0NWY5OWUiLCJlbWFpbCI6ImFyaWdhdG8xNTA5OThAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiZmlyc3ROYW1lIjoiUGh1YyIsImxhc3ROYW1lIjoiTGUiLCJpZCI6IjYwZGQxZDg1Y2NjMGNjMDAxYjQ1Zjk5ZSIsImlhdCI6MTYyNTExMjM0MywiZXhwIjoxNjI1MTE1OTQzfQ.xSnjtZSa_6f-5zsdl-oGDQCdzuQz4LLHrhKQGNZMa0s'

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
    (error) => Promise.reject(error?.response || error.message),
  );
};


export default request;
