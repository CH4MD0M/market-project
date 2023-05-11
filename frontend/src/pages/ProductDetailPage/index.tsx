import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import ImageZoom from 'js-image-zoom';
import { Col, Container, Row, ListGroup, Form, Button, Alert, Image } from 'react-bootstrap';

import CartMessage from './components/CartMessage';

import { addToCart } from '@redux/modules/cartSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { getSingleProduct } from '@utils/api';
import { addToCartAsync } from '@/redux/modules/cartSlice/thunk';

const options = {
  offset: { vertical: 0, horizontal: 0 },
};

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { cartItems } = useAppSelector(state => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [cartMessageShow, setCartMessageShow] = useState<boolean>(false);

  const addToCartHandler = async () => {
    await dispatch(addToCartAsync({ id, quantity }));
    setCartMessageShow(true);
  };

  const quantityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    new ImageZoom(document.getElementById('first'), options);
    new ImageZoom(document.getElementById('second'), options);
    new ImageZoom(document.getElementById('third'), options);
  }, []);

  return (
    <Container>
      <CartMessage cartMessageShow={cartMessageShow} setCartMessageShow={setCartMessageShow} />
      <Row className="mt-5">
        <Col style={{ zIndex: 1 }} md={4}>
          <div id="first">
            <Image fluid src="/images/games-category.png" />
          </div>
          <div id="second">
            <Image fluid src="/images/monitors-category.png" />
          </div>
          <div id="third">
            <Image fluid src="/images/tablets-category.png" />
          </div>
        </Col>
        <Col md={8}>
          <Row>
            {/* 상품이름, 가격, 설명, 별점 */}
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>상품 이름</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={4} />
                  (2)
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">₩상품 가격</span>
                </ListGroup.Item>
                <ListGroup.Item>상품 설명</ListGroup.Item>
              </ListGroup>
            </Col>
            {/* 상품 상태, 상품 수량 */}
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>재고 상태: "in stock" : "out of stock"</ListGroup.Item>
                <ListGroup.Item>
                  가격: <span className="fw-bold">₩100,000원</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  수량:
                  <Form.Select
                    value={quantity}
                    onChange={quantityChangeHandler}
                    size="lg"
                    aria-label="Default select example"
                  >
                    <option value="1">1개</option>
                    <option value="2">2개</option>
                    <option value="3">3개</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} variant="danger">
                    장바구니
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h4>상품 리뷰</h4>
              <ListGroup variant="flush">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <ListGroup.Item key={idx}>
                    <strong>작성자</strong> <br />
                    <Rating readonly size={20} initialValue={3} /> <br />
                    <p>2022-02-01</p>
                    <p>리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <Alert variant="danger">리뷰를 작성하시려면 로그인 해주세요</Alert>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>리뷰 작성</Form.Label>
              <Form.Control name="comment" required as="textarea" rows={3} />
            </Form.Group>
            <Form.Select name="rating" required aria-label="Default select example">
              <option value="">별점</option>
              <option value="5">5 (매우 만족)</option>
              <option value="4">4 (만족)</option>
              <option value="3">3 (보통)</option>
              <option value="2">2 (불만족)</option>
              <option value="1">1 (매우 불만족)</option>
            </Form.Select>
            <Button type="submit" className="mb-3 mt-3" variant="primary">
              리뷰 등록
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
