import React from 'react';
import { Col, Row } from 'react-bootstrap';

import AdminLinks from '@/pages/admin/components/AdminLinks';
import AdminChat from '@/components/chat/AdminChat';

const AdminChatsPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <Row>
          <AdminChat />
        </Row>
      </Col>
    </Row>
  );
};

export default AdminChatsPage;
