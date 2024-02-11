import UserLinks from '@components/UserLinks';

interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      {/* <Row className="m-5">
        <Col md={2}>
          <UserLinks />
        </Col>
        <Col md={10}>{children}</Col>
      </Row> */}
    </div>
  );
};

export default UserLayout;
