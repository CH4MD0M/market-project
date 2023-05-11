import React from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { addToCartAsync } from '@/redux/modules/cartSlice/thunk';
import { removeFromCart } from '@/redux/modules/cartSlice';

interface CartPreviewProps {
  item: CartProduct;
  orderCreated?: boolean;
}

const CartPreview = ({ item, orderCreated = false }: CartPreviewProps) => {
  const { productID } = item;
  const dispatch = useAppDispatch();

  const changeCountHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(addToCartAsync({ id: productID, quantity: Number(e.target.value) }));
  };

  const removeCartItemHandler = () => {
    dispatch(removeFromCart({ productID, quantity: item.quantity, price: item.price }));
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image crossOrigin="anonymous" src={item?.image.path ?? null} fluid />
        </Col>
        <Col md={2}>{item.name}</Col>
        <Col md={2}>
          <b>₩ {item.price}</b>
        </Col>
        <Col md={3}>
          <Form.Select onChange={changeCountHandler} disabled={orderCreated} value={item.quantity}>
            {[...Array(item.count).keys()].map(x => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button type="button" variant="secondary" onClick={removeCartItemHandler}>
            <i className="bi bi-trash" />
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartPreview;
