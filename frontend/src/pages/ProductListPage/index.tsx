import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Pagination from './components/Pagination';
import ProductList from './components/ProductList';
import FilterOptions from './components/FilterOptions';

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
