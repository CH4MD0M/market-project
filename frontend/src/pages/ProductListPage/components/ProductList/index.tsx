import React from 'react';
import { Col, Container, ListGroup, Row, Button } from 'react-bootstrap';

import SortOptions from '@/pages/ProductListPage/components/SortOptions';
import PriceFilter from '../filterOptions/PriceFilter';
import RatingFilter from '../filterOptions/RatingFilter';
import CategoryFilter from '../filterOptions/CategoryFilter';
import AttributesFilter from '../filterOptions/AttributesFilter';
import ProductPreview from '../ProductPreview';
import Pagination from '@/components/common/Pagination';

const ProductList = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              {/* 정렬 옵션 */}
              <SortOptions />
            </ListGroup.Item>
            <ListGroup.Item>
              {/* 가격 필터 */}
              <PriceFilter />
            </ListGroup.Item>
            <ListGroup.Item>
              {/* 별점 필터 */}
              <RatingFilter />
            </ListGroup.Item>
            <ListGroup.Item>
              {/* 카테고리 필터 */}
              <CategoryFilter />
            </ListGroup.Item>
            <ListGroup.Item>
              {/* 속성 필터 */}
              <AttributesFilter />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary">적용</Button>
              <Button variant="danger">필터 초기화</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <ProductPreview
              key={idx}
              images={['games', 'monitors', 'tablets', 'games', 'monitors']}
              idx={idx}
            />
          ))}
          <Pagination />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
