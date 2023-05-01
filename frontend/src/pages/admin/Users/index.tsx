import React from 'react';

import Layout from '@layout/index';
import UserLists from './UserLists';

const UsersPage = () => {
  return (
    <Layout adminLinks>
      <UserLists />
    </Layout>
  );
};

export default UsersPage;
