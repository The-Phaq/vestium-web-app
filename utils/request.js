import axios from 'axios';

const TIME_OUT = 30000;
const request = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: TIME_OUT,
  // withCredentials: true,
});

export default request;
