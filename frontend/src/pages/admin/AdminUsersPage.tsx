import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import AdminLinks from './components/AdminLinks';

const AdminUsersPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>사용자 목록</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>사용자 이름</th>
              <th>이메일</th>
              <th>관리자 권한</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            {['bi bi-check-lg text-success', 'bi bi-x-lg text-danger'].map((variant, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>홍길동</td>
                <td>abc@email.com</td>
                <td>
                  <i className={variant} />
                </td>
                <td>
                  <LinkContainer to={`/admin/edit-user`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square" />
                    </Button>
                  </LinkContainer>
                  {' / '}
                  <Button variant="danger" className="btn-sm">
                    <i className="bi bi-x-circle" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminUsersPage;
