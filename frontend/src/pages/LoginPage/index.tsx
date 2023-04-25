import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [validated, setValidated] = useState(false);

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
          <h1>로그인</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control name="email" required type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control name="password" required type="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check name="doNotLogout" type="checkbox" label="로그인 유지" />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                아직 회원이 아니신가요?
                <Link to={'/register'}> Register </Link>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              Login
            </Button>
            <Alert show variant="danger">
              등록된 계정이 없습니다.
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
