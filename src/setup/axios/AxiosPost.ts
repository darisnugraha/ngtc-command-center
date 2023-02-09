import axios, { AxiosRequestConfig } from 'axios';
import { getLocal } from '../encrypt.js';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
const baseUrlLogin = process.env.REACT_APP_BACKEND_URL_LOGIN;

export async function AxiosPost<T>(url: string, data: any): Promise<T> {
  const token = await getLocal('token', []);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 1 },
  };
  const response = await axios.post<T>(baseUrl + url, data, config);
  return response.data;
}

export async function AxiosPostLogin<T>(url: string, data: any): Promise<T> {
  const response = await axios.post<T>(baseUrlLogin + url, data);
  return response.data;
}
