import { shallowEqual } from 'react-redux';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { resetFilter, setCategoryFilter } from '@redux/modules/filterSlice';
import { memo } from 'react';

const CategoryFilter = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(state => state.category.categories);
  const categoryFilter = useAppSelector(state => state.filter.categoryFilter, shallowEqual);

  const categoryOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedCategory: string,
  ) => {
    dispatch(resetFilter());
    dispatch(setCategoryFilter({ [selectedCategory]: e.target.checked }));
  };

  return (
    <>
      <span className="fw-bold">카테고리</span>
      <Form>
        {categories.map((category, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input
                type="checkbox"
                isValid
                checked={categoryFilter[category.name] === true}
                disabled={Object.keys(categoryFilter).some(
                  cat => cat !== category.name && categoryFilter[cat],
                )}
                onChange={e => categoryOnChangeHandler(e, category.name)}
              />
              <Form.Check.Label style={{ cursor: 'pointer' }}>{category.name}</Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </>
  );
};

export default memo(CategoryFilter);
