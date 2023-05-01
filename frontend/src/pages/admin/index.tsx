import React from 'react';
import { Routes } from 'react-router-dom';

import { generateRoutes } from '@/utils/routes/generateRoutes';
import { adminProtectedRoutes } from '@/routes/adminProtectedRoutes';

const AdminPage = () => {
  return (
    <>
      <Routes>{generateRoutes(adminProtectedRoutes)}</Routes>
    </>
  );
};

export default AdminPage;
