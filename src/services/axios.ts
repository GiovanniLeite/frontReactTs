/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import apiUrl from '../config/api';

export default axios.create({
  baseURL: apiUrl,
});

export type AxiosResponseProps = {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
};
