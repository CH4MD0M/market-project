import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { useAppSelector } from '@hooks/reduxHooks';
import { getSingleProduct, updateProduct } from '@utils/api';

import EditAttrs from './components/EditAttrs';
import EditCategory from './components/EditCategory';
import EditImage from './components/EditImage';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { imageRemoved } = useAppSelector(state => state.product);

  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState<any>({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: '',
    error: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
      count: { value: string };
      price: { value: string };
      category: { value: string };
      attributesTable: [];
    };

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable: [] as const,
    };
    // const formInputs = {
    //   name: (form.namedItem('name') as HTMLInputElement).value,
    //   description: (form.namedItem('description') as HTMLInputElement).value,
    //   count: (form.namedItem('count') as HTMLInputElement).value,
    //   price: (form.namedItem('price') as HTMLInputElement).value,
    //   category: (form.namedItem('category') as HTMLSelectElement).value,
    //   attributesTable: [] as const,
    // };

    if (e.currentTarget.checkValidity()) {
      updateProduct(id, formInputs)
        .then(res => {
          if (res.status === 200) navigate('/admin/products');
        })
        .catch(err => {
          setUpdateProductResponseState({
            error: err.response && err.response.data?.message,
            message: err.response.data?.message,
          });
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    getSingleProduct(id)
      .then(res => setProduct(res.data))
      .catch(er => console.log(er));
  }, [id, imageRemoved]);

  const checkKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
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
          <h1>상품 수정</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={e => checkKeyDown(e)}
          >
            {/* 상품명 */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>상품명</Form.Label>
              <Form.Control name="name" required type="text" defaultValue={product.name} />
            </Form.Group>

            {/* 상품 설명 */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>상품 설명</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.description}
              />
            </Form.Group>

            {/* 재고 */}
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>재고</Form.Label>
              <Form.Control name="count" required type="number" defaultValue={product.count} />
            </Form.Group>

            {/* 가격 */}
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>가격</Form.Label>
              <Form.Control name="price" required type="text" defaultValue={product.price} />
            </Form.Group>

            {/* 카테고리 */}
            <EditCategory product={product} />

            {/* 속성 */}
            <EditAttrs />

            {/* 이미지 */}
            <EditImage product={product} id={id} />

            <Button variant="primary" type="submit">
              상품 업데이트
            </Button>
            {updateProductResponseState.error ?? ''}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(EditProduct);
