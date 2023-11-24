import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import { useAppDispatch } from '@hooks/reduxHooks';
import { setCategoryFilter } from '@redux/modules/filterSlice';

import Pagination from './components/Pagination';
import ProductList from './components/ProductList';
import FilterOptions from './components/FilterOptions';

const ProductListPage = () => {
  const { categoryName, pageNumParam, searchQuery } = useParams();
  const dispatch = useAppDispatch();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (categoryName) {
      dispatch(setCategoryFilter({ [categoryName]: true }));
    }
  }, [categoryName, dispatch]);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <FilterOptions />
        </Col>
        <Col md={9}>
          <ProductList
            categoryName={categoryName}
            pageNumParam={pageNumParam}
            searchQuery={searchQuery}
            setCurrentPageNumber={setCurrentPageNumber}
            setTotalPages={setTotalPages}
          />
          <div className="d-flex justify-content-center mt-5">
            {totalPages > 1 && (
              <Pagination
                categoryName={categoryName}
                searchQuery={searchQuery}
                currentPageNumber={currentPageNumber}
                totalPages={totalPages}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
