import axios from "axios";
import jwtDecode from "jwt-decode";
import accountApi from "../modules/account.api";

const baseURL = "http://127.0.0.1:3050/api/";

const privateClient = axios.create({
  baseURL,
  // paramsSerializer: {
  //   encode: (params) => queryString.stringify(params),
  // },
});

privateClient.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("actkn");
  const decode = jwtDecode(accessToken);
  if (decode.exp * 1000 < new Date().getTime()) {
    const response = await accountApi.refreshToken();
    accessToken = response.response.data;
  }
  return {
    ...config,
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
});

// privateClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) return response.data;
//     return response;
//   },
//   (err) => {
//     throw err.response.data;
//   }
// );

export default privateClient;
