import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';

import { getOrdersForUser } from '@utils/api';

import UserLayout from '@layout/UserLayout';
import LoadingPage from '@pages/LoadingPage';
import OrderPreview from './components/OrderPreview';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      try {
        const { data } = await getOrdersForUser();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <UserLayout>
      {isLoading ? (
        <LoadingPage />
      ) : (
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
      )}
    </UserLayout>
  );
};

export default UserOrdersPage;
