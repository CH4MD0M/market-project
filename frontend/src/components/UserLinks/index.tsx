import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserLinks = () => {
  return (
    <Navbar bg="light" variant="light">
      <Nav className="flex-column">
        <LinkContainer to="/user/my-orders">
          <Nav.Link>주문목록/배송조회</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/service">
          <Nav.Link>고객센터</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/user/edit-profile">
          <Nav.Link>개인정보수정</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default UserLinks;
