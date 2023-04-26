import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminLinks from './components/AdminLinks';

const AdminOrdersPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>주문 현황 관리</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>주문번호</th>
              <th>주문자</th>
              <th>주문일자</th>
              <th>주문금액</th>
              <th>배송상태</th>
              <th>결제 방법</th>
              <th>주문 상세</th>
            </tr>
          </thead>
          <tbody>
            {['bi bi-check-lg text-success', 'bi bi-x-lg text-danger'].map((variant, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>사용자 이름</td>
                <td>2022-02-01</td>
                <td>₩100,000</td>
                <td>
                  <i className={variant} />
                </td>
                <td>₩100,000</td>
                <td>
                  <Link to={`/admin/order-details`}>주문 내역 확인</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminOrdersPage;
