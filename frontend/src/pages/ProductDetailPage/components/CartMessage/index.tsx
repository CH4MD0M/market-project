import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

interface CartMessageProps {
  cartMessageShow: boolean;
  setCartMessageShow: Dispatch<SetStateAction<boolean>>;
}

const CartMessage = ({ cartMessageShow, setCartMessageShow }: CartMessageProps) => {
  return (
    <Alert
      show={cartMessageShow}
      variant="success"
      onClose={() => setCartMessageShow(false)}
      dismissible
    >
      <Alert.Heading>상품을 장바구니에 추가했습니다!</Alert.Heading>
      <Link to="/cart">
        <Button style={{ background: '#86CEEB', border: 'none' }}>장바구니로 이동</Button>
      </Link>
    </Alert>
  );
};

export default CartMessage;
