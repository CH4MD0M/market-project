import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { editUser, getSingleUser } from '@utils/api';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userInfoData, setUserInfoData] = useState<EditUserFormData>();
  const [isAdminState, setIsAdminState] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      isAdmin: { checked: boolean };
    };

    const formInputs = {
      name: form.name.value,
      email: form.email.value,
      isAdmin: form.isAdmin.checked,
    };

    if (e.currentTarget.checkValidity()) {
      const response = await editUser(id, formInputs);
      if (response.status === 200) navigate('/admin/users');
    }

    setValidated(true);
  };

  useEffect(() => {
    getSingleUser(id).then(data => {
      const { email, name, isAdmin } = data;
      setUserInfoData({ email, name, isAdmin });
      setIsAdminState(isAdmin);
    });
  }, [id]);

  return (
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
              <Form.Control name="name" required type="text" defaultValue={userInfoData?.name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control name="email" required type="email" defaultValue={userInfoData?.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="isAdmin"
                type="checkbox"
                label="관리자 권한"
                checked={isAdminState}
                onChange={e => setIsAdminState(e.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              업데이트
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser;
