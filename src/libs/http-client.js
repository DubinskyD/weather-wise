import Axios from "axios";

const options = {
  baseURL: process.env.VUE_APP_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const httpClient = Axios.create(options);

const ApiClient = {
  get(url, conf = {}) {
    return httpClient.get(url, conf);
  },

  put(url, data = {}, conf = {}) {
    return httpClient.put(url, data, conf);
  },

  delete(url, conf = {}) {
    return httpClient.delete(url, conf);
  },

  post(url, data = {}, conf = {}) {
    return httpClient.post(url, data, conf);
  },

  patch(url, data = {}, conf = {}) {
    return httpClient.patch(url, data, conf);
  },
};

export default ApiClient;
