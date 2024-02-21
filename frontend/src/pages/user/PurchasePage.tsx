import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@hooks/reduxHooks';

import { useFetchUserInfo } from '@hooks/useFetchUserInfo';
import { useOrderHandler } from '@hooks/useOrderHandler';
import { getSingleProduct } from '@utils/api';
import addCommasToNumber from '@utils/addCommasToNumber';

import LoadingPage from '@pages/LoadingPage';
import CenterWrapper from '@components/atoms/CenterWrapper';
import Heading from '@components/atoms/Heading';
import Button from '@components/atoms/Button';
import ItemPreviewContainer from '@components/pageComponents/CartOrderPage/CartOrderPreview';

interface LocationState {
  state: { productId: string; isDirectPurchase: boolean; quantity: number };
}

const PurchasePage = () => {
  const { state } = useLocation() as LocationState;
  const userData = useAppSelector(state => state.user.userData, shallowEqual);

  const { userInfo, userInfoMissing, isLoading } = useFetchUserInfo(userData?._id);
  const { orderHandler, setDirectPurchaseItem, orderItemList, orderTotal } = useOrderHandler();

  useEffect(() => {
    if (!state?.isDirectPurchase) return;

    const fetchProductInfo = async () => {
      const { data } = await getSingleProduct(state.productId);
      const { _id, name, price, count, images } = data;
      setDirectPurchaseItem({
        _id,
        name,
        price,
        count,
        image: images[0] ?? null,
        quantity: state?.quantity,
      });
    };
    fetchProductInfo();
  }, [state?.productId, state?.isDirectPurchase]);

  return (
    <CenterWrapper size="lg" className="px-[30px] lg:px-0">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Heading size="lg" className="mt-[80px] mb-[50px]">
            주문/결제
          </Heading>
          <div className="grid md:grid-cols-[1fr_25%] md:gap-[30px] lg:gap-[60px]">
            <div>
              <section className="mb-[40px] border-b-[1px] pb-3">
                <h2 className="font-semibold text-[20px] mb-[10px]">배송지</h2>
                {userInfoMissing ? (
                  <span className="text-[red]">
                    배송지 정보가 없습니다. 프로필에서 배송지 정보를 업데이트 해주세요.
                  </span>
                ) : (
                  <>
                    <div className="flex mb-2">
                      <span className="block mr-4 w-[72px]">주소</span>
                      <span>{userInfo?.address}</span>
                    </div>
                    <div className="flex mb-2">
                      <span className="block mr-4 w-[72px]">우편번호</span>
                      <span>{userInfo?.zipCode}</span>
                    </div>
                  </>
                )}
              </section>
              <section className="mb-[40px] border-b-[1px] pb-3">
                <h2 className="font-semibold text-[20px] mb-[10px]">주문자</h2>
                <div className="flex mb-2">
                  <span className=" block mr-4 w-[72px]">이름</span>
                  <span>{userData?.name}</span>
                </div>

                <div className="flex mb-2">
                  <span className=" block mr-4 w-[72px]">이메일</span>
                  <span>{userData?.email}</span>
                </div>

                <div className="flex mb-2">
                  <span className="block mr-4 w-[72px]">휴대전화</span>

                  <span className={`${userInfo?.phoneNumber ? 'text-black' : 'text-[red]'}`}>
                    {userInfo?.phoneNumber ||
                      '휴대전화 정보가 없습니다. 프로필에서 정보를 업데이트 해주세요.'}
                  </span>
                </div>
              </section>
              <ItemPreviewContainer itemList={orderItemList} isPurchasePage />
            </div>

            <div className="md:text-right border-[1px] rounded-xl h-fit p-4 pb-2">
              <div className="flex justify-between mb-3">
                <dt className="font-semibold">상품 금액</dt>
                <dd>
                  <span>{addCommasToNumber(orderTotal)}</span>원
                </dd>
              </div>
              <div className="flex justify-between mb-3">
                <dt className="font-semibold">배송비</dt>
                <dd>
                  <span>+ 0</span>원
                </dd>
              </div>
              <div className="flex justify-between mt-[40px] mb-[20px]">
                <dt className="font-semibold text-[25px] md:text-[20px]">총 결제 금액</dt>
                <dd>
                  <h4 className="fw-bold">{addCommasToNumber(orderTotal)}원</h4>
                </dd>
              </div>

              <Button
                variant="primary"
                size="full"
                hovercolor="default"
                disabled={userInfoMissing || !orderTotal}
                onClick={() => orderHandler(state.isDirectPurchase)}
              >
                결제하기
              </Button>
            </div>
          </div>
        </>
      )}
    </CenterWrapper>
  );
};

export default PurchasePage;
