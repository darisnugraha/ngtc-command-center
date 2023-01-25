import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
const baseUrlLogin = process.env.REACT_APP_BACKEND_URL_LOGIN;

export async function AxiosPost<T>(url: string, data: any): Promise<T> {
  const response = await axios.post<T>(baseUrl + url, data);
  return response.data;
}

export async function AxiosPostLogin<T>(url: string, data: any): Promise<T> {
  const response = await axios.post<T>(baseUrlLogin + url, data);
  return response.data;
}
