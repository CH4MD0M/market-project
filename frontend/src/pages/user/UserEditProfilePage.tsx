import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { resetUpdateSatatus } from '@redux/modules/userSlice';
import { useFetchUserInfo } from '@hooks/useFetchUserInfo';

// Components
import Alert from '@components/atoms/Alert';
import Heading from '@components/atoms/Heading';
import NameInfo from '@components/pageComponents/UserPage/UserEditProfilePage/NameInfo';
import PhoneInfo from '@components/pageComponents/UserPage/UserEditProfilePage/PhoneInfo';
import AddressInfo from '@components/pageComponents/UserPage/UserEditProfilePage/AddressInfo';
import PasswordInfo from '@components/pageComponents/UserPage/UserEditProfilePage/PasswordInfo';

const UserEditProfilePage = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(state => state.user.error);
  const isUpdate = useAppSelector(state => state.user.isUpdate);
  const userId = useAppSelector(state => state.user.userData._id);
  const userName = useAppSelector(state => state.user.userData.name);
  const userEmail = useAppSelector(state => state.user.userData.email);
  const userProfileInfo = useAppSelector(state => state.user.userProfileInfo, shallowEqual);

  useFetchUserInfo(userId);

  // reset isUpdate status
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isUpdate) {
      timer = setTimeout(() => {
        dispatch(resetUpdateSatatus());
      }, 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isUpdate]);

  return (
    <div>
      <Heading size="lg" className="mt-[40px] mb-[20px]">
        회원정보 수정
      </Heading>

      {isUpdate && <Alert variant="success">프로필 정보가 수정되었습니다.</Alert>}
      {error && <Alert variant="warning">{error}</Alert>}

      <table className="w-full border-t-2 border-t-[#969696] border-solid border-collapse">
        <tbody>
          <tr>
            <th className="w-[100px] bg-[#eef1f8] text-left whitespace-nowrap px-[30px] py-3.5 border-b-[#ddd] border-b border-solid">
              이메일
            </th>
            <td className="px-[10px] md:px-[30px] py-3.5 border-l-[#ddd] border-l border-solid border-b-[#ddd] border-b">
              {userEmail}
            </td>
          </tr>

          <NameInfo userName={userName} />
          <PhoneInfo userPhoneNum={userProfileInfo.phoneNumber} />
          <AddressInfo
            userAddress={userProfileInfo.address}
            userZipCode={userProfileInfo.zipCode}
          />
          <PasswordInfo />
        </tbody>
      </table>
    </div>
  );
};

export default UserEditProfilePage;
