import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderDetails, markAsDelivered } from '@utils/api';

const UserInformation = ({ userInfo }: any) => (
  <div>
    <h2>주문자 정보</h2>
    <b>이름</b>: {userInfo.name}
    <br />
    <b>Address</b>: {userInfo.address} {userInfo.zipCode}
    <br />
    <b>Phone</b>: {userInfo.phoneNumber}
  </div>
);

const OrderStatus = ({ isDelivered, isPaid }: any) => (
  <div>
    {/* <Col>
      <Alert className="mt-3" variant={isDelivered ? 'success' : 'danger'}>
        {isDelivered ? '배송 완료' : '배송 준비중'}
      </Alert>
    </Col>
    <Col>
      <Alert className="mt-3" variant={isPaid ? 'success' : 'danger'}>
        {isPaid ? '결제됨' : '결제 대기중'}
      </Alert>
    </Col> */}
  </div>
);

const OrderItems = ({ cartItems }: { cartItems: CartProduct[] }) => (
  <>
    <h2>주문 상품</h2>
    <div>
      {/* {cartItems.map((item: CartProduct, idx: number) => (
        <OrderProductPreview key={idx} item={item} />
      ))} */}
    </div>
  </>
);

const OrderSummary = ({ cartSubtotal, buttonDisabled, orderButtonMessage, deliverHandle }: any) => (
  <div>
    {/* <ListGroup.Item>
      <h3>주문 내역</h3>
    </ListGroup.Item>
    <ListGroup.Item>
      상품 가격: <span className="fw-bold">{cartSubtotal}</span>
    </ListGroup.Item>
    <ListGroup.Item>
      배송비: <span className="fw-bold">포함됨</span>
    </ListGroup.Item>
    <ListGroup.Item className="text-danger">
      합계: <span className="fw-bold">{cartSubtotal}</span>
    </ListGroup.Item>
    <ListGroup.Item>
      <div className="d-grid gap-2">
        <Button
          size="lg"
          variant="danger"
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
    </ListGroup.Item> */}
  </div>
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

      setUserInfo(order.user);
      setIsPaid(order.isPaid);
      setIsDelivered(order.isDelivered);
      setCartSubtotal(order.orderTotal);

      if (order.isDelivered) {
        setOrderButtonMessage('배송 완료');
        setButtonDisabled(true);
      }
      setCartItems(order.cartItems);

      setIsLoading(false);
    } catch (error) {
      console.log('주문 정보를 불러오는데 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    fetchOrder();
  }, [isDelivered, id]);

  return (
    <div className="container">
      {/* <Row className="mt-4">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Col md={8}>
              <br />
              <Row>
                <UserInformation userInfo={userInfo} />
              </Row>
              <OrderStatus isDelivered={isDelivered} isPaid={isPaid} />
              <hr />
              <OrderItems cartItems={cartItems} />
            </Col>
            <Col md={4}>
              <OrderSummary
                cartSubtotal={cartSubtotal}
                buttonDisabled={buttonDisabled}
                orderButtonMessage={orderButtonMessage}
                deliverHandle={deliverHandle}
              />
            </Col>
          </>
        )}
      </Row> */}
    </div>
  );
};

export default OrderDetails;
