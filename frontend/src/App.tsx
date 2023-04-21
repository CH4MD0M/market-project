import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicRoutes from '@routes/PublicRoutes';
import { userProtectedRoutes } from '@routes/userProtectedRoutes';
import { adminProtectedRoutes } from '@routes/adminProtectedRoutes';

import { generateRoutes } from './utils/generateRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Layout from './layout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          {generateRoutes(PublicRoutes)}

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
    </BrowserRouter>
  );
};

export default App;
