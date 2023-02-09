import axios, { AxiosRequestConfig } from 'axios';
import { getLocal } from '../encrypt.js';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function AxiosPut<T>(url: string, data: any): Promise<T> {
  const token = await getLocal('token', []);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 1 },
  };
  const response = await axios.put<T>(baseUrl + url, data, config);
  return response.data;
}
