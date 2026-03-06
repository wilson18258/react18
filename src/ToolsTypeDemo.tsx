import { useState } from 'react';

// 基础用户类型
interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
}

export default function ToolsTypeDemo() {
  // 1. Partial：所有属性可选（编辑表单用）
  type PartialUser = Partial<User>;
  const [editUser, setEditUser] = useState<PartialUser>({ name: '张三' });

  // 2. Pick：挑选指定属性（展示信息用）
  type UserInfo = Pick<User, 'name' | 'age' | 'email'>;
  const userInfo: UserInfo = { name: '张三', age: 20, email: 'zs@test.com' };

  // 3. Omit：排除指定属性（注册表单用）
  type UserForm = Omit<User, 'id'>;
  const [form, setForm] = useState<UserForm>({ name: '', age: 0, email: '', password: '' });

  // 4. Record：键值对对象（存多个用户）
  type UserMap = Record<string, UserInfo>;
  const userMap: UserMap = {
    '1001': { name: '张三', age: 20, email: 'zs@test.com' },
    '1002': { name: '李四', age: 22, email: 'ls@test.com' }
  };

  return (
    <div style={{ marginTop: 20, padding: 10, borderTop: '1px solid #eee' }}>
      <h3>TS 4个核心工具类型</h3>
      <p>Partial（可选）：{editUser.name}</p>
      <p>Pick（挑选）：{userInfo.name} / {userInfo.age}</p>
      <p>Omit（排除）：<input placeholder="姓名" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></p>
      <p>Record（键值对）：{userMap['1001'].name}</p>
    </div>
  );
}