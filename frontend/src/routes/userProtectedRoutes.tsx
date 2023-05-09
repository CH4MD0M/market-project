import React from 'react';

import { IRoute } from '@/types/route';

const EditProfilePage = React.lazy(() => import('@pages/user/EditProfilePage'));
const UserCartDetailPage = React.lazy(() => import('@/pages/user/UserCartDetailsPage'));
const UserOrdersPage = React.lazy(() => import('@/pages/user/UserOrdersPage'));
const UserOrderDetailPage = React.lazy(() => import('@/pages/user/UserOrderDetailsPage'));

export const userProtectedRoutes: IRoute[] = [
  { path: '/user', element: <EditProfilePage /> },
  { path: '/user/cart-details', element: <UserCartDetailPage /> },
  { path: '/user/my-orders', element: <UserOrdersPage /> },
  { path: '/user/order-details', element: <UserOrderDetailPage /> },
];
