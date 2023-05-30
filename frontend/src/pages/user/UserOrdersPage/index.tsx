import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';

import UserLayout from '@layout/UserLayout';
import { getOrdersForUser } from '@utils/api';
import OrderPreview from './components/OrderPreview/indext';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getOrdersForUser();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <UserLayout>
      <Col md={12}>
        <h1>주문 내역</h1>
        <div>
          {orders.length ? (
            orders.map((order, idx) => <OrderPreview key={idx} order={order} />)
          ) : (
            <p>주문 내역이 없습니다.</p>
          )}
        </div>
      </Col>
    </UserLayout>
  );
};

export default UserOrdersPage;
