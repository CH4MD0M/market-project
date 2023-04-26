import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

const UserProfilePage = () => {
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
          <h1>프로필 수정</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* 이름 */}
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>이름</Form.Label>
              <Form.Control
                required
                type="text"
                // defaultValue={user.name}
                name="name"
              />
              <Form.Control.Feedback type="invalid">이름을 입력해 주세요</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control disabled value="email@email.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>핸드폰 번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="변경할 핸드폰 번호를 입력해주세요"
                // defaultValue
                name="phoneNumber"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>주소</Form.Label>
              <Form.Control
                type="text"
                placeholder="변경할 주소를 입력해주세요"
                // defaultValue
                name="address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>국가</Form.Label>
              <Form.Control
                type="text"
                placeholder="변경할 국가를 입력해 주세요"
                // defaultValue
                name="country"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZip">
              <Form.Label>우편번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="변경할 우편번호를 입력해 주세요"
                // defaultValue
                name="zipCode"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>도시</Form.Label>
              <Form.Control
                type="text"
                placeholder="변경할 도시를 입력해 주세요"
                // defaultValue
                name="city"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              수정
            </Button>
            <Alert show variant="danger">
              오류가 발생했습니다.
            </Alert>
            <Alert show variant="info">
              프로필이 수정되었습니다.
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
