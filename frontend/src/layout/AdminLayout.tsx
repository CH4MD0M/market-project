import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AdminLinks from '@components/AdminLinks';

// CSS
import * as S from './style';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsScreenSmall(viewportWidth < 1024);
  }, [viewportWidth]);

  return isScreenSmall ? (
    <Container>
      <S.AlertWrapper>
        <p>화면 크기를 키워 주세요.</p>
      </S.AlertWrapper>
    </Container>
  ) : (
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
