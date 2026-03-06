import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import TableSkeleton from '@/components/Skeleton/TableSkeleton';

// 懒加载页面（加加载提示）
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Users = lazy(() => import('../pages/Users'));
const UserDetail = lazy(() => import('../pages/UserDetail'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 权限守卫组件
// const AuthGuard = () => {
//   const token = localStorage.getItem('token');
//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };

// 全局加载组件
const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <Spin size="large" tip="页面加载中..." />
  </div>
);

// 路由配置
const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <AuthGuard />,
//     children: [
//       {
//         path: '/',
//         element: <Navigate to="/users" replace />,
//       },
//       {
//         path: 'users',
//         element: (
//           <Suspense fallback={<Loading />}> {/* 表格骨架屏 */}
//             <Users />
//           </Suspense>
//         ),
//         children: [
//           {
//             path: ':id/detail',
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <UserDetail />
//               </Suspense>
//             ),
//           },
//         ],
//       },
//     ],
//   },
    {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
    },
  {
    path: '/users',
    element: (
      <Suspense fallback={<Loading />}>
        <Users />
      </Suspense>
    ),
  },
  {
    path: '/users/:id/detail',
    element: (
      <Suspense fallback={<Loading />}>
        <UserDetail />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
], {
  future: {
    v7_startTransition: false,
  }
});

export default function AppRouter() {
  return <RouterProvider router={router} />;
}