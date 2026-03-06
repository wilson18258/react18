import { http } from '@/utils/request';

// 登录接口
export const loginApi = (data: { name: string; email: string }) => {
  return http.post('/login', data);
};