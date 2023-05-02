import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import UserChat from '@components/chat/UserChat';

type ProtectedRoutesProps = {
  admin: boolean;
};

const ProtectedRoutes = ({ admin }: ProtectedRoutesProps) => {
  const isAuth = 'admin';

  if (!isAuth) return <Navigate to="/login" />;
  return isAuth && admin && isAuth !== 'admin' ? (
    <Navigate to="/login" />
  ) : isAuth && admin ? (
    <Outlet />
  ) : isAuth && !admin ? (
    <>
      <UserChat />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
