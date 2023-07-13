import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { getAllCategoriesThunk } from '@redux/modules/categorySlice/thunk';

import Profile from './components/Profile';
import SearchBar from './components/SearchBar';

// CSS
import * as S from './style';

const Header = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, []);

  return (
    !loading && (
      <S.Navbar>
        <S.NavWrapper>
          <S.NavTitle>
            <Link to="/">모시깽 마켓</Link>
          </S.NavTitle>

          <SearchBar />

          <Profile />
        </S.NavWrapper>
      </S.Navbar>
    )
  );
};

export default Header;
