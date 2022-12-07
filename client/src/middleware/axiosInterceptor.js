import axios from "axios";
import { getStorageItem } from "../services/localstorageService";

// LocalStorageService
// const localStorageService = LocalStorageService.getService();

// Add a request interceptor
let retryTokenRequest = false;

axios.interceptors.request.use(
  (config) => {
    const token = getStorageItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !retryTokenRequest) {
      retryTokenRequest = true;
      return axios
        .get("http://localhost:8080/api/auth/refresh-token", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            retryTokenRequest = true;
            localStorage.setItem("accessToken", res.data.accessToken);

            return axios({
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                Authorization: `Bearer ${res.data.accessToken}`,
              },
              sent: true,
            });
          }
        });
    }
    return Promise.reject(error);
  }
);
