import axios, { AxiosError } from 'axios';
import { message } from 'antd';

// 请求缓存池
const requestCache = new Map();

type AxiosRequestConfig = axios.AxiosRequestConfig;
type AxiosResponse = axios.AxiosResponse;

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器（加token + 缓存判断）
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 缓存逻辑：只缓存GET请求
    if (config.method === 'get' && config.url) {
      const cacheKey = config.url;
      // 如果有缓存且未过期（5分钟），直接返回缓存
      if (requestCache.has(cacheKey)) {
        const cacheData = requestCache.get(cacheKey);
        if (Date.now() - cacheData.time < 5 * 60 * 1000) {
          return Promise.reject({ isCache: true, data: cacheData.data });
        }
      }
    }

    // 加token
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器（统一处理错误 + 缓存GET请求）
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 缓存GET请求结果
    if (response.config.method === 'get' && response.config.url) {
      requestCache.set(response.config.url, {
        data: response.data,
        time: Date.now()
      });
    }
    return response.data;
  },
  (error: AxiosError) => {
    // 处理缓存返回
    if (error.isCache) {
      return Promise.resolve(error.data);
    }
    
    const msg = error.message || '请求失败';
    message.error(msg);
    return Promise.reject(error);
  }
);

// 封装请求方法
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.get(url, config);
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return request.post(url, data, config);
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return request.put(url, data, config);
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.delete(url, config);
  },
  // 清除指定缓存
  clearCache: (url: string) => requestCache.delete(url),
  // 清除所有缓存
  clearAllCache: () => requestCache.clear()
};

export default request;