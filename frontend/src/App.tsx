import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalLayout from '@layout/GlobalLayout';

import ProtectedRoutes from '@components/common/ProtectedRoutes';
import { BlockLoginRoutes, PublicRoutes } from '@routes/PublicRoutes';
import { userProtectedRoutes } from '@routes/userProtectedRoutes';
import { adminProtectedRoutes } from '@routes/adminProtectedRoutes';

// Util
import ScrollToTop from '@utils/ScrollToTop';
import { generateRoutes } from '@utils/generateRoutes';
import GlobalStyles from './styles/GlobalStyles';

import LoadingPage from '@pages/LoadingPage';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { loginCheck } from './redux/modules/authSlice/thunk';
import { unwrapResult } from '@reduxjs/toolkit';
import { StorageType, setValue } from './utils/storageUtils';

const App = () => {
  const { userData } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userData) return;

    const fetchLoginCheck = async () => {
      const resultAction = await dispatch(loginCheck());
      const data = unwrapResult(resultAction);
      if (data.userInfo.doNotLogout) setValue(StorageType.LOCAL, 'userInfo', data.userInfo);
      else setValue(StorageType.SESSION, 'userInfo', data.userInfo);
    };

    fetchLoginCheck();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalLayout>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {/* public routes */}
            <Route element={<ProtectedRoutes />}>{generateRoutes(PublicRoutes)}</Route>

            {/* block login routes */}
            <Route element={<ProtectedRoutes blockLogin={true} />}>
              {generateRoutes(BlockLoginRoutes)}
            </Route>

            {/* user protected routes */}
            <Route element={<ProtectedRoutes requireAuth={true} />}>
              {generateRoutes(userProtectedRoutes)}
            </Route>

            {/* admin protected routes */}
            <Route element={<ProtectedRoutes requireAuth={true} requireAdmin={true} />}>
              {generateRoutes(adminProtectedRoutes)}
            </Route>
          </Routes>
        </Suspense>
      </GlobalLayout>
      <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
