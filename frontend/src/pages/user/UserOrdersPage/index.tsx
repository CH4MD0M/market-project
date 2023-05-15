import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserLayout from '@layout/UserLayout';
import { getOrdersForUser } from '@/utils/api';
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
          {orders.map((order, idx) => (
            <OrderPreview key={idx} order={order} />
          ))}
        </div>
      </Col>
    </UserLayout>
  );
};

export default UserOrdersPage;
