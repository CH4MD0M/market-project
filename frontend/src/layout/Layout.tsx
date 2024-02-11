import { Outlet } from 'react-router-dom';

// Components
import Header from '@components/common/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh_-_100px)] mx-auto mt-[72px] mb-[28px] overflow-hidden">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
