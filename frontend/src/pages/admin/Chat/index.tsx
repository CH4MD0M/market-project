import { Row } from 'react-bootstrap';

import AdminLayout from '@layout/AdminLayout';
import AdminChat from '@components/chat/AdminChat';

const AdminChatsPage = () => {
  return (
    <AdminLayout>
      <Row>
        <AdminChat />
      </Row>
    </AdminLayout>
  );
};

export default AdminChatsPage;
