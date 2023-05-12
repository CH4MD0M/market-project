import React from 'react';

import { IRoute } from '@/types/route';
import { Navigate } from 'react-router-dom';

const EditProfilePage = React.lazy(() => import('@pages/user/EditProfilePage'));
const UserCartPage = React.lazy(() => import('@pages/user/UserCartPage'));
const UserOrdersPage = React.lazy(() => import('@pages/user/UserOrdersPage'));
const UserOrderDetailPage = React.lazy(() => import('@pages/user/UserOrderDetailsPage'));
const UserServicePage = React.lazy(() => import('@pages/user/UserServicePage'));

export const userProtectedRoutes: IRoute[] = [
  { path: '/user', element: <Navigate to="/user/my-orders" /> },
  { path: '/user/edit-profile', element: <EditProfilePage /> },
  { path: '/user/cart-details', element: <UserCartPage /> },
  { path: '/user/my-orders', element: <UserOrdersPage /> },
  { path: '/user/order-details/:id', element: <UserOrderDetailPage /> },
  { path: '/user/service', element: <UserServicePage /> },
];
