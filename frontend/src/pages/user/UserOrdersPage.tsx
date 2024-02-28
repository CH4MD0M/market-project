import { useEffect, useState } from 'react';

import { getOrdersForUser } from '@utils/api';

import LoadingPage from '@pages/LoadingPage';
import Heading from '@components/atoms/Heading';
import OrderDetailsPreview from '@components/pageComponents/UserPage/OrderDetailsPreview';

const UserOrdersPage = () => {
  const [orderDataList, setOrderDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      try {
        const { data } = await getOrdersForUser();
        setOrderDataList(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <Heading size="lg" className="my-[40px]">
            주문 내역
          </Heading>
          <div>
            {orderDataList.length ? (
              orderDataList.map((order, idx) => (
                <OrderDetailsPreview key={idx} orderDetailsData={order} />
              ))
            ) : (
              <p>주문 내역이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrdersPage;
