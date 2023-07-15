import { Alert, Button, Form } from 'react-bootstrap';

import { updateUserPasswordThunk } from '@redux/modules/userSlice/thunk';
import { useAppDispatch } from '@hooks/reduxHooks';
import { useInput } from '@hooks/useInput';
import { validatePassword } from '@utils/validation';

const PasswordInfo = () => {
  const dispatch = useAppDispatch();

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: onChangePassword,
    inputBlurHandler: onBlurPassword,
  } = useInput(validatePassword);

  const {
    value: passwordCheck,
    isValid: passwordCheckIsValid,
    hasError: passwordCheckHasError,
    valueChangeHandler: onChangePasswordCheck,
    inputBlurHandler: onBlurPasswordCheck,
  } = useInput(value => value === password);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserPasswordThunk({ password }));
  };

  return (
    <div className="pt-3 pb-3 mb-2 d-flex align-items-center">
      <div className="me-3" style={{ width: '100px' }}>
        비밀번호
      </div>
      <Form className="flex-fill" onSubmit={submitHandler}>
        <Form.Group className="mb-3 flex-" controlId="Password">
          <Form.Label>새 비밀번호</Form.Label>
          <Form.Control
            name="password"
            required
            type="password"
            placeholder="비밀번호"
            minLength={6}
            value={password}
            onChange={onChangePassword}
            onBlur={onBlurPassword}
          />
          <Form.Text className="text-muted">비밀번호는 6자 이상이어야 합니다.</Form.Text>
        </Form.Group>
        <Alert variant="danger" show={passwordHasError}>
          비밀번호를 6자 이상으로 설정해주세요.
        </Alert>
        <Form.Group className="mb-2" controlId="formBasicPasswordRepeat">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            name="confirmPassword"
            required
            type="password"
            placeholder="비밀번호 확인"
            minLength={6}
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            onBlur={onBlurPasswordCheck}
          />
        </Form.Group>
        <Alert variant="danger" show={passwordCheckHasError}>
          비밀번호가 일치하지 않습니다.
        </Alert>
        <Button type="submit" disabled={!(passwordIsValid && passwordCheckIsValid)} size="sm">
          비밀번호 변경
        </Button>
      </Form>
    </div>
  );
};

export default PasswordInfo;
