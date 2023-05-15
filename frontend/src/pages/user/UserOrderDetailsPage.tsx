import React, { useEffect, useState } from 'react';
import { Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import CartPreview from '@components/CartPreview';
import { getSingleUser } from '@/utils/api';
import { LinkContainer } from 'react-router-bootstrap';

const UserOrderDetailsPage = () => {
  const { userData } = useAppSelector(state => state.user);
  const { cartItems, itemsCount, cartSubtotal } = useAppSelector(state => state.cart);
  const [userInfo, setUserInfo] = useState<UserAddressInfo>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { address, phoneNumber, zipCode } = await getSingleUser(userData._id);
      setUserInfo({ address, zipCode, phoneNumber });
    };

    fetchUserInfo();
  }, []);

  return (
    <Container>
      <h1>주문/결제</h1>
      <section className="mt-4">
        <div>
          <section className="d-flex justify-content-between mt-5 mb-5">
            <div className="w-75">
              {cartItems?.map((item: CartProduct, idx: number) => (
                <CartPreview item={item} key={idx} orderCreated={true} />
              ))}
            </div>
            <div className="w-25">
              <Button type="button" size="sm" variant="info" style={{ color: 'white' }}>
                리뷰 작성하기
              </Button>
              <LinkContainer to="/user/service">
                <Button className="ms-2" type="button" size="sm" variant="outline-info">
                  문의하기
                </Button>
              </LinkContainer>
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
              <div>{userData.name}</div>
            </label>

            <label className="d-flex mb-2">
              <div className="me-4" style={{ width: '72px' }}>
                이메일
              </div>
              <div>{userData.email}</div>
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
    </Container>
  );
};

export default UserOrderDetailsPage;
