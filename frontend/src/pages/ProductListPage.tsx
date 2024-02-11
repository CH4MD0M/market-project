import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Components
import ScrollToTop from '@components/common/ScrollToTop';
import CenterWrapper from '@components/atoms/CenterWrapper';
import FilterMenu from '@components/FilterMenu';
import ProductListHeader from '@components/ProductListHeader';
import ProductList from '@components/ProductList';
import Pagination from '@components/Pagination';

const ProductListPage = () => {
  const { categoryName } = useParams();
  const [currentPage, setCurrenPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  return (
    <>
      <ScrollToTop />
      <CenterWrapper size={'lg'} className="grid pt-[3rem] lg:grid-cols-[20%_1fr] lg:gap-10">
        <div className="flex flex-col px-2 h-fit rounded-md bg-slate-50 mx-7 lg:mx-0 lg:px-3">
          <FilterMenu />
        </div>
        <div>
          <ProductListHeader />
          <ProductList setCurrentPage={setCurrenPage} setMaxPage={setMaxPage} />
          <div className="flex justify-center mt-5">
            {maxPage > 1 && (
              <Pagination categoryName={categoryName} currentPage={currentPage} maxPage={maxPage} />
            )}
          </div>
        </div>
      </CenterWrapper>
    </>
  );
};

export default ProductListPage;
