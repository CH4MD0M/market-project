import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { getAllCategoriesThunk } from '@redux/modules/categorySlice/thunk';
import { useResetFilter } from '@hooks/useResetFilter';

// Components
import CategoryCard from '@/components/CategoryCard';
import CenterWrapper from '@components/atoms/CenterWrapper';
import ImageSlide from '@components/ImageSlide';

const HomePage = () => {
  useResetFilter();
  const dispatch = useAppDispatch();
  const categoryDataList = useAppSelector(state => state.category.categoryDataList);

  useEffect(() => {
    if (categoryDataList.length === 0) dispatch(getAllCategoriesThunk());
  }, [dispatch, categoryDataList.length]);

  return (
    <>
      <ImageSlide />
      <CenterWrapper size={'md'} className="mt-[80px] px-8 md:px-0 lg:mt-[40px]">
        <h2 className="text-[30px] font-semibold mb-5 text-center md:text-start">
          카테고리별 상품
        </h2>
        <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-3">
          {categoryDataList.map((category, idx) => (
            <CategoryCard key={idx} category={category} />
          ))}
        </div>
      </CenterWrapper>
    </>
  );
};

export default HomePage;
