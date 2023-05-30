import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import ImageZoom from 'js-image-zoom';
import { Col, Container, Row, ListGroup, Form, Button, Image } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { addToCartAsync } from '@/redux/modules/cartSlice/thunk';

import CartMessage from './components/CartMessage';
import { getSingleProduct } from '@/utils/api';
import ProductReview from './components/ProductReview';

const options = {
  scale: 2,
  offset: { vertical: 0, horizontal: 0 },
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [cartMessageShow, setCartMessageShow] = useState<boolean>(false);
  const [reviewUpdated, setReviewUpdated] = useState<boolean>(false);

  // Add to cart handler
  const addToCartHandler = async () => {
    await dispatch(addToCartAsync({ id, quantity }));
    setCartMessageShow(true);
  };

  // Quantity change handler
  const quantityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  // Image zoom
  useEffect(() => {
    if (product?.images) {
      product?.images.map(
        (_, id) => new ImageZoom(document.getElementById(`imageId${id + 1}`), options),
      );
    }
  });

  useEffect(() => {
    getSingleProduct(id).then(({ data }) => setProduct(data));
  }, [id, reviewUpdated]);

  return (
    <Container>
      <CartMessage cartMessageShow={cartMessageShow} setCartMessageShow={setCartMessageShow} />
      <Row className="mt-5">
        {/* 상품 이미지 */}
        <Col style={{ zIndex: 1 }} md={2}>
          {product?.images.map((image, id) => (
            <div key={id}>
              <div key={id} id={`imageId${id + 1}`}>
                <Image crossOrigin="anonymous" fluid src={`${image.path ?? null}`} />
              </div>
              <br />
            </div>
          ))}
        </Col>
        <Col md={10}>
          <Row>
            {/* 상품이름, 가격, 설명, 별점 */}
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product?.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={product?.rating} />(
                  {product?.reviewsNumber})
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">{product?.price}</span>
                </ListGroup.Item>
                <ListGroup.Item>{product?.description}</ListGroup.Item>
              </ListGroup>
            </Col>

            {/* 상품 상태, 상품 수량 */}
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>재고 상태: {`${product?.count}개 남음` || '품절'}</ListGroup.Item>
                <ListGroup.Item>
                  가격: <span className="fw-bold">{product?.price}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  수량:
                  <Form.Select
                    value={quantity}
                    onChange={quantityChangeHandler}
                    size="lg"
                    aria-label="Default select example"
                  >
                    {[...Array(product?.count).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
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

          {/* 리뷰 */}
          <ProductReview product={product} setReviewUpdated={setReviewUpdated} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
