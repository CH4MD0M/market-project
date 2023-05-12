import React from 'react';
import { DropdownButton, Dropdown, Form, Nav, Button, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
  return (
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
  );
};

export default SearchBar;
