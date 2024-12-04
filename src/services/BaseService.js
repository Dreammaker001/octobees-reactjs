import axios from "axios";
import { API_URL } from "../constants/api.constants";

const BaseService = axios.create({
    timeout: 60000,
    baseURL: API_URL,
  });

export default BaseService;
