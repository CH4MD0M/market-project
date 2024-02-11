import { memo, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setCategoryFilter } from '@redux/modules/filterSlice';

// Components
import PriceFilter from '@components/FilterMenu/PriceFilter';
import RatingFilter from '@components/FilterMenu/RatingFilter';
import CategoryFilter from '@components/FilterMenu/CategoryFilter';
import AttributesFilter from '@components/FilterMenu/AttributesFilter';

const FilterMenu = () => {
  const { categoryName } = useParams();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const categoryDataList = useAppSelector(state => state.category.categoryDataList, isEqual);

  // Set category filter when user enter particular category page
  useEffect(() => {
    if (categoryName)
      dispatch(setCategoryFilter({ selectedCategory: categoryName, categoryDataList }));
  }, [categoryName, dispatch, categoryDataList]);

  return (
    <>
      {/* 카테고리 필터 */}
      {!location.pathname.match(/\/category/) && <CategoryFilter />}

      {/* 속성 필터 */}
      <AttributesFilter />

      {/* 가격 필터 */}
      <PriceFilter />
      <hr />

      {/* 별점 필터 */}
      <RatingFilter />
      <hr />
    </>
  );
};

export default memo(FilterMenu);
