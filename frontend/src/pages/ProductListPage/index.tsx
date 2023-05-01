import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ProductList from './components/ProductList';
import FilterOptions from './components/FilterOptions';
import Pagination from '@/components/common/Pagination';

const ProductListPage = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <FilterOptions />
        </Col>
        <Col md={9}>
          <ProductList />
          <Pagination />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
