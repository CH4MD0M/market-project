import React, { useState } from 'react';
import {
  Alert,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const onHover: React.CSSProperties = {
  cursor: 'pointer',
  position: 'absolute',
  left: '5px',
  top: '-10px',
  transform: 'scale(2.7)',
};

const EditProduct = () => {
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
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            뒤로가기
          </Link>
        </Col>
        <Col md={6}>
          <h1>상품 수정</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* 상품명 */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>상품명</Form.Label>
              <Form.Control name="name" required type="text" defaultValue="상품명" />
            </Form.Group>

            {/* 상품 설명 */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>상품 설명</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue="상품 설명"
              />
            </Form.Group>

            {/* 재고 */}
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>재고</Form.Label>
              <Form.Control name="count" required type="number" defaultValue="20" />
            </Form.Group>

            {/* 가격 */}
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>가격</Form.Label>
              <Form.Control name="price" required type="text" defaultValue="100000" />
            </Form.Group>

            {/* 카테고리 */}
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>카테고리</Form.Label>
              <Form.Select id="cats" required name="category" aria-label="Default select example">
                <option value="">카테고리 선택</option>
                <option value="1">노트북</option>
                <option value="2">카메라</option>
                <option value="3">게임 타이틀</option>
              </Form.Select>
            </Form.Group>

            {/* 속성 */}
            <Row className="mt-5">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAttributes">
                  <Form.Label>속성 추가</Form.Label>
                  <Form.Select name="atrrKey" aria-label="Default select example">
                    <option value="">속성 선택</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAttributes">
                  <Form.Label>속성 값 추가</Form.Label>
                  <Form.Select name="atrrKey" aria-label="Default select example">
                    <option value="">속성 값 선택</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Table hover>
                <thead>
                  <tr>
                    <th>속성</th>
                    <th>값</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>속성 key</td>
                    <td>속성 value</td>
                    <td>
                      <CloseButton />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>

            {/* 새 속성 추가 */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>새 속성 추가</Form.Label>
                  <Form.Control name="newAttrValue" type="text" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                  <Form.Label>속성 값</Form.Label>
                  <Form.Control name="newAttrValue" type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Alert show variant="primary">
              속성 키와 속성 값이 모두 입력되어야 속성이 추가됩니다.
            </Alert>

            {/* 이미지 */}
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>상품 이미지</Form.Label>
              <Row>
                <Col style={{ position: 'relative' }} xs={3}>
                  <Image crossOrigin="anonymous" src="/images/games-category.png" fluid />
                  <i style={onHover} className="bi bi-x text-danger" />
                </Col>
                <Col style={{ position: 'relative' }} xs={3}>
                  <Image crossOrigin="anonymous" src="/images/games-category.png" fluid />
                  <i style={onHover} className="bi bi-x text-danger" />
                </Col>
              </Row>
              <Form.Control required name="images" type="file" multiple />
            </Form.Group>

            <Button variant="primary" type="submit">
              상품 업데이트
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
