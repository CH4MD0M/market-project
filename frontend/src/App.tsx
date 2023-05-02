import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalLayout from '@layout/GlobalLayout';

import { userProtectedRoutes } from '@routes/userProtectedRoutes';
import { adminProtectedRoutes } from '@routes/adminProtectedRoutes';

// Util
import ScrollToTop from '@utils/ScrollToTop';
import { generateRoutes } from '@utils/generateRoutes';
import ProtectedRoutes from '@components/common/ProtectedRoutes';
import UserChatRoutes from '@components/common/UserChatRoutes';
import { PublicRoutes } from '@routes/PublicRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* public routes */}
            <Route element={<UserChatRoutes />}>{generateRoutes(PublicRoutes)}</Route>

            {/* user protected routes */}
            <Route element={<ProtectedRoutes admin={false} />}>
              {generateRoutes(userProtectedRoutes)}
            </Route>

            {/* admin protected routes */}
            <Route element={<ProtectedRoutes admin={true} />}>
              {generateRoutes(adminProtectedRoutes)}
            </Route>
          </Routes>
        </Suspense>
      </GlobalLayout>
    </BrowserRouter>
  );
};

export default App;
