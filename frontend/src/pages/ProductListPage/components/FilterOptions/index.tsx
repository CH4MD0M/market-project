import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setFilters } from '@redux/modules/filterSlice';

import SortOptions from '../SortOptions';
import PriceFilter from './options/PriceFilter';
import RatingFilter from './options/RatingFilter';
import CategoryFilter from './options/CategoryFilter';
import AttributesFilter from './options/AttributesFilter';

const FilterOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { attrsFromFilter, priceFromFilter, ratingsFromFilter, categoriesFromFilter } =
    useAppSelector(state => state.filter);

  const handleFilters = () => {
    navigate(location.pathname.replace(/\/[0-9]+$/, ''));
    dispatch(
      setFilters({
        attrs: attrsFromFilter,
        price: priceFromFilter,
        rating: ratingsFromFilter,
        category: categoriesFromFilter,
      }),
    );
  };

  const resetFilters = () => {
    dispatch(setFilters({}));
    navigate(0);
  };

  return (
    <ListGroup variant="flush">
      {/* 정렬 옵션 */}
      <ListGroup.Item className="mb-3 mt-3">
        <SortOptions />
      </ListGroup.Item>

      {/* 가격 필터 */}
      <ListGroup.Item>
        <PriceFilter />
      </ListGroup.Item>

      {/* 별점 필터 */}
      <ListGroup.Item>
        <RatingFilter />
      </ListGroup.Item>

      {/* 카테고리 필터 */}
      {!location.pathname.match(/\/category/) && (
        <ListGroup.Item>
          <CategoryFilter />
        </ListGroup.Item>
      )}

      {/* 속성 필터 */}
      <ListGroup.Item>
        <AttributesFilter />
      </ListGroup.Item>

      {/* 필터 버튼 */}
      <ListGroup.Item>
        <Button variant="primary" onClick={handleFilters}>
          적용
        </Button>
        {(attrsFromFilter || priceFromFilter || ratingsFromFilter || categoriesFromFilter) && (
          <Button variant="danger" onClick={resetFilters}>
            필터 초기화
          </Button>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default FilterOptions;
