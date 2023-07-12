import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import { useAppSelector } from '@hooks/reduxHooks';

// CSS
import * as S from './style';

const SearchBar = () => {
  const navigate = useNavigate();
  const categories = useAppSelector(state => state.category.categories);

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
    <S.SearchContainer>
      <DropdownButton id="dropdown-basic-button" title={searchCategoryToggle}>
        <Dropdown.Item onClick={() => setSearchCategoryToggle('All')}>All</Dropdown.Item>

        {categories?.map((category, id) => (
          <Dropdown.Item key={id} onClick={() => setSearchCategoryToggle(category.name)}>
            {category.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <S.Input
        type="text"
        placeholder="검색어를 입력하세요."
        onKeyUp={checkEnterKeyPress}
        onChange={e => setSearchQuery(e.target.value)}
      />
    </S.SearchContainer>
  );
};

export default SearchBar;
