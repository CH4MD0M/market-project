import { useAppSelector } from '@hooks/reduxHooks';
import { useResetFilter } from '@hooks/useResetFilter';
import { useFetchCategoryInfo } from '@hooks/useFetchCategoryInfo';

// Components
import CenterWrapper from '@components/atoms/CenterWrapper';
import CategoryCard from '@components/pageComponents/HomePage/CategoryCard';
import ImageSlide from '@components/pageComponents/HomePage/ImageSlide';

const HomePage = () => {
  const categoryDataList = useAppSelector(state => state.category.categoryDataList);

  useResetFilter();
  useFetchCategoryInfo();

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
