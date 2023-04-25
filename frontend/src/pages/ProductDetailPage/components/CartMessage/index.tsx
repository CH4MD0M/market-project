import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

const CartMessage = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>상품을 장바구니에 추가했습니다!</Alert.Heading>
      <>
        <Button variant="success" onClick={goBack}>
          뒤로가기
        </Button>
        <Link to="/cart">
          <Button variant="danger">장바구니로 이동</Button>
        </Link>
      </>
    </Alert>
  );
};

export default CartMessage;
