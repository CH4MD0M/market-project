import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

import { saveAttributeThunk } from '@redux/modules/categorySlice/thunk';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import {
  deleteProductImage,
  getSingleProduct,
  updateProduct,
  uploadProductImage,
} from '@utils/api';

const onHover: React.CSSProperties = {
  cursor: 'pointer',
  position: 'absolute',
  left: '5px',
  top: '-10px',
  transform: 'scale(2.7)',
};

const EditProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories } = useAppSelector(state => state.category);

  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState<any>({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: '',
    error: '',
  });

  const [attributesFromDb, setAttributesFromDb] = useState([]); // for select lists
  const [attributesTable, setAttributesTable] = useState([]); // for html table
  const [categoryChoosen, setCategoryChoosen] = useState('Choose category');
  const [newAttrKey, setNewAttrKey] = useState('');
  const [newAttrValue, setNewAttrValue] = useState('');
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isUploading, setIsUploading] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);

  const setValuesForAttrFromDbSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '속성 선택') {
      var selectedAttr = attributesFromDb.find(item => item.key === e.target.value);
      let valuesForAttrKeys = attrVal.current;
      if (selectedAttr && selectedAttr.value.length > 0) {
        while (valuesForAttrKeys.options.length) {
          valuesForAttrKeys.remove(0);
        }
        valuesForAttrKeys.options.add(new Option('속성 값 선택'));
        selectedAttr.value.map((item: string) => {
          valuesForAttrKeys.add(new Option(item));
          return '';
        });
      }
    }
  };

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

  useEffect(() => {
    let categoryOfEditedProduct = categories.find(item => item.name === product.category);

    if (categoryOfEditedProduct) {
      const mainCategoryOfEditedProduct = categoryOfEditedProduct.name.split('/')[0];
      const mainCategoryOfEditedProductAllData = categories.find(
        categoryOfEditedProduct => categoryOfEditedProduct.name === mainCategoryOfEditedProduct,
      );

      if (mainCategoryOfEditedProductAllData?.attrs.length > 0) {
        setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs);
      }
    }
    setCategoryChoosen(product.category);
    setAttributesTable(product.attrs);
  }, [product]);

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const highLevelCategory = e.target.value.split('/')[0];
    const highLevelCategoryAllData = categories.find(cat => cat.name === highLevelCategory);
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
      setAttributesFromDb(highLevelCategoryAllData.attrs);
    } else {
      setAttributesFromDb([]);
    }
    setCategoryChoosen(e.target.value);
  };

  const attributeValueSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '속성 값 선택') {
      setAttributesTableWrapper(attrKey.current.value, e.target.value);
    }
  };

  const setAttributesTableWrapper = (key: string, val: string) => {
    setAttributesTable(attr => {
      if (attr.length !== 0) {
        var keyExistsInOldTable = false;
        let modifiedTable = attr.map(item => {
          if (item.key === key) {
            keyExistsInOldTable = true;
            item.value = val;
            return item;
          } else {
            return item;
          }
        });
        if (keyExistsInOldTable) return [...modifiedTable];
        else return [...modifiedTable, { key: key, value: val }];
      } else {
        return [{ key: key, value: val }];
      }
    });
  };

  const deleteAttribute = (key: string) => {
    setAttributesTable(table => table.filter(item => item.key !== key));
  };

  const checkKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const newAttrKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewAttrKey(e.currentTarget.value);
    addNewAttributeManually(e);
  };

  const newAttrValueHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewAttrValue(e.currentTarget.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newAttrKey && newAttrValue) {
        dispatch(saveAttributeThunk({ key: newAttrKey, val: newAttrValue, categoryChoosen }));
        setAttributesTableWrapper(newAttrKey, newAttrValue);
        e.currentTarget.value = '';
        createNewAttrKey.current.value = '';
        createNewAttrVal.current.value = '';
        setNewAttrKey('');
        setNewAttrValue('');
      }
    }
  };

  const deleteImageHandler = (imagePath: string) => {
    deleteProductImage(imagePath, id).then(() => setImageRemoved(prevState => !prevState));
  };

  const uploadImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setIsUploading('Uploading...');
      const formData = new FormData();
      formData.append('image', files[0]);
      const { data } = await uploadProductImage(id, formData);
      if (data) {
        setImageUploaded(true);
        setIsUploading('');
      }
    }
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
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>카테고리</Form.Label>
              <Form.Select
                id="cats"
                required
                name="category"
                aria-label="Default select example"
                onChange={changeCategory}
              >
                <option value="Choose category">카테고리 선택</option>
                {categories.map((category, idx) => {
                  return product.category === category.name ? (
                    <option selected key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ) : (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            {/* 속성 */}
            {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>속성 추가</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={setValuesForAttrFromDbSelectForm}
                    >
                      <option>속성 선택</option>
                      {attributesFromDb.map((item, idx) => (
                        <Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                    <Form.Label>속성 값</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                      onChange={attributeValueSelected}
                    >
                      <option>속성 값 선택</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              {attributesTable && attributesTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>속성</th>
                      <th>값</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton onClick={() => deleteAttribute(item.key)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>

            {/* 새 속성 추가 */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>새 속성 추가</Form.Label>
                  <Form.Control
                    ref={createNewAttrKey}
                    disabled={categoryChoosen === 'Choose category'}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttrKeyHandler}
                    required={!!newAttrValue}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                  <Form.Label>속성 값</Form.Label>
                  <Form.Control
                    name="newAttrValue"
                    type="text"
                    ref={createNewAttrVal}
                    disabled={categoryChoosen === 'Choose category'}
                    required={!!newAttrKey}
                    placeholder="first choose or create category"
                    onKeyUp={newAttrValueHandler}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert show={!!newAttrKey && !!newAttrValue} variant="primary">
              속성 키와 속성 값이 모두 입력되어야 속성이 추가됩니다.
            </Alert>

            {/* 이미지 */}
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>상품 이미지</Form.Label>
              <Row>
                {product.images &&
                  product.images.map((image: any, idx: string) => (
                    <Col key={idx} style={{ position: 'relative' }} xs={3}>
                      <Image crossOrigin="anonymous" src={image.path ?? null} fluid />
                      <i
                        style={onHover}
                        onClick={() => deleteImageHandler(image.path)}
                        className="bi bi-x text-danger"
                      ></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control required type="file" multiple onChange={uploadImageHandler} />
              {isUploading}
            </Form.Group>

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

export default EditProduct;
