import { Col, ListGroup, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

interface ProductReviewProps {
  product: Product;
}

const ProductReview = ({ product }: ProductReviewProps) => {
  return (
    <Row className="mt-5">
      <Col className="mt-5">
        <h4>상품 리뷰</h4>
        <ListGroup variant="flush">
          {product?.reviews.length === 0 && <p>리뷰가 없습니다.</p>}
          {product?.reviews.map((review, idx) => (
            <ListGroup.Item key={idx}>
              {review.user.name} <br />
              <Rating readonly size={20} initialValue={review.rating} />
              <br />
              {review.createdAt.substring(0, 10)} <br />
              {review.comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProductReview;
