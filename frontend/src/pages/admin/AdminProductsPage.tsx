import React from 'react';

import { Button, Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AdminLinks from './components/AdminLinks';

const AdminProductsPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>
          상품 관리
          <LinkContainer to="/admin/create-new-product">
            <Button variant="primary" size="lg">
              상품 추가
            </Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>상품 번호</th>
              <th>상품명</th>
              <th>가격</th>
              <th>카테고리</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Lenovo', price: '700000', category: '노트북' },
              { name: 'Canon', price: '2000000', category: '카메라' },
              { name: 'Splatoon3', price: '50000', category: '게임 타이틀' },
            ].map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <LinkContainer to={`/admin/edit-product`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {' / '}
                  <Button variant="danger" className="btn-sm">
                    <i className="bi bi-x-circle"></i>
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

export default AdminProductsPage;
