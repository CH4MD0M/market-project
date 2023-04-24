import React from 'react';

import { Button, Card, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Rating } from 'react-simple-star-rating';

interface ProductPreviewProps {
  images: string[];
  idx: number;
}

const ProductPreview = ({ images, idx }: ProductPreviewProps) => {
  return (
    <Card style={{ marginTop: '30px', marginBottom: '50px' }}>
      <Row>
        <Col lg={5}>
          <Card.Img variant="top" src={`/images/${images[idx]}-category.png`} />
        </Col>

        <Col lg={7}>
          <Card.Body>
            <Card.Title>상품 이름</Card.Title>
            <Card.Text>
              상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품
              설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명
            </Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={5} /> (21)
            </Card.Text>
            <Card.Text className="h4">
              ₩124,000원
              <LinkContainer to={`/product-details/`}>
                <Button variant="primary">상품보기</Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductPreview;
