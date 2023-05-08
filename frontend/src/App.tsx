import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalLayout from '@layout/GlobalLayout';

import ProtectedRoutes from '@components/common/ProtectedRoutes';
import { BlockLoginRoutes, PublicRoutes } from '@routes/PublicRoutes';
import { userProtectedRoutes } from '@routes/userProtectedRoutes';
import { adminProtectedRoutes } from '@routes/adminProtectedRoutes';

// Util
import ScrollToTop from '@utils/ScrollToTop';
import { generateRoutes } from '@utils/generateRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* public routes */}
            <Route element={<ProtectedRoutes />}>{generateRoutes(PublicRoutes)}</Route>

            {/* block login routes */}
            <Route element={<ProtectedRoutes blockLogin={true} />}>
              {generateRoutes(BlockLoginRoutes)}
            </Route>

            {/* user protected routes */}
            <Route element={<ProtectedRoutes requireAuth={true} requireAdmin={false} />}>
              {generateRoutes(userProtectedRoutes)}
            </Route>

            {/* admin protected routes */}
            <Route element={<ProtectedRoutes requireAuth={true} requireAdmin={true} />}>
              {generateRoutes(adminProtectedRoutes)}
            </Route>
          </Routes>
        </Suspense>
      </GlobalLayout>
    </BrowserRouter>
  );
};

export default App;
