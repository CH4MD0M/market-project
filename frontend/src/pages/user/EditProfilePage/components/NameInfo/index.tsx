import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Alert, Button, Form } from 'react-bootstrap';

import { updateUserNameThunk } from '@redux/modules/userSlice/thunk';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useStoreUserInfo } from '@hooks/useStoreUserInfo';
import { useInput } from '@hooks/useInput';
import { useToggle } from '@hooks/useToggle';
import { validateName } from '@utils/validation';

const NameInfo = ({ userInfo }: { userInfo: any }) => {
  const storeUserInfo = useStoreUserInfo();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.user);
  const [nameEdit, toggleNameEdit] = useToggle(false);

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: onChangeName,
    inputBlurHandler: onBlurName,
  } = useInput(validateName);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameIsValid) return;

    const resultAction = await dispatch(updateUserNameThunk({ name }));
    const { userUpdated } = unwrapResult(resultAction);
    storeUserInfo(userData.doNotLogout, userUpdated);
  };

  return (
    <>
      {/* 이름 */}
      <div className="pt-3 pb-3 mb-2 d-flex align-items-center">
        <div className="me-3" style={{ width: '100px' }}>
          이름
        </div>
        <div className="flex-fill">
          <div className="p-2 d-flex align-items-center justify-content-between bg-light">
            <p className="m-0">
              <strong>{userInfo.name}</strong>
            </p>
            <Button onClick={toggleNameEdit} variant="outline-primary" size="sm">
              {nameEdit ? '이름 변경 취소' : '이름 변경'}
            </Button>
          </div>
          {nameEdit && (
            <>
              <Form className="d-flex align-items-center mt-3" onSubmit={submitHandler}>
                <Form.Group controlId="validationCustom01" className="me-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="변경할 이름"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    onBlur={onBlurName}
                  />
                </Form.Group>
                <Button type="submit" disabled={!nameIsValid} variant="primary" size="sm">
                  변경하기
                </Button>
              </Form>
              <Alert variant="danger" show={nameHasError} className="mt-3">
                이름을 확인해 주세요.
              </Alert>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NameInfo;
