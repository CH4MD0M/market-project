import { Outlet, useLocation } from 'react-router-dom';

import { adminMenus, userMenus } from '@constants/.';

// Components
import Header from '@components/common/Header';
import ModalsRenderer from '@components/common/ModalsRenderer';
import CenterWrapper from '@components/atoms/CenterWrapper';
import SideLinkContainer from '@components/pageComponents/SideLinkContainer';

interface GlobalLayoutProps {
  requireAuth?: boolean;
  requireAdmin?: boolean;
}
const GlobalLayout = ({ requireAuth = false, requireAdmin = false }: GlobalLayoutProps) => {
  const { pathname } = useLocation();
  const isPurchasePage = pathname.includes('purchase');

  return (
    <>
      <Header />
      <main className={'min-h-[calc(100vh_-_100px)] mx-auto mt-[72px] mb-[28px] overflow-hidden'}>
        {!isPurchasePage && requireAuth ? (
          <CenterWrapper
            size="lg"
            className="grid grid-row mt-[80px] px-8 md:grid-cols-[20%_1fr] lg:px-4 lg:mt-[40px]"
          >
            <SideLinkContainer menuItemsList={requireAdmin ? adminMenus : userMenus} />
            <Outlet />
          </CenterWrapper>
        ) : (
          <Outlet />
        )}
      </main>
      <ModalsRenderer />
    </>
  );
};

export default GlobalLayout;
