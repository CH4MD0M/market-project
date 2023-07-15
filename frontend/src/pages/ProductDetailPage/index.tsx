import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import ImageZoom from 'js-image-zoom';
import { Col, Container, Row, ListGroup, Form, Button, Image } from 'react-bootstrap';

import { useAppDispatch } from '@hooks/reduxHooks';
import { addToCart } from '@redux/modules/cartSlice';
import { getSingleProduct } from '@utils/api';
import numberWithCommas from '@utils/numberWithCommas';

import LoadingPage from '@pages/LoadingPage';
import CartMessage from './components/CartMessage';
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
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);

  // Add to cart handler
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
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
    getSingleProduct(id).then(({ data }) => {
      setProduct(data);
      setIsProductLoading(false);
    });
  }, [id]);

  if (isProductLoading) return <LoadingPage />;

  return (
    <Container>
      <CartMessage cartMessageShow={cartMessageShow} setCartMessageShow={setCartMessageShow} />
      <Row className="mt-5">
        {/* 상품 이미지 */}
        <Col style={{ zIndex: 1 }} md={2}>
          {product?.images.map((image, id) => (
            <div key={id}>
              <div key={id} id={`imageId${id + 1}`}>
                <Image fluid src={image?.path ?? null} />
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
                  {product?.reviewsNumber || 0})
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
                  가격: <span className="fw-bold">{numberWithCommas(product?.price)}</span>
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
                  <Button
                    className="w-100"
                    onClick={addToCartHandler}
                    type="button"
                    style={{ background: '#86CEEB', border: 'none' }}
                  >
                    장바구니
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {/* 리뷰 */}
          <ProductReview product={product} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
