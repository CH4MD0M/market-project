import { lazy } from 'react';
import { IRoute } from '@/types/route';
import { Navigate } from 'react-router-dom';

const EditProfilePage = lazy(() => import('@pages/user/EditProfilePage'));
const UserPerchasePage = lazy(() => import('@pages/user/UserPerchasePage'));
const UserOrdersPage = lazy(() => import('@pages/user/UserOrdersPage'));
const UserOrderDetailPage = lazy(() => import('@pages/user/UserOrderDetailsPage'));
const UserServicePage = lazy(() => import('@pages/user/UserServicePage'));

export const userProtectedRoutes: IRoute[] = [
  { path: '/user', element: <Navigate to="/user/my-orders" /> },
  { path: '/user/edit-profile', element: <EditProfilePage /> },
  { path: '/user/cart-details', element: <UserPerchasePage /> },
  { path: '/user/my-orders', element: <UserOrdersPage /> },
  { path: '/user/order-details/:id', element: <UserOrderDetailPage /> },
  { path: '/user/service', element: <UserServicePage /> },
];
