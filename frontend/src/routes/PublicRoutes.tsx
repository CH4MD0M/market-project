import React from 'react';

import { IRoute } from '@/types/route';

const HomePage = React.lazy(() => import('@pages/HomePage'));
const ProductListPage = React.lazy(() => import('@pages/ProductListPage'));
const ProductDetailPage = React.lazy(() => import('@pages/ProductDetailPage'));
const CartPage = React.lazy(() => import('@pages/CartPage'));
const LoginPage = React.lazy(() => import('@pages/LoginPage'));
const RegisterPage = React.lazy(() => import('@pages/RegisterPage'));

const PublicRoutes: IRoute[] = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductListPage /> },
  { path: '/product-details', element: <ProductDetailPage /> },
  { path: '/products/:id', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: '페이지를 찾을 수 없습니다.' },
];

export default PublicRoutes;
