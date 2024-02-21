import { useEffect, useState } from 'react';

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
    <div>
      <p>화면 크기를 키워 주세요.</p>
    </div>
  ) : (
    <div className="grid grid-cols-[25%_1fr]">
      <div>관리자 메뉴</div>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
