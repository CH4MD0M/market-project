import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import UserLinks from '@components/UserLinks';

interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Row className="m-5">
        <Col md={2}>
          <UserLinks />
        </Col>
        <Col md={10}>{children}</Col>
      </Row>
    </Container>
  );
};

export default UserLayout;
