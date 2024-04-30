import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderDetails, markAsDelivered } from '@utils/api';

import Alert from '@components/atoms/Alert';
import Button from '@components/atoms/Button';
import OrderProductPreview from '@components/pageComponents/UserPage/OrderProductPreview';

const UserInformation = ({ userInfo }: any) => (
  <div>
    <h2>주문자 정보</h2>
    <b>이름</b>: {userInfo.name}
    <br />
    <b>주소</b>: {userInfo.address} {userInfo.zipCode}
    <br />
    <b>연락처</b>: {userInfo.phoneNumber}
  </div>
);

const OrderStatus = ({ isDelivered, isPaid }: any) => (
  <div className="flex">
    <Alert className="mt-3" variant={isDelivered ? 'success' : 'warning'}>
      {isDelivered ? '배송 완료' : '배송 준비중'}
    </Alert>

    <Alert className="mt-3" variant={isDelivered ? 'success' : 'warning'}>
      {isPaid ? '결제됨' : '결제 대기중'}
    </Alert>
  </div>
);

const OrderItems = ({ cartItems }: { cartItems: OrderProduct[] }) => (
  <>
    <h2>주문 상품</h2>
    <div>
      {cartItems?.map((item: CartProduct, idx: number) => (
        <OrderProductPreview key={idx} orderProductData={item} />
      ))}
    </div>
  </>
);

const OrderSummary = ({ cartSubtotal, buttonDisabled, orderButtonMessage, deliverHandle }: any) => (
  <ul>
    <li>
      <h3>주문 내역</h3>
    </li>
    <li>
      상품 가격: <span className="fw-bold">{cartSubtotal}</span>
    </li>
    <li>
      배송비: <span className="fw-bold">포함됨</span>
    </li>
    <li className="text-danger">
      합계: <span className="fw-bold">{cartSubtotal}</span>
    </li>
    <li>
      <div className="d-grid gap-2">
        <Button
          size="lg"
          hovercolor="default"
          type="button"
          disabled={buttonDisabled}
          onClick={deliverHandle}
        >
          {orderButtonMessage}
        </Button>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div id="paypal-container-element"></div>
      </div>
    </li>
  </ul>
);

const OrderDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState('배달 처리하기');
  const [cartItems, setCartItems] = useState([]);

  // deliverHandle
  const deliverHandle = () => {
    markAsDelivered(id!)
      .then(res => {
        if (res) setIsDelivered(true);
      })
      .catch(er =>
        console.log(er.response.data.message ? er.response.data.message : er.response.data),
      );
  };

  const fetchOrder = useCallback(async () => {
    try {
      const order = await getOrderDetails(id!);
      console.log(order);

      setUserInfo(order.user);
      setIsPaid(order.isPaid);
      setIsDelivered(order.isDelivered);
      setCartSubtotal(order.orderTotal);

      if (order.isDelivered) {
        setOrderButtonMessage('배송 완료');
        setButtonDisabled(true);
      }
      setCartItems(order.orderItems);

      setIsLoading(false);
    } catch (error) {
      console.log('주문 정보를 불러오는데 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    fetchOrder();
  }, [isDelivered, id]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <UserInformation userInfo={userInfo} />

          <OrderStatus isDelivered={isDelivered} isPaid={isPaid} />

          <OrderItems cartItems={cartItems} />

          <OrderSummary
            cartSubtotal={cartSubtotal}
            buttonDisabled={buttonDisabled}
            orderButtonMessage={orderButtonMessage}
            deliverHandle={deliverHandle}
          />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
