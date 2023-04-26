import React from 'react';

import { IRoute } from '@/types/route';

const AdminAnalyticsPage = React.lazy(() => import('@pages/admin/AdminAnalyticsPage'));
const AdminChatsPage = React.lazy(() => import('@pages/admin/AdminChatsPage'));
const AdminCreateProductPage = React.lazy(() => import('@pages/admin/AdminCreateProductPage'));
const AdminEditProductPage = React.lazy(() => import('@pages/admin/AdminEditProductPage'));
const AdminEditUserPage = React.lazy(() => import('@pages/admin/AdminEditUserPage'));
const AdminOrderDetailsPage = React.lazy(() => import('@pages/admin/AdminOrderDetailsPage'));
const AdminOrdersPage = React.lazy(() => import('@pages/admin/AdminOrdersPage'));
const AdminProductsPage = React.lazy(() => import('@pages/admin/AdminProductsPage'));
const AdminUsersPage = React.lazy(() => import('@pages/admin/AdminUsersPage'));

export const adminProtectedRoutes: IRoute[] = [
  { path: '/admin', element: <AdminAnalyticsPage /> },
  { path: '/admin/chats', element: <AdminChatsPage /> },
  { path: '/admin/create-new-product', element: <AdminCreateProductPage /> },
  { path: '/admin/edit-product', element: <AdminEditProductPage /> },
  { path: '/admin/edit-user', element: <AdminEditUserPage /> },
  { path: '/admin/order-details', element: <AdminOrderDetailsPage /> },
  { path: '/admin/orders', element: <AdminOrdersPage /> },
  { path: '/admin/products', element: <AdminProductsPage /> },
  { path: '/admin/users', element: <AdminUsersPage /> },
];
