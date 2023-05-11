import React from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '@redux/modules/authSlice/thunk';
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';
import useInput from '@hooks/useInput';
import { validateEmail, validatePassword } from '@utils/validation';
import { unwrapResult } from '@reduxjs/toolkit';

const RegisterPage = () => {
  const { loading, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: onChangeName,
    inputBlurHandler: onBlurName,
  } = useInput(value => value.trim() !== '');
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

  const {
    value: passwordCheck,
    isValid: passwordCheckIsValid,
    hasError: passwordCheckHasError,
    valueChangeHandler: onChangePasswordCheck,
    inputBlurHandler: onBlurPasswordCheck,
  } = useInput(value => value === password);

  let formIsValid = nameIsValid && emailIsValid && passwordIsValid && passwordCheckIsValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!formIsValid) return;

    const data = await dispatch(signup({ name, email, password }));
    const response = unwrapResult(data);
    if (response.status === 201) navigate('/login');
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>회원가입</h1>
          <Form noValidate onSubmit={handleSubmit}>
            {/* 이름 */}
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>이름</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="이름"
                name="name"
                value={name}
                onChange={onChangeName}
                onBlur={onBlurName}
              />
            </Form.Group>
            <Alert variant="danger" show={nameHasError}>
              이름을 입력해 주세요.
            </Alert>
            {/* 이메일 */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="이메일"
                value={email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
              />
            </Form.Group>
            <Alert variant="danger" show={emailHasError}>
              이메일 형식(@포함)을 확인해주세요.
            </Alert>
            {/* 비밀번호 */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
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
            </Form.Group>
            <Alert variant="danger" show={passwordHasError}>
              비밀번호를 6자 이상으로 설정해주세요.
            </Alert>
            {/* 비밀번호 확인 */}
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
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

            <div className="d-grid mt-5 mb-3">
              <Button variant="outline-primary" type="submit" size="lg" disabled={!formIsValid}>
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  '회원가입'
                )}
              </Button>
            </div>
            {error && (
              <Alert show variant="danger">
                이미 가입된 계정입니다.
              </Alert>
            )}
            <Row>
              <Col>
                이미 계정이 있으신가요?
                <Link to={'/login'}> Login </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
