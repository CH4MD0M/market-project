import React from 'react';

import { IRoute } from '@/types/route';

const UserProfilePage = React.lazy(() => import('@pages/User/UserProfilePage'));
const UserCartDetailPage = React.lazy(() => import('@pages/User/UserCartDetailsPage'));
const UserOrdersPage = React.lazy(() => import('@pages/User/UserOrdersPage'));
const UserOrderDetailPage = React.lazy(() => import('@pages/User/UserOrderDetailsPage'));

export const userProtectedRoutes: IRoute[] = [
  { path: '/user', element: <UserProfilePage /> },
  { path: '/user/cart-details', element: <UserCartDetailPage /> },
  { path: '/user/my-orders', element: <UserOrdersPage /> },
  { path: '/user/order-details', element: <UserOrderDetailPage /> },
];
