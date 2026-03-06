import {  Suspense } from 'react';
import AppRouter from './router';
import 'antd/dist/reset.css'; // 引入AntD样式

// 全局加载中提示
const Loading = () => <div style={{ textAlign: 'center', marginTop: 50 }}>全局加载中...</div>;

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;