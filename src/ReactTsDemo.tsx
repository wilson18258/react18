import { useState } from 'react';

// 1. 组件Props类型
interface ButtonProps {
  text: string;
  onClick?: () => void;
  size?: 'small' | 'middle' | 'large';
}

const MyButton = ({ text, onClick, size = 'middle' }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      style={{ padding: size === 'small' ? '4px 8px' : size === 'large' ? '8px 16px' : '6px 12px' }}
    >
      {text}
    </button>
  );
};

// 2. 事件类型
const InputDemo = () => {
  const [val, setVal] = useState('');
  
  // 输入框事件类型
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <input value={val} onChange={handleInput} placeholder="输入测试" />
      <MyButton text="点击" onClick={() => console.log(val)} size="large" />
    </div>
  );
};

export default function ReactTsDemo() {
  return (
    <div style={{ marginTop: 20, padding: 10, borderTop: '1px solid #eee' }}>
      <h3>React + TS 核心类型</h3>
      <MyButton text="基础按钮" size="small" />
      <InputDemo />
    </div>
  );
}