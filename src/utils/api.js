import axios from "axios";

let BASE_URL = process.env.REACT_APP_SERVER_URI;
const DEFAULT_OPTIONS = {
  crossDomain: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
};

const api = {
  request: async function({ url, method, data = {}, ...rest }) {
    try {
      const response = await axios({
        ...DEFAULT_OPTIONS,
        url: BASE_URL + url,
        method: method || "get",
        data,
        headers: {
          ...DEFAULT_OPTIONS.headers
        },
        ...rest
      });

      if (response.status >= 400) throw response;

      return { data: response.data };
    } catch (error) {
      if (error.response.status === 500) {
        window.location.reload();
      }

      return { error };
    }
  },
  payments: {
    fetch: async function() {
      const { error, data } = await api.request({
        url: `payments`,
        method: "GET"
      });
      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve(data);
    },
    create: async function(formData) {
      const { error, data } = await api.request({
        url: `payments`,
        method: "POST",
        data: formData
      });

      if (error) {
        throw new Error(error);
      }

      return data;
    },
    delete: async function(idPayment) {
      const { error, data } = await api.request({
        url: `payments/${idPayment}`,
        method: "DELETE"
      });

      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve(data);
    }
  }
};

export default api;
