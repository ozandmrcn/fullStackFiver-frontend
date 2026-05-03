import axios from "axios";
import { config } from "../config/enviroment";

const api = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});

export default api;
