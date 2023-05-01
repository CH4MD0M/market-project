import React from 'react';
import { Row } from 'react-bootstrap';

import Layout from '@layout/index';
import AdminChat from '@components/chat/AdminChat';

const AdminChatsPage = () => {
  return (
    <Layout adminLinks>
      <Row>
        <AdminChat />
      </Row>
    </Layout>
  );
};

export default AdminChatsPage;
