import React from 'react';
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import CartPreview from '@components/CartPreview';
import { useAppSelector } from '@/hooks/reduxHooks';

const CartPage = () => {
  const { cartItems, cartSubtotal } = useAppSelector(state => state.cart);

  return (
    <Container>
      <Row className="mt-4">
        <h1>장바구니</h1>
        <Col md={8}>
          {cartItems.length > 0 ? (
            <ListGroup variant="flush">
              {cartItems.map((item: CartProduct, idx: number) => (
                <CartPreview item={item} key={idx} />
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info">장바구니가 비어있습니다.</Alert>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>총 합계({cartItems.length}개 상품)</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              금액: <span className="fw-bold">₩ {cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button disabled={!cartSubtotal} type="button">
                  결제하기
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
