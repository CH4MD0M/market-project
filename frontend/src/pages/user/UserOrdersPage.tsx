import React, { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserLayout from '@layout/UserLayout';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  return (
    <UserLayout>
      <Col md={12}>
        <h1>주문 내역</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>주문 번호</th>
              <th>주문 날짜</th>
              <th>총 가격</th>
              <th>배송 상태</th>
              <th>주문 상세 내역</th>
            </tr>
          </thead>
          <tbody>
            {['bi bi-check-lg text-success', 'bi bi-x-lg text-danger'].map((variant, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>

                <td>2022-02-01</td>
                <td>₩100,000</td>
                <td>
                  <i className={variant} />
                </td>
                <td>
                  <Link to={`/user/order-details`}>주문 내역 확인</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </UserLayout>
  );
};

export default UserOrdersPage;
