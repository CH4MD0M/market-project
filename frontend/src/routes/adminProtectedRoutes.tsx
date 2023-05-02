import React from 'react';

import { IRoute } from '@/types/route';
import { Navigate } from 'react-router-dom';

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
  { path: '/admin', element: <Navigate to="/admin/orders" /> },
  { path: '/admin/orders', element: <AdminOrders /> },
  { path: '/admin/analytics', element: <AdminAnalytics /> },
  { path: '/admin/chats', element: <AdminChats /> },
  { path: '/admin/create-new-product', element: <AdminCreateProduct /> },
  { path: '/admin/edit-product/:id', element: <AdminEditProduct /> },
  { path: '/admin/edit-user/:id', element: <AdminEditUser /> },
  { path: '/admin/order-details/:id', element: <AdminOrderDetails /> },
  { path: '/admin/products', element: <AdminProducts /> },
  { path: '/admin/users', element: <AdminUsers /> },
];
