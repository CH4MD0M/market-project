import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [validated, setValidated] = useState(false);
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  const handleOnChange = () => {
    const password = document.querySelector<HTMLInputElement>('input[name=password]');
    const confirmPassword = document.querySelector<HTMLInputElement>('input[name=confirmPassword]');

    if (confirmPassword && password) {
      setPasswordsMatchState(confirmPassword.value === password.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>회원가입</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* 이름 */}
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>이름</Form.Label>
              <Form.Control required type="text" placeholder="이름" name="name" />
              <Form.Control.Feedback type="invalid">이름을 입력해 주세요</Form.Control.Feedback>
            </Form.Group>
            {/* 이메일 */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control name="email" required type="email" placeholder="이메일" />
              <Form.Control.Feedback type="invalid">
                이메일 주소를 입력해 주세요
              </Form.Control.Feedback>
            </Form.Group>
            {/* 비밀번호 */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="비밀번호"
                minLength={6}
                onChange={handleOnChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">비밀번호를 입력해 주세요</Form.Control.Feedback>
              <Form.Text className="text-muted">비밀번호는 6자 이상이어야 합니다.</Form.Text>
            </Form.Group>
            {/* 비밀번호 확인 */}
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="비밀번호 확인"
                minLength={6}
                onChange={handleOnChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                비밀번호가 일치하지 않습니다.
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="pb-2">
              <Col>
                이미 계정이 있으신가요?
                <Link to={'/login'}> Login </Link>
              </Col>
            </Row>
            <Button type="submit">
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              회원가입
            </Button>
            <Alert show variant="danger">
              이미 가입된 계정입니다.
            </Alert>
            <Alert show variant="info">
              회원가입 완료
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
