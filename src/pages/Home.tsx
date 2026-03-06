import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>首页</h2>
      {/* 1. 带动态参数跳转 */}
      <button onClick={() => navigate('/users/1001')}>去用户1001</button>
      {/* 2. 带查询参数跳转 */}
      <button onClick={() => navigate('/users?name=张三')}>去张三的用户页</button>
      <button onClick={() => navigate('/login')}>去登录页</button>
    </div>
  );
}
