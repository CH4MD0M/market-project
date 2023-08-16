import { lazy } from 'react';
import { IRoute } from '@/types/route';

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

const PublicRoutes: IRoute[] = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductListPage /> },
  { path: '/products/:pageNumParam', element: <ProductListPage /> },
  { path: '/products/category/:categoryName', element: <ProductListPage /> },
  { path: '/products/category/:categoryName/:pageNumParam', element: <ProductListPage /> },
  { path: '/products/search/:searchQuery', element: <ProductListPage /> },
  { path: '/products/search/:searchQuery/:pageNumParam', element: <ProductListPage /> },
  { path: '/products/category/:categoryName/search/:searchQuery', element: <ProductListPage /> },
  {
    path: '/products/category/:categoryName/search/:searchQuery/:pageNumParam',
    element: <ProductListPage />,
  },
  { path: '/product-details/:id', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '*', element: '페이지를 찾을 수 없습니다.' },
];

const BlockLoginRoutes: IRoute[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
];

export { PublicRoutes, BlockLoginRoutes };
