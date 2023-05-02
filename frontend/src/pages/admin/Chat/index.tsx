import React from 'react';
import { Row } from 'react-bootstrap';

import Layout from '@layout/index';
import AdminChat from '@components/chat/AdminChat';

const AdminChatsPage = () => {
  return (
    <>
      <Row>
        <AdminChat />
      </Row>
    </>
  );
};

export default AdminChatsPage;
