import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { loginCheck } from '@redux/modules/authSlice/thunk';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import LoadingPage from '@pages/LoadingPage';

type ProtectedRoutesProps = {
  requireAdmin?: boolean;
  requireAuth?: boolean;
  blockLogin?: boolean;
};

const ProtectedRoutes = ({
  requireAdmin = false,
  requireAuth = false,
  blockLogin = false,
}: ProtectedRoutesProps) => {
  const { isLogin, loading } = useAppSelector(state => state.auth);
  const { role } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      await dispatch(loginCheck());
    };

    checkLogin();
  }, [dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  if (isLogin && blockLogin) return <Navigate to="/" />;
  if (requireAuth && !isLogin) return <Navigate to="/login" />;
  if (requireAdmin && role !== 'admin') return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoutes;
