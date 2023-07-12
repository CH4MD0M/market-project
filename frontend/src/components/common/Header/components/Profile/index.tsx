import React from 'react';
import { shallowEqual } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav, NavDropdown } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { logout } from '@redux/modules/authSlice/thunk';
import { selectItemsCount } from '@redux/modules/cartSlice/selector';

const Profile = () => {
  const isLogin = useAppSelector(state => state.auth.isLogin);
  const role = useAppSelector(state => state.user.role);
  const userData = useAppSelector(state => state.user.userData, shallowEqual);
  const itemsCount = useAppSelector(selectItemsCount);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const { payload } = await dispatch(logout());
    if (payload) navigate(0);
  };

  return (
    <Nav className="d-flex align-items-center " style={{ zIndex: '100' }}>
      <LinkContainer to="/cart">
        <Nav.Link>
          <Badge pill bg="danger" className="me-1">
            {itemsCount || ''}
          </Badge>
          <i className="bi bi-cart-dash fs-5" />
        </Nav.Link>
      </LinkContainer>

      {/* Admin Menu */}
      {isLogin && role === 'admin' && (
        <LinkContainer to="/admin">
          <Nav.Link>Admin</Nav.Link>
        </LinkContainer>
      )}

      {/* User Menu */}
      {isLogin && role === 'user' && (
        <NavDropdown title={userData.name} id="collasible-nav-dropdown">
          <NavDropdown.Item eventKey="/user" as={Link} to="/user">
            마이페이지
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">
            나의 쇼핑
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="/user/service" as={Link} to="/user/service">
            고객센터
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logoutHandler}>로그아웃</NavDropdown.Item>
        </NavDropdown>
      )}

      {/* Login Menu */}
      {!isLogin && !userData && (
        <>
          <LinkContainer to="/login">
            <Nav.Link>로그인</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/register">
            <Nav.Link>회원가입</Nav.Link>
          </LinkContainer>
        </>
      )}
    </Nav>
  );
};

export default Profile;
