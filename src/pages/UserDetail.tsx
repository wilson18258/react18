import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { Card, Spin, Descriptions } from 'antd';

// 直接定义类型
interface UserInfo {
  id: string | number;
  name: string;
  age?: number;
  email: string;
}

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, loading, fetchUserById } = useUserStore();

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id, fetchUserById]);

  if (loading) return <Spin tip="加载中..." />;
  if (!currentUser) return <div>暂无用户信息</div>;

  return (
    <Card title={`用户详情（ID：${id}）`} style={{ marginTop: 20 }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="姓名">{currentUser.name}</Descriptions.Item>
        <Descriptions.Item label="年龄">{currentUser.age || '未知'}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{currentUser.email}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
