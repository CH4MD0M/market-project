import React, { Dispatch, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

interface CartMessageProps {
  cartMessageShow: boolean;
  setCartMessageShow: Dispatch<SetStateAction<boolean>>;
}

const CartMessage = ({ cartMessageShow, setCartMessageShow }: CartMessageProps) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Alert
      show={cartMessageShow}
      variant="success"
      onClose={() => setCartMessageShow(false)}
      dismissible
    >
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
