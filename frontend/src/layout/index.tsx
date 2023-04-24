import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// CSS
import GlobalStyles from '@styles/GlobalStyles';
import theme from '@styles/theme';
import * as S from './style';

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <S.LayoutWrapper>
        <Outlet />
      </S.LayoutWrapper>
      <Footer />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default Layout;
