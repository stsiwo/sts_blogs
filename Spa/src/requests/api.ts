import axios, { AxiosInstance } from 'axios'
import { apiConfig } from '../configs/apiConfig';

export const api: AxiosInstance = axios.create(apiConfig)
