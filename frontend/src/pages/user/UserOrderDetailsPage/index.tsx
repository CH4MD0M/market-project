import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderDetails } from '@utils/api';

import LoadingPage from '@pages/LoadingPage';
import OrderProductPreview from '@components/OrderProductPreview';

const UserOrderDetailsPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState<OrderDetailsData>();
  const [userInfo, setUserInfo] = useState<OrderUserData>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const order = await getOrderDetails(orderId!);
        setOrderData(order);
        setUserInfo(order.user);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchOrder();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1>주문/결제</h1>
          <section className="mt-4">
            <div>
              <section className="d-flex justify-content-between mt-5 mb-5">
                <div className="w-75">
                  {orderData?.cartItems.map((item: CartProduct, idx: number) => (
                    <OrderProductPreview orderData={orderData} item={item} key={idx} />
                  ))}
                </div>
              </section>
              <h4>배송지</h4>
              <hr />
              <section className="mt-2 mb-5">
                <label className="d-flex mb-2">
                  <div className="me-4" style={{ width: '72px' }}>
                    주소
                  </div>
                  <div>{userInfo?.address}</div>
                </label>
                <label className="d-flex mb-2">
                  <div className="me-4" style={{ width: '72px' }}>
                    우편번호
                  </div>
                  <div>{userInfo?.zipCode}</div>
                </label>
              </section>

              <section className="mt-5">
                <h4>주문자</h4>
                <hr />
                <label className="d-flex mb-2">
                  <div className="me-4" style={{ width: '72px' }}>
                    이름
                  </div>
                  <div>{userInfo?.name}</div>
                </label>

                <label className="d-flex mb-2">
                  <div className="me-4" style={{ width: '72px' }}>
                    이메일
                  </div>
                  <div>{userInfo?.email}</div>
                </label>

                <label className="d-flex mb-2">
                  <div className="me-4" style={{ width: '72px' }}>
                    휴대전화
                  </div>
                  <div>
                    {userInfo?.phoneNumber || (
                      <span style={{ color: 'red' }}>
                        휴대전화 정보가 없습니다.
                        <br /> 프로필에서 배송지 정보를 업데이트 해주세요.
                      </span>
                    )}
                  </div>
                </label>
              </section>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default UserOrderDetailsPage;
