import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocal } from '../encrypt.js';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
export async function AxiosGet<T>(
  url: string,
  reqConfig?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const token = await getLocal('token', []);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 1 },
    ...reqConfig,
  };
  return axios.get<T>(baseUrl + url, config);
}

export async function AxiosGetThird<T>(url: string): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    headers: { 'x-auth-token': await getLocal('token', []), 'ngrok-skip-browser-warning': 1 },
  };
  return axios.get<T>(url, config);
}
