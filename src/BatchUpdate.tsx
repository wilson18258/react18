import { useState } from 'react';

const BatchUpdate = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // React 18自动批处理：多个setState合并为一次渲染
  const handleClick = () => {
    console.log('点击按钮，开始更新状态');
    // 以下3个状态更新，React 18会自动批处理，只触发1次渲染
    setCount1(prev => prev + 1);
    setCount2(prev => prev + 1);
    setCount1(prev => prev + 1);
  };

  // 打印渲染次数（验证批处理）
  console.log('组件渲染了');

  return (
    <div style={{ marginTop: '20px' }}>
      <p>count1: {count1}</p>
      <p>count2: {count2}</p>
      <button onClick={handleClick}>点击更新状态</button>
      <p>✅ React 18自动批处理：点击按钮后，控制台只打印1次“组件渲染了”</p>
    </div>
  );
};

export default BatchUpdate;