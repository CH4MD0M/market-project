import React from 'react';

import { IRoute } from '@/types/route';
import { Navigate } from 'react-router-dom';

const AdminAnalytics = React.lazy(() => import('@pages/admin/Analytics'));
const AdminChats = React.lazy(() => import('@pages/admin/Chat'));
const AdminCreateProduct = React.lazy(() => import('@pages/admin/CreateProduct'));
const AdminEditProduct = React.lazy(() => import('@pages/admin/EditProduct'));
const AdminEditUser = React.lazy(() => import('@pages/admin/EditUser'));
const AdminOrderDetails = React.lazy(() => import('@pages/admin/OrderDetails'));
const AdminOrders = React.lazy(() => import('@pages/admin/Orders'));
const AdminProducts = React.lazy(() => import('@pages/admin/Products'));
const AdminUsers = React.lazy(() => import('@pages/admin/Users'));

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
