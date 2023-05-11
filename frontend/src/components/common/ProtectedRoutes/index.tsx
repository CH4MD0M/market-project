import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { loginCheck } from '@redux/modules/authSlice/thunk';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import UserChat from '@components/chat/UserChat';

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
  const { role, isLogin } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      await dispatch(loginCheck());
      setLoading(false);
    };
    checkLogin();
  }, [dispatch]);

  if (loading) {
    // TODO: Loading Page 생성
    return <div>Loading...</div>;
  }

  if (isLogin && blockLogin) return <Navigate to="/" />;
  if (requireAuth && !isLogin) return <Navigate to="/login" />;
  if (requireAdmin && role !== 'admin') return <Navigate to="/" />;

  return isLogin && requireAdmin && role === 'admin' ? (
    <Outlet />
  ) : (
    <>
      <Outlet />
      <UserChat />
    </>
  );
};

export default ProtectedRoutes;
