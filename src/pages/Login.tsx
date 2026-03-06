import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, Card } from 'antd';
import { loginApi } from '@/api/login';
import { useUserStore } from '@/store/userStore';

// 直接定义类型
interface EditUser {
  name?: string;
  email?: string;
}

export default function Login() {
  const [form] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { login , setLoading } = useUserStore(); // 从store取login方法

  const handleLogin = async () => {
    try {
      //const values = await form.validateFields();
      setLoading(true); // 先设为加载中
      // 低优先级：调用登录接口
      startTransition(async () => {
        // const res = await loginApi(values);
        // 存token到localStorage
        // localStorage.setItem('token', res.token);
        localStorage.setItem('token', "password");
        // 存用户信息到store
        //  login(res.name, res.token);
         login("admin", "password");
        navigate('/users');
      });
    } catch (error) {
      console.error('登录失败：', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <Card title="用户登录" style={{ width: 400 }}>
        <Form form={form} layout="vertical" onFinish={handleLogin}>
          <Form.Item name="name" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}