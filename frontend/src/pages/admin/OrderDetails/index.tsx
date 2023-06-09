import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Alert, Form, Button, Container } from 'react-bootstrap';

import { getOrderDetails, markAsDelivered } from '@utils/api';
import CartPreview from '@components/CartPreview';

const UserInformation = ({ userInfo }: any) => (
  <Col md={6}>
    <h2>주문자 정보</h2>
    <b>이름</b>: {userInfo.name}
    <br />
    <b>Address</b>: {userInfo.address} {userInfo.zipCode}
    <br />
    <b>Phone</b>: {userInfo.phoneNumber}
  </Col>
);

const OrderStatus = ({ isDelivered, isPaid }: any) => (
  <Row>
    <Col>
      <Alert className="mt-3" variant={isDelivered ? 'success' : 'danger'}>
        {isDelivered ? '배송 완료' : '배송 준비중'}
      </Alert>
    </Col>
    <Col>
      <Alert className="mt-3" variant={isPaid ? 'success' : 'danger'}>
        {isPaid ? '결제됨' : '결제 대기중'}
      </Alert>
    </Col>
  </Row>
);

const OrderItems = ({ cartItems }: { cartItems: CartProduct[] }) => (
  <>
    <h2>주문 상품</h2>
    <ListGroup variant="flush">
      {cartItems.map((item: CartProduct, idx: number) => (
        <CartPreview key={idx} item={item} orderCreated={true} />
      ))}
    </ListGroup>
  </>
);

const OrderSummary = ({ cartSubtotal, buttonDisabled, orderButtonMessage, deliverHandle }: any) => (
  <ListGroup>
    <ListGroup.Item>
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
    </ListGroup.Item>
  </ListGroup>
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

  // 배송 처리
  const deliverHandle = () => {
    markAsDelivered(id)
      .then(res => {
        if (res) setIsDelivered(true);
      })
      .catch(er =>
        console.log(er.response.data.message ? er.response.data.message : er.response.data),
      );
  };

  const fetchOrder = useCallback(async () => {
    try {
      const order = await getOrderDetails(id);
      setUserInfo(order.user);

      order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
      order.isDelivered ? setIsDelivered(order.deliveredAt) : setIsDelivered(false);
      setCartSubtotal(order.orderTotal.cartSubtotal);
      if (order.isDelivered) {
        setOrderButtonMessage('배송 완료');
        setButtonDisabled(true);
      }
      setCartItems(order.cartItems);

      setIsLoading(false);
    } catch (error) {
      console.log('There was an error while fetching the order details: ');
    }
  }, []);

  useEffect(() => {
    fetchOrder();
  }, [isDelivered, id]);

  return (
    <Container>
      <Row className="mt-4">
        <h1>내 주문</h1>
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
      </Row>
    </Container>
  );
};

export default OrderDetails;
