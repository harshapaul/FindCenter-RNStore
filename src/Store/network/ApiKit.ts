import { BASE_URL } from './contants';
import { LOGIN } from './contants';
import axios from 'axios';
import wretch from 'wretch';

//for api calls using wretch
export const LoginApi = wretch(`${BASE_URL}${LOGIN}`);
export const baseApi = wretch(BASE_URL);

//axios object for api calls using axios
export const APIKit = axios.create({            
  baseURL: `${BASE_URL}`,
  timeout: 10000,
});

//axios api config params
export const apiConfig = {withCredentials: true};

