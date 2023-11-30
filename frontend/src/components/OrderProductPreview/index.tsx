import { Col, Form, Image, ListGroup, Row } from 'react-bootstrap';

import numberWithCommas from '@utils/numberWithCommas';
import ReviewButton from '@pages/user/UserOrderDetailsPage/components/ReviewButton';

interface OrderProductPreviewProps {
  item: CartProduct;
  orderData?: OrderDetailsData;
}

const OrderProductPreview = ({ item, orderData = null }: OrderProductPreviewProps) => {
  return (
    <ListGroup.Item className="mb-5">
      <Row className="align-items-center">
        <Col sm={2}>
          <Image crossOrigin="anonymous" src={item?.image.path ?? null} fluid />
        </Col>
        <Col xs>{item.name}</Col>
        <Col xs>
          <b>{numberWithCommas(item.price)}원</b>
        </Col>
        <Col xs>
          <Form.Text>수량 {item.quantity} 개</Form.Text>
        </Col>
        <Col md="auto">
          {orderData && (
            <ReviewButton productId={item?._id} disabled={orderData && !item?.isReviewed} />
          )}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default OrderProductPreview;
