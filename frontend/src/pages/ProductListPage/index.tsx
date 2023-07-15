import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setCategoryFilter } from '@redux/modules/filterSlice';

import Pagination from './components/Pagination';
import ProductList from './components/ProductList';
import FilterOptions from './components/FilterOptions';

const ProductListPage = () => {
  const { categoryName, pageNumParam, searchQuery } = useParams();
  const dispatch = useAppDispatch();

  const maxPageNum = useAppSelector(state => state.product.maxPageNum);

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
          />
          <div className="d-flex justify-content-center mt-5">
            {maxPageNum > 1 && <Pagination categoryName={categoryName} searchQuery={searchQuery} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
