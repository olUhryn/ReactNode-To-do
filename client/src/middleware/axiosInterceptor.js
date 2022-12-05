import axios from "axios";
import { getStorageItem } from "../services/localstorageService";

// LocalStorageService
// const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = getStorageItem('accessToken');
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

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === "http://127.0.0.1:3000/v1/auth/token"
//     ) {
//     //   router.push("/login");
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorageService.getRefreshToken();
//       return axios
//         .post("/auth/token", {
//           refresh_token: refreshToken,
//         })
//         .then((res) => {
//           if (res.status === 201) {
//             localStorageService.setToken(res.data);
//             axios.defaults.headers.common["Authorization"] =
//               "Bearer " + localStorageService.getAccessToken();
//             return axios(originalRequest);
//           }
//         });
//     }
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     throw new Error(err.response.data.message);
//   }
// );

// const err = await axios.get("http://example.com/notfound").catch((err) => err);
