import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { Alert, Col, Container, Row } from 'react-bootstrap';

import { resetUpdateSatatus } from '@redux/modules/userSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { getSingleUser } from '@utils/api';

import NameInfo from './components/NameInfo';
import PhoneInfo from './components/PhoneInfo';
import AddressInfo from './components/AddressInfo';
import PasswordInfo from './components/PasswordInfo';

const EditProfilePage = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(state => state.user.userData, shallowEqual);
  const error = useAppSelector(state => state.user.error);
  const isUpdate = useAppSelector(state => state.user.isUpdate);

  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getSingleUser(userData._id);
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userInfo, userData]);

  // isUpdate 상태 리셋
  useEffect(() => {
    if (isUpdate) {
      setTimeout(() => {
        dispatch(resetUpdateSatatus());
      }, 2500);
    }
  }, [isUpdate]);

  return (
    <Container>
      <Row className="mt-5 mb-3 justify-content-md-center">
        <Col md={6}>
          <Alert show={error} variant="danger">
            오류가 발생했습니다.
          </Alert>
          <Alert show={isUpdate} variant="info">
            프로필 정보가 수정되었습니다.
          </Alert>
          <div className="mb-5">
            <h1>프로필 수정</h1>
          </div>
          <div>
            {/* 이메일 */}
            <div className="pt-3 pb-3 mb-2 d-flex align-items-center">
              <div className="me-3" style={{ width: '100px' }}>
                이메일
              </div>
              <p className="m-0 ">
                <strong>{userInfo.email}</strong>
              </p>
            </div>

            {/* 이름 */}
            <NameInfo userInfo={userInfo} />

            {/* 휴대폰 번호 */}
            <PhoneInfo userInfo={userInfo} />

            {/* 주소 */}
            <AddressInfo userInfo={userInfo} />

            {/* 비밀번호 */}
            <PasswordInfo />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;
