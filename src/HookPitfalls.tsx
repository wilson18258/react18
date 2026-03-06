 import { useState, useEffect, useMemo, useCallback } from 'react';

const HookPitfalls = () => {
  // 坑1：useEffect依赖数组不全（闭包陷阱）- 错误+正确写法
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 错误写法：依赖数组没写text，导致useEffect里的text永远是初始值（闭包陷阱）
//   useEffect(() => {
//     console.log('错误写法：text=', text); // 无论怎么改text，这里都打印空字符串
//   }, [count]); // 漏写text依赖

  // 正确写法：依赖数组写全所有用到的状态
  useEffect(() => {
    console.log('正确写法：text=', text); // 能正确打印最新的text
  }, [count, text]); // 补全text依赖

  // 坑2：滥用useMemo/useCallback（无需优化的场景强行用）
  const add = (a: number, b: number) => a + b;
  // 错误写法：简单加法无需用useMemo，浪费性能
  const wrongAdd = useMemo(() => add(1, 2), []);
  // 正确写法：简单计算不用优化，复杂计算/组件传参再用
  const rightAdd = add(1, 2);

  // 坑3：useState直接修改对象/数组（不返回新值，不触发渲染）
  const [user, setUser] = useState({ name: '张三', age: 20 });
  const [list, setList] = useState([1, 2, 3]);

  const updateUser = () => {
    // 错误写法：直接修改原对象，不触发组件渲染
    // user.age = 21;
    // setUser(user);

    // 正确写法：返回新对象，触发渲染
    setUser({ ...user, age: 21 });
  };

  const updateList = () => {
    // 错误写法：直接修改原数组，不触发组件渲染
    // list.push(4);
    // setList(list);

    // 正确写法：返回新数组，触发渲染
    setList([...list, 4]);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Hooks 3个高频坑（错误+正确写法）</h3>
      <p>count: {count} <button onClick={() => setCount(prev => prev + 1)}>+1</button></p>
      <p>text: <input value={text} onChange={(e) => setText(e.target.value)} /></p>
      <p>简单加法（无需useMemo）：{rightAdd}</p>
      
      <div style={{ marginTop: '10px' }}>
        <p>用户年龄：{user.age} <button onClick={updateUser}>修改年龄（错误写法，不生效）</button></p>
        <p>列表：{list.join(', ')} <button onClick={updateList}>添加元素（错误写法，不生效）</button></p>
        <p>✅ 注释错误写法，打开正确写法，即可看到渲染效果</p>
      </div>
    </div>
  );
};

export default HookPitfalls;