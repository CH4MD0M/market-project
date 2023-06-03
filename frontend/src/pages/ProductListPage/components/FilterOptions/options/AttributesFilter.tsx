import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setAttrsFilter, setAttrsFromFilter } from '@redux/modules/filterSlice';

const AttributesFilter = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);
  const { attrsFilter, attrsFromFilter, categoriesFromFilter } = useAppSelector(
    state => state.filter,
  );

  const attrOnchangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedAttr: AttrsFilter,
    valueForSelectedAttr: string,
  ) => {
    const newAttrsFilter = modifiedAttrsFilter(
      e,
      selectedAttr,
      valueForSelectedAttr,
      attrsFromFilter,
    );
    dispatch(setAttrsFromFilter(newAttrsFilter));
  };

  const modifiedAttrsFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedAttr: AttrsFilter,
    valueForSelectedAttr: string,
    attrsFromFilter: AttrsFilter[],
  ) => {
    const filterIndex = attrsFromFilter.findIndex(item => item.key === selectedAttr.key);

    if (filterIndex === -1) {
      return [...attrsFromFilter, { key: selectedAttr.key, value: [valueForSelectedAttr] }];
    }

    const updatedFilters = [...attrsFromFilter];
    const filterValues = new Set(updatedFilters[filterIndex].value);

    if (e.target.checked) filterValues.add(valueForSelectedAttr);
    else filterValues.delete(valueForSelectedAttr);

    const updatedValues = Array.from(filterValues);

    updatedFilters[filterIndex] =
      updatedValues.length > 0 ? { ...updatedFilters[filterIndex], value: updatedValues } : null;

    return updatedFilters.filter(Boolean);
  };

  useEffect(() => {
    dispatch(setAttrsFilter([]));
    Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
      if (checked) {
        const UpdatedAttrs = categories.find(item => item.name === category).attrs;
        dispatch(setAttrsFilter(UpdatedAttrs));
      }
    });
  }, [categoriesFromFilter, categories]);

  return (
    <>
      {attrsFilter?.map((attr, idx) => (
        <div key={idx}>
          <Form.Label>
            <b>{attr.key}</b>
          </Form.Label>
          {attr?.value.map((value, value_idx) => (
            <Form.Check
              className="mb-1"
              type="checkbox"
              key={value_idx}
              label={value}
              checked={attrsFromFilter.some(
                item => item.key === attr.key && item.value.includes(value),
              )}
              onChange={e => attrOnchangeHandler(e, attr, value)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default AttributesFilter;
