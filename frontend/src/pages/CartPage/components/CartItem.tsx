import React from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';

const CartItem = () => {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image crossOrigin="anonymous" src="/images/games-category.png" fluid />
        </Col>
        <Col md={2}>상품 이름</Col>
        <Col md={2}>
          <b>₩ 20,000</b>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option value="1">1개</option>
            <option value="2">2개</option>
            <option value="3">3개</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button type="button" variant="secondary">
            <i className="bi bi-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
