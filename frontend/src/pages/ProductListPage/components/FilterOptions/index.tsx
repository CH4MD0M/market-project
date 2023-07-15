import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';

import { useAppDispatch } from '@hooks/reduxHooks';
import { resetFilter } from '@redux/modules/filterSlice';

import SortOptions from '../SortOptions';
import PriceFilter from './options/PriceFilter';
import RatingFilter from './options/RatingFilter';
import CategoryFilter from './options/CategoryFilter';
import AttributesFilter from './options/AttributesFilter';

const FilterOptions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resetFilterHandler = useCallback(() => {
    dispatch(resetFilter());
    navigate(0);
  }, [dispatch, navigate]);

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
      <Button variant="danger" onClick={resetFilterHandler}>
        필터 초기화
      </Button>
    </ListGroup>
  );
};

export default memo(FilterOptions);
