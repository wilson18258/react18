import { http } from '../utils/request';

// 直接在当前文件定义类型，不用导入
interface UserInfo {
  id: string | number;
  name: string;
  age?: number;
  email: string;
}

// 获取用户列表
export const getUserList = () => {
  return http.get<UserInfo[]>('/users');
};

// 获取单个用户
export const getUserById = (id: string | number) => {
  return http.get<UserInfo>(`/users/${id}`);
};
