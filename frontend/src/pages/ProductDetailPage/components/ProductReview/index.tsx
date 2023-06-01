import React from 'react';
import { Alert, Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

import { useAppSelector } from '@hooks/reduxHooks';
import { postReview } from '@utils/api';

interface ProductReviewProps {
  product: Product;
  setReviewUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductReview = ({ product, setReviewUpdated }: ProductReviewProps) => {
  const { userData } = useAppSelector(state => state.user);

  const sendReviewHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      comment: { value: string };
      rating: { value: number };
    };

    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    try {
      const response = await postReview(product._id, formInputs);
      if (response.status === 200) {
        setReviewUpdated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row>
        <Col className="mt-5">
          <h4>상품 리뷰</h4>
          <ListGroup variant="flush">
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
      <hr />
      {!userData?.name && <Alert variant="danger">리뷰를 작성하시려면 로그인 해주세요</Alert>}
      <Form onSubmit={sendReviewHandler} className="d-flex align-items-center">
        <div className="w-100 me-5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>리뷰 작성</Form.Label>
            <Form.Control
              name="comment"
              required
              as="textarea"
              disabled={!userData?.name}
              rows={3}
            />
          </Form.Group>
          <Form.Select
            name="rating"
            required
            aria-label="Default select example"
            disabled={!userData?.name}
          >
            <option value="">별점</option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            <option value="4">⭐️⭐️⭐️⭐️</option>
            <option value="3">⭐️⭐️⭐️</option>
            <option value="2">⭐️⭐️</option>
            <option value="1">⭐️</option>
          </Form.Select>
        </div>
        <Button
          type="submit"
          className="w-25"
          style={{
            height: '110px',
            background: 'transparent',
            color: '#0A58CA',
            border: '1px solid #0A58CA',
          }}
          disabled={!userData?.name}
        >
          리뷰 등록
        </Button>
      </Form>
    </>
  );
};

export default ProductReview;
