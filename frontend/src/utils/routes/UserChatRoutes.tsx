import React from 'react';
import { Outlet } from 'react-router-dom';

import UserChat from '@/components/chat/UserChat';

const UserChatRoutes = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserChatRoutes;
