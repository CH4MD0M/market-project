import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { loginCheck } from '@redux/modules/authSlice/thunk';

import LoadingPage from '@pages/LoadingPage';

type ProtectedRoutesProps = {
  requireAdmin?: boolean;
  requireAuth?: boolean;
  blockLogin?: boolean;
  children?: React.ReactNode;
};

const ProtectedRoutes = ({
  requireAdmin = false,
  requireAuth = false,
  blockLogin = false,
  children,
}: ProtectedRoutesProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const userData = useAppSelector(state => state.user.userData);
  const isLogin = useAppSelector(state => state.auth.isLogin);

  useEffect(() => {
    const checkLogin = async () => {
      await dispatch(loginCheck());
      setIsLoading(false);
    };

    checkLogin();
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;
  if (isLogin && blockLogin) return <Navigate to="/" />;
  if (requireAuth && !isLogin) return <Navigate to="/login" replace />;
  if (requireAdmin && !userData?.isAdmin) return <Navigate to="/" />;

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
