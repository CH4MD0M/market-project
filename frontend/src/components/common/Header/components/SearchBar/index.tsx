import { useAppSelector } from '@/hooks/reduxHooks';
import React, { useState } from 'react';
import { DropdownButton, Dropdown, Form, Nav, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const { categories } = useAppSelector(state => state.category);

  const [searchCategoryToggle, setSearchCategoryToggle] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const checkEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  const searchHandler = () => {
    if (searchQuery.trim()) {
      if (searchCategoryToggle === 'All') {
        navigate(`/products/search/${searchQuery}`);
      } else {
        navigate(`/products/category/${searchCategoryToggle}/search/${searchQuery}`);
      }
    } else if (searchCategoryToggle !== 'All') {
      navigate(`/products/category/${searchCategoryToggle}`);
    } else {
      navigate('/products');
    }
    setSearchQuery('');
  };

  return (
    <Nav className="me-auto">
      <InputGroup>
        <DropdownButton id="dropdown-basic-button" title={searchCategoryToggle}>
          <Dropdown.Item onClick={() => setSearchCategoryToggle('All')}>All</Dropdown.Item>

          {categories?.map((category, id) => (
            <Dropdown.Item key={id} onClick={() => setSearchCategoryToggle(category.name)}>
              {category.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Form.Control
          type="text"
          placeholder="Search in shop ..."
          onKeyUp={checkEnterKeyPress}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Button variant="warning" onClick={searchHandler}>
          <i className="bi bi-search text-dark"></i>
        </Button>
      </InputGroup>
    </Nav>
  );
};

export default SearchBar;
