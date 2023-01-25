import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function AxiosPut<T>(url: string, data: any): Promise<T> {
  const response = await axios.put<T>(baseUrl + url, data);
  return response.data;
}
