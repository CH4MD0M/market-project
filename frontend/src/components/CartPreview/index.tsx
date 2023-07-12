import React from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';

import { useAppDispatch } from '@hooks/reduxHooks';
import { removeFromCart, updateCart } from '@redux/modules/cartSlice';
import numberWithCommas from '@utils/numberWithCommas';

interface CartPreviewProps {
  item: CartProduct;
  orderCreated?: boolean;
}

const CartPreview = ({ item, orderCreated = false }: CartPreviewProps) => {
  const dispatch = useAppDispatch();

  const changeCountHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateCart({ ...item, quantity: Number(e.target.value) }));
  };

  const removeCartItemHandler = () => {
    dispatch(removeFromCart({ _id: item._id }));
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image crossOrigin="anonymous" src={item?.image.path ?? null} fluid />
        </Col>
        <Col md={2}>{item.name}</Col>
        <Col md={2}>
          <b>{numberWithCommas(item.price)}원</b>
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
        {!orderCreated && (
          <Col md={3}>
            <Button type="button" variant="secondary" onClick={removeCartItemHandler}>
              <i className="bi bi-trash" />
            </Button>
          </Col>
        )}
      </Row>
    </ListGroup.Item>
  );
};

export default CartPreview;
