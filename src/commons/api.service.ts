import axios from "axios";
import { API_URL } from "@/commons/config";

export const ApiService = axios.create({ baseURL: API_URL });
