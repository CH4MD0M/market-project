import React, { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { loginCheck } from '@redux/modules/authSlice/thunk';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { StorageType, setValue } from '@utils/storageUtils';

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
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToMainPage = () => {
      navigate('/');
    };

    const fetchLoginCheck = async () => {
      try {
        const resultAction = await dispatch(loginCheck());
        const data = unwrapResult(resultAction);
        if (data.userInfo.doNotLogout) setValue(StorageType.LOCAL, 'userInfo', data.userInfo);
        else setValue(StorageType.SESSION, 'userInfo', data.userInfo);
      } catch (error) {
        redirectToMainPage();
      }
    };

    if (document.cookie.split('; ').find(row => row.startsWith('access_token='))) {
      fetchLoginCheck();
    }
  }, [dispatch, isLogin]);

  if (loading) {
    return <LoadingPage />;
  }

  if (isLogin && blockLogin) return <Navigate to="/" />;
  if (requireAuth && !isLogin) return <Navigate to="/login" />;
  if (requireAdmin && role !== 'admin') return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoutes;
