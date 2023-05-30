import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AdminLinks from '@components/AdminLinks';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinks />
        </Col>
        <Col md={10}>{children}</Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
