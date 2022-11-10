
import axios from "axios";

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  // baseURL: "http://3.99.155.126:8080",
  // baseURL: "http://210.18.189.94:8080",

  baseURL: "https://api.wrdpwd.com",
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  APIKit.interceptors.request.use( (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(
      "🚀 ~ file: http-api.js ~ line 15 ~ config",
      config.headers.Authorization
    );
    return config;
  });
};

