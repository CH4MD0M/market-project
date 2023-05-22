import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@hooks/reduxHooks';
import { createProduct } from '@utils/api/createProduct';

import CreateCatgegory from './components/CreateCategory';
import CreateAttrs from './components/CreateAttrs';
import CreateImage from './components/CreateImage';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { attributesTable, uploadedImageData } = useAppSelector(state => state.product);
  const [validated, setValidated] = useState(false);

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
      count: { value: string };
      price: { value: string };
      category: { value: string };
    };

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable,
      images: uploadedImageData,
    };

    if (e.currentTarget.checkValidity()) {
      const response = await createProduct(formInputs);
      if (response.status === 200) navigate('/admin/products');
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            뒤로가기
          </Link>
        </Col>
        <Col md={6}>
          <h1>상품 추가</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={e => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >
            {/* 상품명 */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>상품명</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>

            {/* 상품 설명 */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>상품 설명</Form.Label>
              <Form.Control name="description" required as="textarea" rows={3} />
            </Form.Group>

            {/* 재고 */}
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>재고</Form.Label>
              <Form.Control name="count" required type="number" />
            </Form.Group>

            {/* 가격 */}
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>가격</Form.Label>
              <Form.Control name="price" required type="text" />
            </Form.Group>

            {/* 카테고리 */}
            <CreateCatgegory />

            {/* 속성 */}
            <CreateAttrs />

            {/* 이미지 */}
            <CreateImage />

            <Button variant="primary" type="submit">
              상품 등록
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
