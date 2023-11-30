import { Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from '@utils/ScrollToTop';
import { generateRoutes } from '@utils/generateRoutes';

// Components
import GlobalLayout from '@layout/GlobalLayout';
import LoadingPage from '@pages/LoadingPage';
import ProtectedRoutes from '@components/common/ProtectedRoutes';

// Routes
import { BlockLoginRoutes, PublicRoutes } from '@routes/PublicRoutes';
import { userProtectedRoutes } from '@routes/userProtectedRoutes';
import { adminProtectedRoutes } from '@routes/adminProtectedRoutes';

// CSS
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalLayout>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {/* public routes */}
            <Route element={<ProtectedRoutes />}>{generateRoutes(PublicRoutes)}</Route>

            {/* block login routes */}
            <Route element={<ProtectedRoutes blockLogin />}>
              {generateRoutes(BlockLoginRoutes)}
            </Route>

            {/* user protected routes */}
            <Route element={<ProtectedRoutes requireAuth />}>
              {generateRoutes(userProtectedRoutes)}
            </Route>

            {/* admin protected routes */}
            <Route element={<ProtectedRoutes requireAuth requireAdmin />}>
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
