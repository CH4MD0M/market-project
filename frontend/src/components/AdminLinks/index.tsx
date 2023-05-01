import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminLinks = () => {
  return (
    <Navbar bg="light" variant="light">
      <Nav className="flex-column">
        <LinkContainer to="/admin/orders">
          <Nav.Link>주문 현황 관리</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/products">
          <Nav.Link>상품 관리</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/users">
          <Nav.Link>사용자 관리</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/chats">
          <Nav.Link>메시지</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin">
          <Nav.Link>통계</Nav.Link>
        </LinkContainer>
        <Nav.Link>로그아웃</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminLinks;
