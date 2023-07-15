import { ThemeProvider } from 'styled-components';

import Header from '@components/common/Header';
import Footer from '@components/common/Footer';

// CSS
import theme from '@styles/theme';
import * as S from './style';

interface LayoutProps {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <S.LayoutWrapper>{children}</S.LayoutWrapper>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default GlobalLayout;
