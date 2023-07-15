import { memo, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setAttrsFromCategory, setAttrsFilter } from '@redux/modules/filterSlice';
import { shallowEqual } from 'react-redux';

const AttributesFilter = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(state => state.category.categories);
  const attrsFromCategory = useAppSelector(state => state.filter.attrsFromCategory);
  const categoryFilter = useAppSelector(state => state.filter.categoryFilter, shallowEqual);
  const attrsFilter = useAppSelector(state => state.filter.attrsFilter);

  const attrOnchangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    attr: AttrsFromCategory,
    value: string,
  ) => {
    const modifiedAttrsFilter = () => {
      const existingFilterIndex = attrsFilter.findIndex(filter => filter.key === attr.key);

      // If the filter does not exist, add it
      if (existingFilterIndex === -1) {
        return [...attrsFilter, { key: attr.key, value: [value] }];
      }

      // Otherwise, modify the existing filter
      const updatedFilters = [...attrsFilter];
      const existingValues = new Set(updatedFilters[existingFilterIndex].value);

      if (e.target.checked) existingValues.add(value);
      else existingValues.delete(value);

      const updatedValues = Array.from(existingValues);
      if (updatedValues.length === 0) {
        updatedFilters[existingFilterIndex] = null;
      } else {
        updatedFilters[existingFilterIndex] = {
          ...updatedFilters[existingFilterIndex],
          value: updatedValues,
        };
      }
      return updatedFilters.filter(Boolean);
    };

    dispatch(setAttrsFilter(modifiedAttrsFilter()));
  };

  useEffect(() => {
    const applyCategoryFilters = (categoryFilters: any, categories: Category[]) => {
      if (Object.values(categoryFilters).every(item => !item)) {
        dispatch(setAttrsFromCategory([]));
        return;
      }

      for (const [category, checked] of Object.entries(categoryFilters)) {
        if (checked) {
          const matchedCategory = categories.find(item => item.name === category)?.attrs;

          dispatch(setAttrsFromCategory(matchedCategory));
        }
      }
    };

    applyCategoryFilters(categoryFilter, categories);
  }, [categoryFilter, categories]);

  return (
    <>
      {attrsFromCategory?.map((attr, idx) => (
        <div key={`cat-${idx}`}>
          <Form.Label>
            <b>{attr.key}</b>
          </Form.Label>
          {attr?.value.map((value, value_idx) => (
            <Form.Check
              className="mb-1"
              type="checkbox"
              key={value_idx}
              label={value}
              checked={attrsFilter?.some(
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

export default memo(AttributesFilter);
