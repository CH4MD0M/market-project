import { Fragment, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setCategoryAttributes, setSelectedAttributes } from '@redux/modules/productSlice';
import { saveAttributeThunk } from '@redux/modules/categorySlice/thunk';

const AttrsForm = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.category.selectedCategory);
  const categoryAttributes = useAppSelector(state => state.product.categoryAttributes);
  const selectedAttributes = useAppSelector(state => state.product.selectedAttributes);

  const [selectedAttrKey, setSelectedAttrKey] = useState('');
  const [selectedAttrVal, setSelectedAttrVal] = useState('');
  const [valuesForSelectedAttrKey, setValuesForSelectedAttrKey] = useState<string[]>([]);
  const [newAttrKey, setNewAttrKey] = useState('');
  const [newAttrValue, setNewAttrValue] = useState('');

  // When attribute key is selected
  const handleAttrKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === '속성 선택') return;

    setSelectedAttrKey(value);

    const selectedAttr = categoryAttributes?.find((item: any) => item.key === value);
    if (selectedAttr && selectedAttr.value.length > 0) {
      setValuesForSelectedAttrKey(selectedAttr.value);
    } else {
      setValuesForSelectedAttrKey([]);
    }
  };

  // When value for attribute key is selected
  const handleAttrValSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === '속성 값 선택') return;

    setSelectedAttrVal(value);
    // Update Attributes Table
    modifyAttributesTable(selectedAttrKey, value);

    setSelectedAttrKey('');
    setSelectedAttrVal('');
    setValuesForSelectedAttrKey([]);
  };

  // When new attribute key, value is entered
  const handleNewAttrChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setter(e.target.value);
    };

  // Add new attribute Handler
  const addNewAttribute = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!newAttrKey || !newAttrValue) return;
    if (e.key !== 'Enter') return;
    const newAttr = { key: newAttrKey, val: newAttrValue };

    const { updatedCategories } = await dispatch(saveAttributeThunk(newAttr)).unwrap();

    // Updated category attributes
    const updatedAttrs = updatedCategories.find((item: any) => item.name === selectedCategory)
      ?.attrs;
    dispatch(setCategoryAttributes(updatedAttrs));
    // Update Attributes Table
    modifyAttributesTable(newAttrKey, newAttrValue);

    // Reset input fields
    setNewAttrKey('');
    setNewAttrValue('');
    setSelectedAttrKey('');
    setSelectedAttrVal('');
  };

  // Update selectedAttributes state
  const modifyAttributesTable = (attrKey: string, attrValue: string) => {
    const isKeyExistsInOldTable = selectedAttributes.some((item: any) => item.key === attrKey);

    const modifiedTable = isKeyExistsInOldTable
      ? selectedAttributes.map((item: any) => {
          if (item.key === attrKey) {
            // if 'attribute key' already exists in the table, ONLY update the Value
            return { ...item, value: attrValue };
          } else {
            // OR, Add 'new attribute'
            return item;
          }
        })
      : [...selectedAttributes, { key: attrKey, value: attrValue }];

    dispatch(setSelectedAttributes(modifiedTable));
  };

  // Delete Attribute and Update Table
  const deleteAttribute = (key: string) => {
    const modifiedTable = selectedAttributes.filter((item: any) => item.key !== key);
    dispatch(setSelectedAttributes(modifiedTable));
  };

  return (
    <div>
      {/* {selectedCategory && ( */}
      <>
        {/* 속성 선택 */}
        {/* <Row className="mb-2 mt-5">
            <span className="fs-5 mb-2">속성 선택</span>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicAttributes">
                <Form.Select
                  name="attrKey"
                  aria-label="Default select example"
                  value={selectedAttrKey}
                  onChange={handleAttrKeyChange}
                >
                  <option>속성 선택</option>
                  {categoryAttributes.map((item, idx) => (
                    <Fragment key={idx}>
                      <option value={item.key}>{item.key}</option>
                    </Fragment>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicAttributes">
                <Form.Select
                  name="attrVal"
                  aria-label="Default select example"
                  value={selectedAttrVal}
                  onChange={handleAttrValSelected}
                >
                  <option>속성 값 선택</option>
                  {valuesForSelectedAttrKey.map((item: any, idx: number) => (
                    <Fragment key={idx}>
                      <option value={item}>{item}</option>
                    </Fragment>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row> */}

        {/* 새 속성 추가 */}
        {/* <Row className="mb-5 mt-3">
            <span className="fs-5 mb-2">속성 추가</span>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                <Form.Control
                  name="newAttrKey"
                  type="text"
                  placeholder="새로 추가할 속성을 입력하세요"
                  value={newAttrKey}
                  required={!!newAttrKey}
                  onChange={handleNewAttrChange(setNewAttrKey)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                <Form.Control
                  name="newAttrValue"
                  type="text"
                  placeholder="새로 추가할 속성 값을 입력하세요"
                  value={newAttrValue}
                  required={!!newAttrValue}
                  onChange={handleNewAttrChange(setNewAttrValue)}
                  onKeyUp={addNewAttribute}
                />
              </Form.Group>
            </Col>
          </Row> */}
      </>
      {/* )} */}

      {/* 속성 테이블(선택한 속성) */}
      {selectedAttributes?.length > 0 && (
        <div className="mb-5 mt-5">
          <span className="fs-5 mb-2">속성 테이블</span>
          <table>
            <thead>
              <tr>
                <th>속성</th>
                <th>값</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {selectedAttributes?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                  <td>
                    <button onClick={() => deleteAttribute(item.key)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttrsForm;
