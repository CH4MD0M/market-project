import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { login } from '@redux/modules/authSlice/thunk';
import { useInput } from '@hooks/useInput';
import { useStoreUserInfo } from '@hooks/useStoreUserInfo';
import { validateEmail, validatePassword } from '@utils/validation';

const LoginPage = () => {
  const storeUserInfo = useStoreUserInfo();
  const loading = useAppSelector(state => state.auth.loading);
  const error = useAppSelector(state => state.auth.error);
  const dispatch = useAppDispatch();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: onChangeEmail,
    inputBlurHandler: onBlurEmail,
  } = useInput(validateEmail);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: onChangePassword,
    inputBlurHandler: onBlurPassword,
  } = useInput(validatePassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.elements;
    const doNotLogoutElement = form.namedItem('doNotLogout') as HTMLInputElement;
    const doNotLogout = doNotLogoutElement?.checked;
    const isFormValid = e.currentTarget.checkValidity();

    if (!(isFormValid && email && password)) return;

    const resultAction = await dispatch(login({ email, password, doNotLogout }));
    const { data } = unwrapResult(resultAction);
    storeUserInfo(doNotLogout, data.userInfo);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>로그인</h1>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                value={email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
              />
            </Form.Group>
            <Alert variant="danger" show={emailHasError}>
              이메일 형식(@포함)을 확인해주세요.
            </Alert>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                value={password}
                onChange={onChangePassword}
                onBlur={onBlurPassword}
              />
            </Form.Group>
            <Alert variant="danger" show={passwordHasError}>
              비밀번호를 6자 이상으로 설정해주세요.
            </Alert>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check name="doNotLogout" type="checkbox" label="로그인 유지" />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                아직 회원이 아니신가요?
                <Link to={'/register'}> 회원가입 </Link>
              </Col>
            </Row>
            <div className="d-grid mb-2">
              <Button
                variant="outline-primary"
                type="submit"
                disabled={!(emailIsValid && passwordIsValid)}
                size="lg"
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Login'
                )}
              </Button>
            </div>
            <Alert variant="danger" show={error}>
              오류가 발생했습니다. 이메일과 비밀번호를 확인해주세요.
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
