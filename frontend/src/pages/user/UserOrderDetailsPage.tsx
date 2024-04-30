import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { getOrderDetails } from '@utils/api';

import LoadingPage from '@pages/LoadingPage';
import Heading from '@components/atoms/Heading';
import OrderProductPreview from '@components/pageComponents/UserPage/OrderProductPreview';
import DeliveryInformation from '@components/pageComponents/UserPage/DeliveryInformation';

const UserOrderDetailsPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState<OrderDetailsData>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const order = await getOrderDetails(orderId!);
        setOrderData(order);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchOrder();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <Heading size="lg" className="mt-[40px] mb-[20px]">
            주문 상세
          </Heading>

          <span className="block text-[18px] font-semibold mb-[30px]">
            {dayjs(orderData?.createdAt).format('YYYY.MM.DD')} 주문
          </span>

          <div className="mb-10">
            {orderData?.orderItems.map(item => (
              <OrderProductPreview orderProductData={item} key={item._id} />
            ))}
          </div>

          <DeliveryInformation />
        </div>
      )}
    </>
  );
};

export default UserOrderDetailsPage;
