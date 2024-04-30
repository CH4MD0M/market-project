import { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
    <div className="mt-[30px] p-3 border border-gray-300 rounded-md">
      <>
        {/* 속성 선택 */}
        <div>
          <span className="block min-w-[120px] font-semibold text-[20px]">속성 선택</span>
          <select
            className="h-8 w-[300px] border border-gray-300 rounded-md px-2 mr-[15px]"
            name="attrKey"
            value={selectedAttrKey}
            onChange={handleAttrKeyChange}
          >
            <option>속성 선택</option>
            {categoryAttributes.map((item, idx) => (
              <Fragment key={idx}>
                <option value={item.key}>{item.key}</option>
              </Fragment>
            ))}
          </select>

          <select
            className="h-8 w-[300px] border border-gray-300 rounded-md px-2 mr-[15px]"
            name="attrVal"
            value={selectedAttrVal}
            onChange={handleAttrValSelected}
          >
            <option>속성 값 선택</option>
            {valuesForSelectedAttrKey.map((item: any, idx: number) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* 새 속성 추가 */}
        <div className="mt-[20px]">
          <span className="block min-w-[120px] font-semibold text-[20px]">속성 추가</span>
          <div className="flex items-center">
            <input
              className="min-w-[160px] px-2 border border-gray-300 rounded-md h-8 w-[300px] mr-2"
              name="newAttrKey"
              type="text"
              disabled={!selectedCategory}
              placeholder="새로 추가할 속성을 입력하세요"
              value={newAttrKey}
              required={!!newAttrKey}
              onChange={handleNewAttrChange(setNewAttrKey)}
            />

            <input
              className="min-w-[160px] px-2 border border-gray-300 rounded-md h-8 w-[300px]"
              name="newAttrValue"
              type="text"
              disabled={!selectedCategory}
              placeholder="새로 추가할 속성 값을 입력하세요"
              value={newAttrValue}
              required={!!newAttrValue}
              onChange={handleNewAttrChange(setNewAttrValue)}
              onKeyUp={addNewAttribute}
            />
          </div>
        </div>
      </>

      {/* 속성 테이블(선택한 속성) */}
      {selectedAttributes?.length > 0 && (
        <div className="mt-[20px]">
          <span className="block min-w-[160px] font-semibold text-[18px]">속성 테이블</span>
          <table className="w-full border-t-2 border-t-[#969696] border-solid border-collapse">
            <thead>
              <tr>
                <th>속성</th>
                <th>값</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {selectedAttributes?.map((item, idx) => (
                <tr
                  key={idx}
                  className="[&_td]:md:px-[30px] [&_td]:py-3.5 [&_td]:text-center border-b-[1px] border-b-[#969696] border-solid"
                >
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                  <td>
                    <button onClick={() => deleteAttribute(item.key)}>
                      <XMarkIcon className="w-6 h-6 text-red-500" />
                    </button>
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
