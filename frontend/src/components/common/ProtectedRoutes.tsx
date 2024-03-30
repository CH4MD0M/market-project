import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@hooks/reduxHooks';
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
  const authCheckLoading = useAppSelector(state => state.auth.authCheckLoading);
  const userData = useAppSelector(state => state.user.userData);
  const isLogin = useAppSelector(state => state.auth.isLogin);

  if (authCheckLoading) return <LoadingPage />;
  if (isLogin && blockLogin) return <Navigate to="/" />;
  if (requireAuth && !isLogin) return <Navigate to="/login" replace />;
  if (requireAdmin && !userData?.isAdmin) return <Navigate to="/" />;

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
