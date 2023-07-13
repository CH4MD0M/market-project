import React, { Fragment, useRef, useState } from 'react';
import { Alert, CloseButton, Col, Form, Row, Table } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { saveAttributeThunk } from '@redux/modules/categorySlice/thunk';
import { setAttributesFromDb, setAttributesTable } from '@redux/modules/productSlice';

const CreateAttrs = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.category.selectedCategory);
  const attributesFromDb = useAppSelector(state => state.product.attributesFromDb);
  const attributesTable = useAppSelector(state => state.product.attributesTable);

  const [newAttrKey, setNewAttrKey] = useState('');
  const [newAttrValue, setNewAttrValue] = useState('');

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);

  const setValuesForAttrFromDbSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '속성 선택') {
      var selectedAttr = attributesFromDb?.find((item: any) => item.key === e.target.value);
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

  const attributeValueSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '속성 값 선택') {
      setAttributesTableWrapper(attrKey.current.value, e.target.value);
    }
  };

  const setAttributesTableWrapper = (key: string, val: string) => {
    const modifiedTable = modifyAttributesTable(key, val);
    dispatch(setAttributesTable(modifiedTable));
  };

  const modifyAttributesTable = (key: string, val: string) => {
    if (attributesTable.length !== 0) {
      let keyExistsInOldTable = false;
      const modifiedTable = attributesTable.map((item: any) => {
        if (item.key === key) {
          keyExistsInOldTable = true;
          return { ...item, value: val };
        } else {
          return item;
        }
      });
      if (keyExistsInOldTable) return [...modifiedTable];
      else return [...modifiedTable, { key: key, value: val }];
    } else {
      return [{ key: key, value: val }];
    }
  };

  // Delete Attribute
  const deleteAttribute = (key: string) => {
    const modifiedTable = filterAttributesTable(key);
    dispatch(setAttributesTable(modifiedTable));
  };

  const filterAttributesTable = (key: string) => {
    return attributesTable.filter((item: any) => item.key !== key);
  };

  // Add new attribute
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
    if (e.key === 'Enter' && newAttrKey && newAttrValue) {
      dispatch(saveAttributeThunk({ key: newAttrKey, val: newAttrValue }))
        .unwrap()
        .then(res => {
          const { categoriesUpdated } = res;
          const categoryData = categoriesUpdated.find(
            (category: any) => category.name === selectedCategory,
          );
          dispatch(setAttributesFromDb(categoryData.attrs || []));
        });
      setAttributesTableWrapper(newAttrKey, newAttrValue);

      e.currentTarget.value = '';
      createNewAttrKey.current.value = '';
      createNewAttrVal.current.value = '';
      setNewAttrKey('');
      setNewAttrValue('');
    }
  };

  return (
    <>
      {attributesFromDb.length > 0 && (
        <Row className="mt-5">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicAttributes">
              <Form.Label>속성 추가</Form.Label>
              <Form.Select
                name="atrrKey"
                aria-label="Default select example"
                ref={attrKey}
                onChange={e => setValuesForAttrFromDbSelectForm(e)}
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
            <Form.Group className="mb-3" controlId="formBasicAttributes">
              <Form.Label>속성 값 추가</Form.Label>
              <Form.Select
                name="atrrVal"
                aria-label="Default select example"
                ref={attrVal}
                onChange={attributeValueSelected}
              >
                <option value="">속성 값 선택</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      )}

      {/* 속성 테이블 */}
      <Row>
        {attributesTable.length > 0 && (
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
              name="newAttrKey"
              type="text"
              placeholder="먼저 카테고리를 선택하거나 생성하세요"
              ref={createNewAttrKey}
              disabled={['', 'Choose category'].includes(selectedCategory)}
              required={!!newAttrKey}
              onKeyUp={newAttrKeyHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
            <Form.Label>속성 값</Form.Label>
            <Form.Control
              name="newAttrValue"
              type="text"
              placeholder="먼저 카테고리를 선택하거나 생성하세요"
              ref={createNewAttrVal}
              disabled={['', 'Choose category'].includes(selectedCategory)}
              required={!!newAttrValue}
              onKeyUp={newAttrValueHandler}
            />
          </Form.Group>
        </Col>
      </Row>
      <Alert show={!!newAttrKey && !!newAttrValue} variant="primary">
        속성 키와 속성 값이 모두 입력되어야 속성이 추가됩니다.
      </Alert>
    </>
  );
};

export default CreateAttrs;
