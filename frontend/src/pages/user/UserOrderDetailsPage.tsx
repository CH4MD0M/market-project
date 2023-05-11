import React from 'react';
import { Alert, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';

import CartPreview from '@components/CartPreview';

const UserOrderDetailsPage = () => {
  const orderHandler = () => {};

  return (
    <Container>
      <Row className="mt-4">
        <h1>내 주문</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>주문자 정보</h2>
              <b>이름</b>: 홍길동 <br />
              <b>Address</b>: 서울 특별시 OO구 OO동
              <br />
              <b>Phone</b>: 010-1234-5678
            </Col>
            <Col md={6}>
              <h2>결제 방법</h2>
              <Form.Select value="결제 방법" disabled={false}>
                <option value="pp">PayPal</option>
                <option value="acc">무통장</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert className="mt-3" variant="success">
                배송완료
              </Alert>
            </Col>
            <Col>
              <Alert className="mt-3" variant="success">
                결제완료
              </Alert>
            </Col>
          </Row>
          <hr />
          <h2>주문 상품</h2>
          <ListGroup variant="flush">
            {/* TODO: CartItem 수정 */}
            {/* {Array.from({ length: 3 }).map((_, index) => (
              <CartItem key={index} />
            ))} */}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>주문 내역</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              상품 가격: <span className="fw-bold">₩ 100,000</span>
            </ListGroup.Item>
            <ListGroup.Item>
              배송비: <span className="fw-bold">포함됨</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              합계: <span className="fw-bold">₩ 100,000</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={orderHandler}
                  variant="danger"
                  type="button"
                  disabled
                ></Button>
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div id="paypal-container-element"></div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPage;
