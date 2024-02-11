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
    <div>
      {/* <Row className="m-5">
        <Col md={2}>
          <AdminLinks />
        </Col>
        <Col md={10}>{children}</Col>
      </Row> */}
    </div>
  );
};

export default AdminLayout;
