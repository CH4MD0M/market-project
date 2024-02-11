import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';

import { resetCategoryFilter, resetFilter } from '@redux/modules/filterSlice';

export const useResetFilter = () => {
  const dispatch = useAppDispatch();
  const categoryFilter = useAppSelector(state => state.filter.categoryFilter);

  useEffect(() => {
    if (categoryFilter) {
      dispatch(resetFilter());
      dispatch(resetCategoryFilter());
    }
  }, [categoryFilter]);
};
