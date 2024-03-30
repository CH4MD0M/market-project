import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { getAllCategoriesThunk } from '@redux/modules/categorySlice/thunk';

export const useFetchCategoryInfo = () => {
  const dispatch = useAppDispatch();

  const categoryDataList = useAppSelector(state => state.category.categoryDataList);
  useEffect(() => {
    if (categoryDataList.length === 0) dispatch(getAllCategoriesThunk());
  }, [dispatch, categoryDataList.length]);
};
