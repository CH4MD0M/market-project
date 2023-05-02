import Layout from '@/layout';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EditUser = () => {
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
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={1}>
            <Link to="/admin/users" className="btn btn-info my-3">
              뒤로가기
            </Link>
          </Col>
          <Col md={6}>
            <h1>사용자 정보 수정</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>사용자 이름</Form.Label>
                <Form.Control name="name" required type="text" defaultValue="홍길동" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이메일</Form.Label>
                <Form.Control name="email" required type="email" defaultValue="abc@email.com" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check name="isAdmin" type="checkbox" label="관리자 권한" checked={false} />
              </Form.Group>

              <Button variant="primary" type="submit">
                업데이트
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditUser;
