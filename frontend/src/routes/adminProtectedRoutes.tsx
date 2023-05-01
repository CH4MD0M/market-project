import React from 'react';

import { IRoute } from '@/types/route';

const AdminAnalytics = React.lazy(() => import('@pages/Admin/Analytics'));
const AdminChats = React.lazy(() => import('@pages/Admin/Chat'));
const AdminCreateProduct = React.lazy(() => import('@pages/Admin/CreateProduct'));
const AdminEditProduct = React.lazy(() => import('@pages/Admin/EditProduct'));
const AdminEditUser = React.lazy(() => import('@pages/Admin/EditUser'));
const AdminOrderDetails = React.lazy(() => import('@pages/Admin/OrderDetails'));
const AdminOrders = React.lazy(() => import('@pages/Admin/Orders'));
const AdminProducts = React.lazy(() => import('@pages/Admin/Products'));
const AdminUsers = React.lazy(() => import('@/pages/Admin/Users'));

export const adminProtectedRoutes: IRoute[] = [
  { path: '', element: <AdminAnalytics /> },
  { path: 'chats', element: <AdminChats /> },
  { path: 'create-new-product', element: <AdminCreateProduct /> },
  { path: 'edit-product/:id', element: <AdminEditProduct /> },
  { path: 'edit-user', element: <AdminEditUser /> },
  { path: 'order-details', element: <AdminOrderDetails /> },
  { path: 'orders', element: <AdminOrders /> },
  { path: 'products', element: <AdminProducts /> },
  { path: 'users', element: <AdminUsers /> },
];
