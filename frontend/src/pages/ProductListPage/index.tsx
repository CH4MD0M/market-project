import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import Pagination from './components/Pagination';
import ProductList from './components/ProductList';
import FilterOptions from './components/FilterOptions';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setAttrsFilter } from '@/redux/modules/filterSlice';

const ProductListPage = () => {
  const dispatch = useAppDispatch();

  const { pageNum, maxPageNum } = useAppSelector(state => state.product);
  const { categories } = useAppSelector(state => state.category);

  const { categoryName } = useParams();
  const { pageNumParam } = useParams();
  const { searchQuery } = useParams();

  useEffect(() => {
    if (categoryName) {
      const categoryAllData = categories.find(item => item.name === categoryName);
      dispatch(setAttrsFilter(categoryAllData?.attrs));
    }
  }, [categoryName, categories]);

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
          {maxPageNum > 1 ? (
            <Pagination categoryName={categoryName} searchQuery={searchQuery} />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
