import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import { removeFromCart } from '@redux/modules/cartSlice';
import { selectItemsCount, selectCartSubtotal } from '@redux/modules/cartSlice/selector';
import { getSingleUser, postOrder, updateOrder } from '@utils/api';
import numberWithCommas from '@utils/numberWithCommas';

import LoadingPage from '@pages/LoadingPage';
import CartPreview from '@components/CartPreview';

const UserPerchasePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.user.userData, shallowEqual);
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const itemsCount = useAppSelector(selectItemsCount);
  const cartSubtotal = useAppSelector(selectCartSubtotal);

  const [userInfo, setUserInfo] = useState<UserAddressInfo>();
  const [userInfoMissing, setUserInfoMissing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const { address, phoneNumber, zipCode } = await getSingleUser(userData._id);

        if (!address || !zipCode || !phoneNumber) setUserInfoMissing(true);
        setUserInfo({ address, zipCode, phoneNumber });
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchUserInfo();
  }, []);

  const orderHandler = async () => {
    const orderData: OrderData = {
      orderTotal: {
        itemsCount,
        cartSubtotal,
      },
      cartItems,
    };

    try {
      const response = await postOrder(orderData);
      if (response.status === 201) {
        cartItems.forEach(({ _id }) => {
          dispatch(removeFromCart({ _id }));
        });
        updateOrder(response.data._id);
        navigate(`/user/order-details/${response.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1>주문/결제</h1>
          <section className="mt-4 d-flex justify-content-between">
            <div className="w-75 me-5">
              <ListGroup variant="flush">
                <ListGroupItem className="mb-5">
                  <h4>배송지</h4>
                  <section className="mt-2 mb-2">
                    {userInfoMissing ? (
                      <span style={{ color: 'red' }}>
                        배송지 정보가 없습니다. <br /> 프로필에서 배송지 정보를 업데이트 해주세요.
                      </span>
                    ) : (
                      <>
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
                      </>
                    )}
                  </section>
                </ListGroupItem>
                <ListGroupItem className="mb-5">
                  <h4>주문자</h4>
                  <section>
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
                </ListGroupItem>
                {cartItems?.map((item: CartProduct, idx: number) => (
                  <CartPreview item={item} key={idx} />
                ))}
                <ListGroupItem className="d-flex justify-content-center mt-2">
                  <span>배송비 무료</span>
                </ListGroupItem>
              </ListGroup>
            </div>
            <div className="w-25 border p-3 d-flex flex-column justify-content-start">
              <h3>결제 금액</h3>
              <div className="d-flex justify-content-between mt-4">
                <dt>총 상품 금액</dt>
                <dd>
                  <span>{numberWithCommas(cartSubtotal)}</span>원
                </dd>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <dt>배송비</dt>
                <dd>
                  <span>+ 0</span>원
                </dd>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <dt>결제금액</dt>
                <dd>
                  <h4 className="fw-bold">{numberWithCommas(cartSubtotal)}원</h4>
                </dd>
              </div>
              <div className="d-flex">
                <Button
                  className="flex-grow-1"
                  disabled={userInfoMissing || !cartSubtotal}
                  onClick={orderHandler}
                  type="button"
                >
                  주문하기
                </Button>
              </div>
            </div>
          </section>
        </>
      )}
    </Container>
  );
};

export default UserPerchasePage;
