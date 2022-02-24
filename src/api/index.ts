import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axiosInstance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let token = localStorage.getItem('token');

    if (!token) return config;
    if (isTokenExpired(token)) token = refreshToken(token);

    return setDefaultHeaders(config, token);
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Todos
    // 응답 에러 처리
    // -> 서버/네트워크 에러
    // -> 상태코드별 구체적 대응
    if (!error.response) {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

const setDefaultHeaders = (config: AxiosRequestConfig, token: string) => {
  if (!config || !config.headers) {
    throw new Error('Headers do not exist on axios.');
  }
  config.headers.Authorization = `${token}`;
  return config;
};

const isTokenExpired = (token: string) => {
  return token;
};

const refreshToken = (token: string) => {
  return token;
};

const apiGet = (
  url: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return axiosInstance.get(url, options);
};

const apiPost = <RequestBody>(
  url: string,
  body?: RequestBody,
  options?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return axiosInstance.post(url, body, options);
};

const apiPut = <RequestBody>(
  url: string,
  body?: RequestBody,
  options?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return axiosInstance.put(url, body, options);
};

const apiDelete = (
  url: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return axiosInstance.delete(url, options);
};

export { apiGet, apiPost, apiPut, apiDelete };
