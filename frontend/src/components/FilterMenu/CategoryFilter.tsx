import { memo } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { resetCategoryFilter } from '@redux/modules/filterSlice';
import { setCategoryFilter } from '@redux/modules/filterSlice';

const CategoryFilter = () => {
  const dispatch = useAppDispatch();

  const categoryDataList = useAppSelector(state => state.category.categoryDataList, shallowEqual);
  const categoryFilter = useAppSelector(state => state.filter.categoryFilter);

  // Category filter onChange handler
  const categoryOnChangeHandler = (selectedCategory: string) => {
    if (categoryFilter === selectedCategory) dispatch(resetCategoryFilter());
    else dispatch(setCategoryFilter({ selectedCategory, categoryDataList }));
  };

  return (
    <>
      <div className="flex my-3 pb-1 lg:block">
        <span className="block font-semibold mr-[20px] flex-[0_0_100px] lg:mb-[10px]">
          카테고리
        </span>
        <div className="flex lg:flex-col">
          {categoryDataList.map(category => (
            <div key={category._id} className="flex items-center mr-3 lg:mb-2 lg:gap-2">
              <input
                type="checkbox"
                id={category.name}
                checked={categoryFilter === category.name}
                disabled={!!categoryFilter && categoryFilter !== category.name}
                onChange={() => categoryOnChangeHandler(category.name)}
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

export default memo(CategoryFilter);
