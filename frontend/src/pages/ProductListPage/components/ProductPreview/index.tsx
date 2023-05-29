import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Rating } from 'react-simple-star-rating';

interface ProductPreviewProps {
  images: any[];
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsNumber: number;
  productId: string;
}

const ProductPreview = ({
  images,
  name,
  description,
  price,
  rating,
  reviewsNumber,
  productId,
}: ProductPreviewProps) => {
  return (
    <Card style={{ marginTop: '30px', marginBottom: '50px' }}>
      <Row>
        <Col lg={3}>
          <Card.Img crossOrigin="anonymous" variant="top" src={images[0] ? images[0].path : ''} />
        </Col>

        <Col lg={7}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={rating} /> ({reviewsNumber})
            </Card.Text>
            <Card.Text className="h4">
              ₩{price}
              <LinkContainer to={`/product-details/${productId}`}>
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
