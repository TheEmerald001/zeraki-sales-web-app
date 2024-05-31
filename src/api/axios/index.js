import axios from "axios";

function createModuleAxios(baseURL) {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return axiosInstance;
}

export const moduleAxios = createModuleAxios("http://localhost:4000")