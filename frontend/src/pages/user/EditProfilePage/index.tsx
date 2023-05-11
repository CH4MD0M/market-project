import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

import { getSingleUser } from '@utils/api';
import { updateUserProfile } from '@redux/modules/userSlice/thunk';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import Postcode from '@components/PostCode';

import { unwrapResult } from '@reduxjs/toolkit';
import { StorageType, setValue } from '@utils/storageUtils';

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { userAddress, error, isUpdate } = useAppSelector(state => state.user);
  const [userInfo, setUserInfo] = useState<any>({});
  const [validated, setValidated] = useState(false);
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  const { address, zipCode } = userAddress;

  const onChange = () => {
    const password = document.querySelector('input[name=password]') as HTMLInputElement;
    const confirmPassword = document.querySelector(
      'input[name=confirmPassword]',
    ) as HTMLInputElement;
    setPasswordsMatchState(confirmPassword.value === password.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.elements;

    const name = (form.namedItem('name') as HTMLInputElement).value;
    const phoneNumber = (form.namedItem('phoneNumber') as HTMLInputElement).value;
    const password = (form.namedItem('password') as HTMLInputElement).value;
    const detailAddress = (form.namedItem('detailAddress') as HTMLInputElement)?.value;

    if (e.currentTarget.checkValidity() && passwordsMatchState) {
      const data = await dispatch(
        updateUserProfile({
          name,
          phoneNumber,
          password,
          zipCode,
          address: `${address} ${detailAddress}`,
        }),
      );

      const response = unwrapResult(data);

      if (response.status === 200) {
        const { isAdmin, ...rest } = response.data.userUpdated;
        if (user.doNotLogout) {
          setValue(StorageType.LOCAL, 'userInfo', { doNotLogout: true, ...rest });
        } else {
          setValue(StorageType.SESSION, 'userInfo', { doNotLogout: false, ...rest });
        }
      }
    }
    setValidated(true);
  };

  useEffect(() => {
    getSingleUser(user._id)
      .then(data => setUserInfo(data))
      .catch(er => console.log(er));
  }, []);

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>프로필 수정</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
            {/* 이름 */}
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>이름</Form.Label>
              <Form.Control required type="text" defaultValue={userInfo.name} name="name" />
              <Form.Control.Feedback type="invalid">이름을 입력해 주세요</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control disabled value={userInfo.email || ''} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>핸드폰 번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="변경할 핸드폰 번호를 입력해주세요"
                defaultValue={userInfo.phoneNumber}
                name="phoneNumber"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicZip">
              <Form.Label>주소</Form.Label>
              <div className="d-flex">
                <Form.Control
                  className="flex-grow-1"
                  type="text"
                  placeholder="우편번호"
                  defaultValue={userInfo.zipCode}
                  value={zipCode || ''}
                  readOnly
                  name="zipCode"
                />
                <Postcode />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Address">
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="주소"
                defaultValue={userInfo.address}
                value={address || ''}
                readOnly
                name="address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="DetailAddress">
              <Form.Control
                type="text"
                placeholder="상세 주소"
                defaultValue={userInfo.address}
                name="detailAddress"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="비밀번호"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                올바른 비밀번호를 입력해 주세요.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">비밀번호는 6자 이상이어야 합니다.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="비밀번호 확인"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                비밀번호가 일치하지 않습니다.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid mb-3">
              <Button variant="outline-primary" type="submit" size="lg">
                수정
              </Button>
            </div>
            <Alert show={error} variant="danger">
              오류가 발생했습니다.
            </Alert>
            <Alert show={isUpdate} variant="info">
              프로필 정보가 수정되었습니다.
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;
