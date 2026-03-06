// 完整的类型定义+导出，确保所有地方能拿到
export interface User {
  id: string | number; // 兼容接口返回的数字ID
  name: string;
  age?: number; // 可选，接口返回可能没有
  email: string;
}

// Partial：编辑用户用
export type EditUser = Partial<User>;

// Pick：展示用户用（只取需要的字段）
export type UserInfo = Pick<User, 'id' | 'name' | 'age' | 'email'>;

// Record：存多个用户
export type UserList = Record<string, UserInfo>;

// 按钮Props类型
export interface ButtonProps {
  text: string;
  onClick?: () => void;
  size?: 'small' | 'middle' | 'large';
}
