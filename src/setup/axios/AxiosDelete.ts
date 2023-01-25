import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocal } from '../encrypt.js';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
export async function AxiosDelete<T>(url: string): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    headers: { 'x-auth-token': await getLocal('token', []) },
  };
  return axios.delete<T>(baseUrl + url, config);
}
