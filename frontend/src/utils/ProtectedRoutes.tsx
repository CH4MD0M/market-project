import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

type ProtectedRoutesProps = {
  admin: boolean;
};

const ProtectedRoutes = ({ admin }: ProtectedRoutesProps): React.ReactElement => {
  let auth = false;

  if (admin) {
    let adminAuth = true;
    if (adminAuth) auth = true;
  } else {
    let userAuth = true;
    if (userAuth) auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;