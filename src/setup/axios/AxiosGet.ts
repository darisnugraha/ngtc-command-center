import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocal } from '../encrypt.js';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
export async function AxiosGet<T>(url: string): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    headers: { 'x-auth-token': await getLocal('token', []) },
  };
  return axios.get<T>(baseUrl + url, config);
}

export async function AxiosGetThird<T>(url: string): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    headers: { 'x-auth-token': await getLocal('token', []) },
  };
  return axios.get<T>(url, config);
}
