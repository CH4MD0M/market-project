import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@layout/index';

import { userProtectedRoutes } from '@routes/userProtectedRoutes';
import { adminProtectedRoutes } from '@/routes/adminProtectedRoutes';

// Util
import ScrollToTop from '@utils/ScrollToTop';
import { generateRoutes } from '@utils/routes/generateRoutes';
import ProtectedRoutes from '@utils/routes/ProtectedRoutes';
import UserChatRoutes from '@utils/routes/UserChatRoutes';
import AdminPage from './pages/Admin';
import PublicRoutes from './routes/PublicRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* public routes */}
          <Route
            element={
              <Layout>
                <UserChatRoutes />
              </Layout>
            }
          >
            {generateRoutes(PublicRoutes)}
          </Route>

          {/* user protected routes */}
          <Route
            element={
              <Layout>
                <ProtectedRoutes admin={false} />
              </Layout>
            }
          >
            {generateRoutes(userProtectedRoutes)}
          </Route>

          {/* admin protected routes */}
          <Route element={<ProtectedRoutes admin={true} />}>
            <Route path="admin/*" element={<AdminPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
