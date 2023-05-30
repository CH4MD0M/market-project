import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

import { updateUserPhoneThunk } from '@redux/modules/userSlice/thunk';
import { useAppDispatch } from '@hooks/reduxHooks';
import { useInput } from '@hooks/useInput';
import { useToggle } from '@hooks/useToggle';
import { validatePhoneNumber } from '@utils/validation';

const PhoneInfo = ({ userInfo }: { userInfo: any }) => {
  const dispatch = useAppDispatch();
  const [phoneNumberEdit, togglePhoneNumberEdit] = useToggle(false);

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: onChangePhoneNumber,
    inputBlurHandler: onBlurPhoneNumber,
  } = useInput(validatePhoneNumber);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phoneNumberIsValid) return;

    dispatch(updateUserPhoneThunk({ phoneNumber }));
  };

  return (
    <div className="pt-3 pb-3 mb-2 d-flex align-items-center">
      <div className="me-3" style={{ width: '100px' }}>
        휴대폰 번호
      </div>
      <div className="flex-fill">
        <div className="p-2 mb-2 d-flex align-items-center justify-content-between bg-light">
          <p className="m-0">
            <strong>{userInfo.phoneNumber || '휴대폰 번호를 등록해주세요.'}</strong>
          </p>
          <Button onClick={togglePhoneNumberEdit} variant="outline-primary" size="sm">
            {phoneNumberEdit ? ' 휴대폰 번호 변경 취소' : '휴대폰 번호 변경'}
          </Button>
        </div>
        {phoneNumberEdit && (
          <>
            <Form className="d-flex align-items-center" onSubmit={submitHandler}>
              <Form.Group controlId="validationCustom01" className="me-3">
                <Form.Control
                  required
                  type="text"
                  placeholder="변경할 휴대폰 번호"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangePhoneNumber}
                  onBlur={onBlurPhoneNumber}
                />
              </Form.Group>
              <Button type="submit" disabled={!phoneNumberIsValid} variant="primary" size="sm">
                변경하기
              </Button>
            </Form>
            <Alert variant="danger" show={phoneNumberHasError} className="mt-3">
              휴대폰 번호를 확인해주세요.
            </Alert>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneInfo;
