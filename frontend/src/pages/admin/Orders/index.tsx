import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getOrdersForAdmin } from '@utils/api';

const Orders = () => {
  const [orders, setOrders] = useState<AdminOrderData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getOrdersForAdmin();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>주문 현황 관리</h1>
      <table>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>주문자</th>
            <th>주문일자</th>
            <th>주문금액</th>
            <th>배송상태</th>
            <th>주문 상세</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.orderTotal}</td>
              <td>
                {order.isDelivered ? (
                  <i className="bi bi-check-lg text-success"></i>
                ) : (
                  <i className="bi bi-x-lg text-danger"></i>
                )}
              </td>
              <td>
                <Link to={`/admin/order-details/${order._id}`}>주문 내역 확인</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
