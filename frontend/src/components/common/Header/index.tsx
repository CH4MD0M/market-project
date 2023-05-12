import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Profile from './components/Profile';
import SearchBar from './components/SearchBar';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">모시깽 마켓</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Search Bar */}
          <SearchBar />
          {/* Profile */}
          <Profile />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
