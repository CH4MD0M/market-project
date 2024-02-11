import { shallowEqual } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { logout } from '@redux/modules/authSlice/thunk';
import { useDropdown } from '@hooks/useDropdown';
import useAnimation from '@hooks/useAnimation';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

// Components
import Button from '@components/atoms/Button';
import DropdownMenu from '@components/atoms/DropdownMenu';
import Avatar from '@components/atoms/Avatar';

const BeforeLogin = () => {
  return (
    <>
      <Button hovercolor={'default'} className="hover:text-[#4565cc] hover:bg-[#4565cc]/10">
        <Link to="/login">로그인</Link>
      </Button>
      <Button variant={'primary'}>
        <Link to="/register">회원가입</Link>
      </Button>
    </>
  );
};

interface AfterLoginProps {
  isAdmin: boolean;
  userName: string;
}

const AfterLogin = ({ isAdmin, userName }: AfterLoginProps) => {
  const { isOpen, dropdownRef, toggleDropdown } = useDropdown(false);
  const [shouldRenderProfile, handleTransitionEnd, triggerAnimation] = useAnimation(isOpen);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const { payload } = await dispatch(logout());
    if (payload) navigate('/login', { replace: true });
  };

  return (
    <>
      <Link to={isAdmin ? '/admin' : '/user'}>
        <Avatar />
      </Link>
      <div
        ref={dropdownRef}
        onClick={toggleDropdown}
        className="relative flex gap-1 items-center cursor-pointer"
      >
        {isAdmin ? '관리자' : `${userName}님`}{' '}
        <ChevronDownIcon
          width={18}
          height={18}
          transform={isOpen ? 'rotate(180)' : ''}
          className="duration-300"
        />
        {shouldRenderProfile && (
          <DropdownMenu onTransitionEnd={handleTransitionEnd} triggerAnimation={triggerAnimation}>
            <div className="list-none">
              <li onClick={logoutHandler}>로그아웃</li>
            </div>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};

const Profile = () => {
  const isLogin = useAppSelector(state => state.auth.isLogin);
  const userData = useAppSelector(state => state.user.userData, shallowEqual);
  const isAdmin = userData?.isAdmin;

  return (
    <>
      {isLogin && userData ? (
        <AfterLogin isAdmin={isAdmin} userName={userData.name} />
      ) : (
        <BeforeLogin />
      )}
    </>
  );
};

export default Profile;
