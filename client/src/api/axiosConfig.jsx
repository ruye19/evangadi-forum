import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:5900/api'
});
export default axiosConfig;