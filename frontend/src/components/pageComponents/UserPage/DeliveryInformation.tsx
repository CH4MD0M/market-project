import { shallowEqual } from 'react-redux';

import { useAppSelector } from '@hooks/reduxHooks';
import { useFetchUserInfo } from '@hooks/useFetchUserInfo';

const DeliveryInformation = () => {
  const userData = useAppSelector(state => state.user.userData, shallowEqual);
  const userDeliveryInfo = useAppSelector(state => state.user.userProfileInfo, shallowEqual);
  const { userInfoMissing } = useFetchUserInfo(userData?._id);

  return (
    <>
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
              <span>{userDeliveryInfo?.address}</span>
            </div>
            <div className="flex mb-2">
              <span className="block mr-4 w-[72px]">우편번호</span>
              <span>{userDeliveryInfo?.zipCode}</span>
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

          <span className={`${userDeliveryInfo?.phoneNumber ? 'text-black' : 'text-[red]'}`}>
            {userDeliveryInfo?.phoneNumber ||
              '휴대전화 정보가 없습니다. 프로필에서 정보를 업데이트 해주세요.'}
          </span>
        </div>
      </section>
    </>
  );
};

export default DeliveryInformation;
