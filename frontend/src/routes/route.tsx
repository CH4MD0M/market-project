import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layout/GlobalLayout';
import ProtectedRoutes from '@components/common/ProtectedRoutes';

// publicRoutes
const HomePage = lazy(() => import(/* webpackChunkName: "home" */ '@pages/HomePage'));
const ProductListPage = lazy(
  () => import(/* webpackChunkName: "productList" */ '@pages/ProductListPage'),
);
const ProductDetailPage = lazy(
  () => import(/* webpackChunkName: "productDetail" */ '@pages/ProductDetailPage'),
);
const CartPage = lazy(() => import(/* webpackChunkName: "cart" */ '@pages/CartPage'));
const LoginPage = lazy(() => import(/* webpackChunkName: "login" */ '@pages/LoginPage'));
const RegisterPage = lazy(() => import(/* webpackChunkName: "register" */ '@pages/RegisterPage'));

// userProtectedRoutes
const PurchasePage = lazy(
  () => import(/* webpackChunkName: "userPurchase" */ '@pages/user/PurchasePage'),
);
const EditProfilePage = lazy(
  () => import(/* webpackChunkName: "userEditProfile" */ '@pages/user/UserEditProfilePage'),
);
const UserOrdersPage = lazy(
  () => import(/* webpackChunkName: "userOrders" */ '@pages/user/UserOrdersPage'),
);
const UserOrderDetailPage = lazy(
  () => import(/* webpackChunkName: "userOrderDetails" */ '@pages/user/UserOrderDetailsPage'),
);

// adminProtectedRoutes
const AdminCreateProduct = lazy(
  () => import(/* webpackChunkName: "adminCreateProduct" */ '@pages/admin/AdminCreateProductPage'),
);
const AdminEditProduct = lazy(
  () => import(/* webpackChunkName: "adminEditProduct" */ '@pages/admin/AdminEditProductPage'),
);
const AdminEditUser = lazy(
  () => import(/* webpackChunkName: "adminEditUser" */ '@pages/admin/AdminEditUserPage'),
);
const AdminOrderDetails = lazy(
  () => import(/* webpackChunkName: "adminOrderDetails" */ '@pages/admin/AdminOrderDetailsPage'),
);
const AdminOrders = lazy(
  () => import(/* webpackChunkName: "adminOrders" */ '@pages/admin/AdminOrdersPage'),
);
const AdminProducts = lazy(
  () => import(/* webpackChunkName: "adminProduct" */ '@pages/admin/AdminProductPage'),
);
const AdminUsers = lazy(
  () => import(/* webpackChunkName: "adminUsers" */ '@pages/admin/AdminUserListPage'),
);

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
    element: (
      <ProtectedRoutes requireAuth>
        <GlobalLayout requireAuth />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <UserOrdersPage /> },
      { path: 'purchase', element: <PurchasePage /> },
      { path: 'my-orders', element: <UserOrdersPage /> },
      { path: 'my-orders/:orderId', element: <UserOrderDetailPage /> },
      { path: 'edit-profile', element: <EditProfilePage /> },
    ],
  },

  // adminProtectedRoutes
  {
    path: 'admin/',
    element: (
      <ProtectedRoutes requireAuth requireAdmin>
        <GlobalLayout requireAuth requireAdmin />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <AdminOrders /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'orders/:id', element: <AdminOrderDetails /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'create-new-product', element: <AdminCreateProduct /> },
      { path: 'edit-product/:id', element: <AdminEditProduct /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'edit-user/:id', element: <AdminEditUser /> },
    ],
  },
]);
