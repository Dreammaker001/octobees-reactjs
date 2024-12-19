import axios from "axios";
import { API_URL } from "../constants/api.constants";
import { getToken } from "../utils/token";

const BaseService = axios.create({
  timeout: 60000,
  baseURL: API_URL,
});

BaseService.interceptors.request.use(
  (config) => {
    const accessToken = getToken()

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default BaseService;
