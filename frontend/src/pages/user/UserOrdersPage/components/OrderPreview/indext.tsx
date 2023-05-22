import React from 'react';
import { Link } from 'react-router-dom';

import CartPreview from '@components/CartPreview';

interface OrderPreviewProps {
  order: any;
}

const OrderPreview = ({ order }: OrderPreviewProps) => {
  const { _id, createdAt, cartItems } = order;

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between">
        <div>
          <span>{createdAt.substring(0, 10)}</span>
        </div>

        <Link to={`/user/order-details/${_id}`}>
          상세보기 <i className="bi bi-arrow-right-short" />
        </Link>
      </div>
      <hr />
      <div>
        {cartItems.map((item: any, idx: number) => (
          <CartPreview key={idx} item={item} orderCreated={true} />
        ))}
      </div>
    </section>
  );
};

export default OrderPreview;
