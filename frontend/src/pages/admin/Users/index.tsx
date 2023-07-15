import AdminLayout from '@layout/AdminLayout';
import UserLists from './UserLists';

const UsersPage = () => {
  return (
    <AdminLayout>
      <UserLists />
    </AdminLayout>
  );
};

export default UsersPage;
