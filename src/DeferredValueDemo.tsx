import { useState, useDeferredValue } from 'react';

// 模拟大数据渲染（耗时操作）
const BigList = ({ list }: { list: string[] }) => {
  // 模拟渲染耗时（刻意放慢，方便看到效果）
  const start = performance.now();
  while (performance.now() - start < 10);

  return (
    <ul style={{ marginTop: '20px' }}>
      {list.slice(0, 100).map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

const DeferredValueDemo = () => {
  const [input, setInput] = useState('');
  // 生成10万条测试数据
  const bigList = Array.from({ length: 100000 }, (_, i) => `列表项 ${i}`);
  // 用useDeferredValue标记低优先级值：筛选后的列表
  const deferredList = useDeferredValue(
    bigList.filter(item => item.includes(input))
  );

  return (
    <div>
      <h3>useDeferredValue 演示（和useTransition互补）</h3>
      {/* 高优先级：输入框，不卡顿 */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="搜索10万条数据（不卡顿）"
      />
      {/* 低优先级：大数据列表，延迟更新，不阻塞输入 */}
      <BigList list={deferredList} />
    </div>
  );
};

export default DeferredValueDemo;