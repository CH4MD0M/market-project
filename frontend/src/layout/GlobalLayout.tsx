import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from '@components/common/Header';
import Footer from '@components/common/Footer';

// CSS
import GlobalStyles from '@styles/GlobalStyles';
import theme from '@styles/theme';
import * as S from './style';

interface LayoutProps {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <S.LayoutWrapper>{children}</S.LayoutWrapper>
      <Footer />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default GlobalLayout;
