import { IRoute } from '@/types/route';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const AdminAnalytics = lazy(
  () => import(/* webpackChunkName: "adminAnalytics" */ '@pages/admin/Analytics'),
);
const AdminChats = lazy(() => import(/* webpackChunkName: "adminChat" */ '@pages/admin/Chat'));
const AdminCreateProduct = lazy(
  () => import(/* webpackChunkName: "adminCreateProduct" */ '@pages/admin/CreateProduct'),
);
const AdminEditProduct = lazy(
  () => import(/* webpackChunkName: "adminEditProduct" */ '@pages/admin/EditProduct'),
);
const AdminEditUser = lazy(
  () => import(/* webpackChunkName: "adminEditUser" */ '@pages/admin/EditUser'),
);
const AdminOrderDetails = lazy(
  () => import(/* webpackChunkName: "adminOrderDetails" */ '@pages/admin/OrderDetails'),
);
const AdminOrders = lazy(() => import(/* webpackChunkName: "adminOrders" */ '@pages/admin/Orders'));
const AdminProducts = lazy(
  () => import(/* webpackChunkName: "adminProduct" */ '@pages/admin/Products'),
);
const AdminUsers = lazy(() => import(/* webpackChunkName: "adminUsers" */ '@pages/admin/Users'));

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
