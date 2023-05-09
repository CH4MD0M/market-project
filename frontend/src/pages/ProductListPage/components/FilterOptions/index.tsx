import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

import SortOptions from '../SortOptions';
import PriceFilter from './options/PriceFilter';
import RatingFilter from './options/RatingFilter';
import CategoryFilter from './options/CategoryFilter';
import AttributesFilter from './options/AttributesFilter';

const FilterOptions = () => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="mb-3 mt-3">
        {/* 정렬 옵션 */}
        <SortOptions />
      </ListGroup.Item>
      <ListGroup.Item>
        {/* 가격 필터 */}
        <PriceFilter />
      </ListGroup.Item>
      <ListGroup.Item>
        {/* 별점 필터 */}
        <RatingFilter />
      </ListGroup.Item>
      <ListGroup.Item>
        {/* 카테고리 필터 */}
        <CategoryFilter />
      </ListGroup.Item>
      <ListGroup.Item>
        {/* 속성 필터 */}
        <AttributesFilter />
      </ListGroup.Item>
      <ListGroup.Item>
        <Button variant="primary">적용</Button>
        <Button variant="danger">필터 초기화</Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default FilterOptions;
