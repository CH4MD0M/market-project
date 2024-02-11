import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { resetFilter } from '@redux/modules/filterSlice';
import { selectCartSubtotal } from '@redux/modules/cartSlice/selector';

// Components
import CartPreview from '@components/CartPreview';
import CenterWrapper from '@components/atoms/CenterWrapper';
import Button from '@components/atoms/Button';

// Assets
import EmptyImage from '@assets/imgs/empty-cart.png';
import { useResetFilter } from '@/hooks/useResetFilter';

// Empty Cart
const EmptyCart = () => {
  return (
    <div className="p-2 flex flex-col items-center">
      <img src={EmptyImage} alt="Empty Cart" className="w-[350px]" />

      <div>
        <Button variant={'primary'} className="mt-[30px]">
          <Link to="/products">상품 담으러 가기</Link>
        </Button>
      </div>
    </div>
  );
};

const CartPage = () => {
  useResetFilter();
  const dispatch = useAppDispatch();
  const cartSubtotal = useAppSelector(selectCartSubtotal);

  const cartItems = useAppSelector(state => state.cart.cartItems);
  const cartItemExist = !!cartItems?.length;

  return (
    <CenterWrapper size={cartItemExist ? 'lg' : 'md'}>
      {cartItems?.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-rows-[1fr_25%]">
          <div></div>
          <div></div>
        </div>
      )}
    </CenterWrapper>
  );
};

export default CartPage;

{
  /* <Row className="mt-4 justify-content-between">
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
          </Row> */
}
