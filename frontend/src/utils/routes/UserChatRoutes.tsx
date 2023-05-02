import React from 'react';
import { Outlet } from 'react-router-dom';

import UserChat from '@/components/chat/UserChat';
import Layout from '@/layout';

const UserChatRoutes = () => {
  return (
    <>
      <UserChat />
      <Outlet />
    </>
  );
};

export default UserChatRoutes;
