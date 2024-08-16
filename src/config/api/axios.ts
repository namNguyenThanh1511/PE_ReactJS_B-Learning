import axios from "axios";

const api = axios.create({
  baseURL: "https://66bbf8b024da2de7ff690d3f.mockapi.io/api/",
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);
export default api;
