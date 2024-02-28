import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllUsers, deleteUser } from '@api/index';

const UserLists = () => {
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
      <h1>사용자 목록</h1>
      <table>
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
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <i className="bi bi-check-lg text-success"></i>
                ) : (
                  <i className="bi bi-x-lg text-danger"></i>
                )}
              </td>
              <td>
                <Link to={`/admin/edit-user/${user._id}`}>
                  <button className="btn-sm">
                    <i className="bi bi-pencil-square" />
                  </button>
                </Link>
                {' / '}
                <button className="btn-sm" onClick={() => deleteHandler(user._id)}>
                  <i className="bi bi-x-circle" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLists;
