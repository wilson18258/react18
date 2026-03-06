import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 全局错误边界：捕获所有子组件错误 */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);