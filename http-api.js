import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import envs from '../config/env';
// import {LOGOUT} from '../constants/routeNames';
import { navigate } from "./RootNavigator.js";

let headers = {};

const APIKit = axios.create({
  baseURL: "https://api.wrdpwd.com",
  headers,
});

APIKit.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

APIKit.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 403 || error.response.status === 401) {
      AsyncStorage.removeItem("@storage_Key");
      AsyncStorage.removeItem("token");
      APIKit.interceptors.request.clear();
      navigate("Login");
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default APIKit;
