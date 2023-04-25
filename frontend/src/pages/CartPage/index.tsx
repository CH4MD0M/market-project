import React from 'react';
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import CartItem from './components/CartItem';

const CartPage = () => {
  return (
    <Container>
      <Row className="mt-4">
        <h1>장바구니</h1>
        <Col md={8}>
          <ListGroup variant="flush">
            {Array.from({ length: 2 }).map((item, idx) => (
              <CartItem key={idx} />
            ))}

            <Alert variant="info">장바구니가 비어있습니다.</Alert>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>총 합계(2개 상품)</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              금액: <span className="fw-bold">₩ 100,000원</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button type="button">결제하기</Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
