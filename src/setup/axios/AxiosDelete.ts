import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocal } from '../encrypt.js';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
export async function AxiosDelete<T>(url: string): Promise<AxiosResponse<T>> {
  const token = await getLocal('token', []);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.delete<T>(baseUrl + url, config);
}
