import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// 全局错误边界组件（捕获子组件错误）
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  // 捕获错误
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // 记录错误
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary捕获错误：', error, errorInfo);
    // 可在这里上报错误到监控平台
  }

  // 重置错误状态
  private resetError = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload(); // 刷新页面
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="页面出错了"
          subTitle={this.state.error?.message || '未知错误'}
          extra={
            <Button type="primary" onClick={this.resetError}>
              刷新页面
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;