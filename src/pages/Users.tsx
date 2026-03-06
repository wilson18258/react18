import { useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams, Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { Table, Button, Spin, Space } from 'antd';
import TableSkeleton from '@/components/Skeleton/TableSkeleton';

// 类型定义
interface UserInfo {
  id: string | number;
  name: string;
  age?: number;
  email: string;
}

export default function Users() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('name');
  const navigate = useNavigate();

  const { userList, loading, fetchUserList } = useUserStore();

  // 只在fetchUserList变化时重新创建
  const loadUserList = useCallback(() => {
    fetchUserList();
  }, [fetchUserList]);

  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  // 表格列配置：用useMemo缓存，避免每次渲染重新创建
  const columns = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserInfo) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/users/${record.id}/detail`)}>查看详情</Button>
        </Space>
      ),
    },
  ], [navigate]);

  // 数据缓存：只在userList变化时重新处理
  const tableData = useMemo(() => userList, [userList]);

  //if (loading) return <TableSkeleton />;

  return (
    <div style={{ marginTop: 20 }}>
      <h2>用户列表页</h2>
      <p>动态路由ID：{id || '无'}</p>
      <p>查询参数姓名：{userName || '无'}</p>
      
      <Table 
        columns={columns} 
        dataSource={tableData} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
      />
      
      {/* {id && (
        <Button 
          type="primary" 
          onClick={() => navigate(`/users/${id}/detail`)}
          style={{ marginTop: 20 }}
        >
          查看用户详情
        </Button>
      )} */}
      
      <Outlet />
    </div>
  );
}