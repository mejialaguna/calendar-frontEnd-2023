import axios from "axios";

import { getEnvironmentVar } from "../helper";

const { VITE_API_URL } = getEnvironmentVar().envVariable;
const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

/*
    todo: ===========> add interceptors......
*/
if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token')
  calendarApi.interceptors.request.use((config) => {
      config.headers = {
          ...config.headers,
        'x-token': token,
      }
    return config;
      })
    }

export default calendarApi