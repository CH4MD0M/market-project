import { useEffect } from 'react';
import { Alert, Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { resetFilter } from '@redux/modules/filterSlice';
import { selectCartSubtotal } from '@redux/modules/cartSlice/selector';
import numberWithCommas from '@utils/numberWithCommas';
import CartPreview from '@components/CartPreview';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const cartSubtotal = useAppSelector(selectCartSubtotal);

  useEffect(() => {
    dispatch(resetFilter());
  }, []);

  return (
    <Container>
      {cartItems?.length === 0 ? (
        <>
          <Alert className="mt-5" variant="info">
            장바구니가 비어있습니다.
          </Alert>
          <div className="mt-5 d-flex justify-content-center">
            <LinkContainer to="/products">
              <Button type="button" size="lg" variant="outline-info">
                상품 담으러 가기
              </Button>
            </LinkContainer>
          </div>
        </>
      ) : (
        <>
          <h1>장바구니</h1>
          <Row className="mt-4 justify-content-between">
            <Col md={8} className="border">
              <ListGroup variant="flush">
                {cartItems?.map((item: CartProduct, idx: number) => (
                  <CartPreview item={item} key={idx} />
                ))}
                <ListGroupItem className="d-flex justify-content-center">
                  <span>배송비 무료</span>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3} className="border p-3 d-flex flex-column justify-content-between">
              <h3>결제 금액</h3>
              <div className="d-flex justify-content-between mt-4">
                <dt>총 상품 금액</dt>
                <dd>
                  <span>{numberWithCommas(cartSubtotal)}</span>원
                </dd>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <dt>배송비</dt>
                <dd>
                  <span>+ 0</span>원
                </dd>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <dt>결제금액</dt>
                <dd>
                  <h4 className="fw-bold">{numberWithCommas(cartSubtotal)}원</h4>
                </dd>
              </div>
              <div className="d-flex ">
                <LinkContainer to="/user/cart-details">
                  <Button
                    className="flex-grow-1 "
                    disabled={!cartSubtotal}
                    type="button"
                    variant="outline-info"
                  >
                    결제하기
                  </Button>
                </LinkContainer>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CartPage;
