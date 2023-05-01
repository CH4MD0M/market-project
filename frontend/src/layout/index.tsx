import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Col, Row } from 'react-bootstrap';

import Header from '@components/common/Header';
import Footer from '@components/common/Footer';
import AdminLinks from '@components/AdminLinks';
import UserChat from '@components/chat/UserChat';

// CSS
import GlobalStyles from '@styles/GlobalStyles';
import theme from '@styles/theme';
import * as S from './style';

interface LayoutProps {
  children: React.ReactNode;
  adminLinks?: boolean;
}

const Layout = ({ children, adminLinks }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {adminLinks ? (
        <S.LayoutWrapper>
          <Row className="m-5">
            <Col md={2}>
              <AdminLinks />
            </Col>
            <Col md={10}>{children}</Col>
          </Row>
        </S.LayoutWrapper>
      ) : (
        <S.LayoutWrapper>{children}</S.LayoutWrapper>
      )}
      <Footer />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default Layout;
