import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicRoutes from '@routes/PublicRoutes';
import { userProtectedRoutes } from '@routes/userProtectedRoutes';
import { adminProtectedRoutes } from '@routes/adminProtectedRoutes';

import { generateRoutes } from '@utils/generateRoutes';
import ProtectedRoutes from '@utils/ProtectedRoutes';
import UserChatRoutes from '@utils/UserChatRoutes';

import Layout from './layout';

// Util
import ScrollToTop from '@utils/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
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
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
