import React from 'react';
import {
  DropdownButton,
  Dropdown,
  Form,
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">모시깽 마켓</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="All">
                <Dropdown.Item>1</Dropdown.Item>
                <Dropdown.Item>2</Dropdown.Item>
                <Dropdown.Item>3</Dropdown.Item>
              </DropdownButton>
              <Form.Control type="text" placeholder="Search in shop ..." />
              <Button variant="warning">
                <i className="bi bi-search text-dark"></i>
              </Button>
            </InputGroup>
          </Nav>

          <Nav>
            <LinkContainer to="/admin">
              <Nav.Link>
                Admin
                <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle" />
              </Nav.Link>
            </LinkContainer>

            <NavDropdown title="홍길동" id="collasible-nav-dropdown">
              <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">
                내 주문
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                프로필
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>로그아웃</NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to="/login">
              <Nav.Link>로그인</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>회원가입</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge pill bg="danger">
                  2
                </Badge>
                <i className="bi bi-cart-dash" />
                <span className="ms-1">장바구니</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
