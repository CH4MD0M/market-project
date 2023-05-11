import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import CartPreview from '@components/CartPreview';
import { getSingleUser, postOrder } from '@utils/api';
import { useNavigate } from 'react-router-dom';

const UserCartPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { cartItems, itemsCount, cartSubtotal } = useAppSelector(state => state.cart);

  const [userInfo, setUserInfo] = useState<UserAddressInfo>({});
  const [addressMessage, setAddressMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pp');

  useEffect(() => {
    const getUserAddress = async () => {
      const { address, zipCode, phoneNumber } = await getSingleUser(user._id);

      if (!address || !zipCode || !phoneNumber) {
        setAddressMessage('. 주소와 휴대전화 번호를 불러올 수 없습니다. 프로필에서 확인해주세요.');
        setButtonDisabled(true);
      } else {
        setUserInfo({ address, zipCode, phoneNumber });
        setButtonDisabled(false);
      }
    };

    getUserAddress();
  }, []);

  const orderHandler = () => {
    const orderData: OrderData = {
      orderTotal: {
        itemsCount,
        cartSubtotal,
      },
      cartItems,
      paymentMethod,
    };

    postOrder(orderData)
      .then(res => {
        if (res.status === 201) {
          navigate(`/user/order-details/${res.data._id}`);
        }
      })
      .catch(err => console.log(err));
  };

  const paymentChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Container>
      <Row className="mt-4">
        <h1>결제하기</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h4>주문자 정보</h4>
              <b>이름</b>: {user.name} <br />
              <b>주소</b>: {userInfo.address}, {userInfo.zipCode}
              <br />
              <b>휴대전화</b>: {userInfo.phoneNumber}
            </Col>
            <Col md={6}>
              <h4>결제 방법</h4>
              <Form.Select onChange={paymentChangeHandler}>
                <option value="pp">PayPal</option>
                <option value="acc">무통장</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert className="mt-3" variant="danger">
                배송 미완료
                {addressMessage}
              </Alert>
            </Col>
            <Col>
              <Alert className="mt-3" variant="danger">
                결제 미완료
              </Alert>
            </Col>
          </Row>
          <hr />
          <h2>주문 상품</h2>
          <ListGroup variant="flush">
            {cartItems.map((item: CartProduct, idx: number) => (
              <CartPreview key={idx} item={item} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>주문 내역</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              상품 가격: <span className="fw-bold">₩ {cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              배송비: <span className="fw-bold">포함됨</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              합계: <span className="fw-bold">₩ {cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={orderHandler}
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                >
                  주문하기
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartPage;
