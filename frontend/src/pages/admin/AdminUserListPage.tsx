import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { getAllUsers, deleteUser } from '@api/index';

import Heading from '@components/atoms/Heading';

const AdminUserListPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [userDeleted, setUserDeleted] = useState(false);

  // User 삭제
  const deleteHandler = async (userId: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await deleteUser(userId);

        if (response.status === 200) {
          setUserDeleted(prevState => !prevState);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUsers = async () => {
      const { data } = await getAllUsers(abortController.signal);
      setUsers(data);
    };

    fetchUsers();

    return () => abortController.abort();
  }, [userDeleted]);

  return (
    <div>
      <Heading size="lg" className="my-[40px]">
        사용자 목록
      </Heading>

      <table className="w-full border-t-2 border-t-[#969696] border-solid border-collapse">
        <thead>
          <tr>
            <th>#</th>
            <th>사용자 이름</th>
            <th>이메일</th>
            <th>관리자 권한</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={idx}
              className="[&_td]:md:px-[30px] [&_td]:py-3.5 [&_td]:text-center border-b-[1px] border-b-[#969696] border-solid"
            >
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <CheckIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <XMarkIcon className="w-6 h-6 text-red-500" />
                )}
              </td>
              <td>
                <Link to={`/admin/edit-user/${user._id}`}>
                  <button>
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                </Link>
                {' / '}
                <button onClick={() => deleteHandler(user._id)}>
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserListPage;
