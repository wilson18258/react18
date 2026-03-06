import { Skeleton, Table } from 'antd';
import React from 'react';

// 表格骨架屏组件
const TableSkeleton = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '姓名', dataIndex: 'name', key: 'name', width: 120 },
    { title: '邮箱', dataIndex: 'email', key: 'email', width: 200 },
    { title: '操作', dataIndex: 'action', key: 'action', width: 100 },
  ];

  // 生成骨架屏数据
  const skeletonData = Array(5).fill(0).map((_, index) => ({
    id: <Skeleton.Input active />,
    name: <Skeleton.Input active />,
    email: <Skeleton.Input active />,
    action: <Skeleton.Button active />,
    key: index,
  }));

  return <Table columns={columns} dataSource={skeletonData} rowKey="key" />;
};

export default TableSkeleton;