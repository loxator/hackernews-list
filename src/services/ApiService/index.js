import axios from "axios";
import querystring from "querystring";

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (p) => {
    const params = { ...p };
    return querystring.stringify(params, "&", "=", { arrayFormat: "repeat" });
  },
});

const request = (options, byPassError) => {
  const onSuccess = (response) => {
    const { data } = response;

    if (!data) {
      throw new Error("A server error has occurred. Please contact admin.");
    }
    return data;
  };

  const onError = (error) => {
    if (error && error.response) {
      console.error("Error Message:", error.response && error.response.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
