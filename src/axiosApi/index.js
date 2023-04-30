import axios from "axios";

import { getEnvironmentVar } from "../helper";

const { VITE_API_URL } = getEnvironmentVar().envVariable;
export const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

/*
    todo: ===========> add interceptors......
*/
