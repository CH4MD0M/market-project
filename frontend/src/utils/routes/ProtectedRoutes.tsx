import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import UserChat from '@/components/chat/UserChat';

type ProtectedRoutesProps = {
  admin: boolean;
};

const ProtectedRoutes = ({ admin }: ProtectedRoutesProps) => {
  if (admin) {
    let adminAuth = true;
    return adminAuth ? <Outlet /> : <Navigate to="/login" />;
  } else {
    let userAuth = true;
    return userAuth ? (
      <>
        <UserChat />
        <Outlet />
      </>
    ) : (
      <Navigate to="/login" />
    );
  }
};

export default ProtectedRoutes;
