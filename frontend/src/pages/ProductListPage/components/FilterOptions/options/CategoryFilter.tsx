import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setCategoriesFromFilter } from '@redux/modules/filterSlice';

const CategoryFilter = () => {
  const categoryRefs = useRef<HTMLInputElement[]>([]);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);
  const { categoriesFromFilter } = useAppSelector(state => state.filter);

  const categoryOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedCategory: string,
  ) => {
    dispatch(
      setCategoriesFromFilter({ ...categoriesFromFilter, [selectedCategory]: e.target.checked }),
    );

    let allCategories = categoryRefs.current.map((_, id) => {
      return { name: categories[id].name, idx: id };
    });

    let indexesOfMainCategory = allCategories.reduce((acc, item) => {
      if (item.name === selectedCategory) acc.push(item.idx);
      return acc;
    }, []);

    if (e.target.checked) {
      categoryRefs.current.forEach((el, idx) => {
        if (!indexesOfMainCategory.includes(idx)) {
          el.disabled = true;
        }
      });
    } else {
      categoryRefs.current.forEach((el, idx) => {
        if (!indexesOfMainCategory.includes(idx)) {
          el.disabled = false;
        }
      });
    }
  };

  return (
    <>
      <span className="fw-bold">카테고리</span>
      <Form>
        {categories.map((category, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input
                ref={(el: HTMLInputElement) => (categoryRefs.current[idx] = el)}
                type="checkbox"
                isValid
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

export default CategoryFilter;
