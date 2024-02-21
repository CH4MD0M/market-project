import { Link } from 'react-router-dom';

import { useAppSelector } from '@hooks/reduxHooks';
import { useResetFilter } from '@hooks/useResetFilter';
import { selectCartSubtotal } from '@redux/modules/cartSlice/selector';
import addCommasToNumber from '@utils/addCommasToNumber';

// Components
import CenterWrapper from '@components/atoms/CenterWrapper';
import Heading from '@components/atoms/Heading';
import Button from '@components/atoms/Button';
import ItemPreviewContainer from '@components/pageComponents/CartOrderPage/CartOrderPreview';

// Assets
import EmptyImage from '@assets/imgs/empty-cart.png';

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

const CartItemList = () => {
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const cartSubtotal = useAppSelector(selectCartSubtotal);

  return (
    <>
      <Heading size="lg" className="mt-[80px] mb-[50px]">
        장바구니
      </Heading>
      <div className="grid md:grid-cols-[1fr_25%] md:gap-[30px] lg:gap-[60px]">
        <div>
          <ItemPreviewContainer itemList={cartItems} />
        </div>
        <div className="md:text-right border-[1px] rounded-xl h-fit p-4 pb-2">
          <div className="flex justify-between mb-3">
            <dt className="font-semibold">상품 금액</dt>
            <dd>
              <span>{addCommasToNumber(cartSubtotal)}</span>원
            </dd>
          </div>
          <div className="flex justify-between mb-3">
            <dt className="font-semibold">배송비</dt>
            <dd>
              <span>+ 0</span>원
            </dd>
          </div>
          <div className="flex justify-between mt-[40px] mb-[20px]">
            <dt className="font-semibold text-[25px] md:text-[20px]">총 결제 금액</dt>
            <dd>
              <h4 className="fw-bold">{addCommasToNumber(cartSubtotal)}원</h4>
            </dd>
          </div>
          <Link to="/purchase">
            <Button disabled={!cartSubtotal} variant="primary" size="full">
              결제하기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

const CartPage = () => {
  useResetFilter();

  const cartItems = useAppSelector(state => state.cart.cartItems);
  const cartItemExist = !!cartItems?.length;

  return (
    <CenterWrapper size={cartItemExist ? 'lg' : 'md'} className="px-[30px] lg:px-0">
      {cartItems?.length === 0 ? <EmptyCart /> : <CartItemList />}
    </CenterWrapper>
  );
};

export default CartPage;
