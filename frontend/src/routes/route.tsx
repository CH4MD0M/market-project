import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoutes from '@components/common/ProtectedRoutes';
import GlobalLayout from '@layout/Layout';

// publicRoutes
const HomePage = lazy(() => import(/* webpackChunkName: "home" */ '@pages/HomePage'));
const ProductListPage = lazy(
  () => import(/* webpackChunkName: "productList" */ '@/pages/ProductListPage'),
);
const ProductDetailPage = lazy(
  () => import(/* webpackChunkName: "productDetail" */ '@/pages/ProductDetailPage'),
);
const CartPage = lazy(() => import(/* webpackChunkName: "cart" */ '@pages/CartPage'));
const LoginPage = lazy(() => import(/* webpackChunkName: "login" */ '@pages/LoginPage'));
const RegisterPage = lazy(() => import(/* webpackChunkName: "register" */ '@pages/RegisterPage'));

// userProtectedRoutes
const EditProfilePage = lazy(
  () => import(/* webpackChunkName: "userEditProfile" */ '@pages/user/EditProfilePage'),
);
const UserPerchasePage = lazy(
  () => import(/* webpackChunkName: "userPerchase" */ '@pages/user/UserPerchasePage'),
);
const UserOrdersPage = lazy(
  () => import(/* webpackChunkName: "userOrders" */ '@pages/user/UserOrdersPage'),
);
const UserOrderDetailPage = lazy(
  () => import(/* webpackChunkName: "userOrderDetails" */ '@pages/user/UserOrderDetailsPage'),
);

// adminProtectedRoutes
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/:pageNumParam', element: <ProductListPage /> },
      { path: 'products/category/:categoryName', element: <ProductListPage /> },
      { path: 'products/category/:categoryName/:pageNumParam', element: <ProductListPage /> },
      { path: 'product-details/:id', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },

      // blockLoginRoutes
      {
        element: <ProtectedRoutes blockLogin />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
    ],
  },

  // userProtectedRoutes
  {
    path: 'user/',
    element: <ProtectedRoutes requireAuth />,
    children: [
      { index: true, element: <UserOrdersPage /> },
      { path: 'my-orders', element: <UserOrdersPage /> },
      { path: 'my-orders/:orderId', element: <UserOrderDetailPage /> },
      { path: 'edit-profile', element: <EditProfilePage /> },
      { path: 'my-purchases', element: <UserPerchasePage /> },
    ],
  },

  // adminProtectedRoutes
  {
    path: 'admin/',
    element: <ProtectedRoutes requireAuth requireAdmin />,
    children: [
      { index: true, path: 'orders', element: <AdminOrders /> },
      { path: 'orders/:id', element: <AdminOrderDetails /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'products/create', element: <AdminCreateProduct /> },
      { path: 'products/:id/edit', element: <AdminEditProduct /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'users/:id/edit', element: <AdminEditUser /> },
    ],
  },
]);
