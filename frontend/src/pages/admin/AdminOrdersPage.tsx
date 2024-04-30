import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { getOrdersForAdmin } from '@utils/api';

import Heading from '@components/atoms/Heading';

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
      <Heading size="lg" className="my-[40px]">
        주문 현황 관리
      </Heading>
      <table className="w-full border-t-2 border-t-[#969696] border-solid border-collapse">
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
            <tr
              key={idx}
              className="[&_td]:md:px-[30px] [&_td]:py-3.5 [&_td]:text-center border-b-[1px] border-b-[#969696] border-solid"
            >
              <td>{idx + 1}</td>
              <td>{order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.orderTotal}</td>
              <td>
                {order.isDelivered ? (
                  <CheckIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <XMarkIcon className="w-6 h-6 text-red-500" />
                )}
              </td>
              <td>
                <Link
                  to={`/admin/orders/${order._id}`}
                  className="hover:text-[rgb(155,201,232)] duration-150"
                >
                  주문 내역 확인
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
