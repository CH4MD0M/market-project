import React from 'react';
import { Col, Row } from 'react-bootstrap';

import AdminLinks from '../components/AdminLinks';
import UserLists from './UserLists';

const UsersPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <UserLists />
      </Col>
    </Row>
  );
};

export default UsersPage;
