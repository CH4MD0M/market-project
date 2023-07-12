import React, { useEffect } from 'react';

import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setAttributesFromDb, setAttributesTable } from '@redux/modules/productSlice';
import { setSelectedCategory } from '@redux/modules/categorySlice';

interface EditCategoryProps {
  product: any;
}

const EditCategory = ({ product }: EditCategoryProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.categories);
  const selectedCategory = useAppSelector(state => state.category.selectedCategory);

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const choosenCategory = e.target.value;
    const categoryData = categories.find(cat => cat.name === choosenCategory);

    dispatch(setAttributesFromDb(categoryData?.attrs || []));
    dispatch(setSelectedCategory(choosenCategory));
  };

  useEffect(() => {
    let categoryOfEditedProduct = categories?.find(item => item.name === product.category);

    if (categoryOfEditedProduct?.attrs.length) {
      dispatch(setAttributesFromDb(categoryOfEditedProduct.attrs));
    }

    dispatch(setSelectedCategory(product.category));
    dispatch(setAttributesTable(product.attrs));
  }, [product]);

  return (
    <Form.Group className="mb-3" controlId="formBasicCategory">
      <Form.Label>카테고리</Form.Label>
      <Form.Select
        id="cats"
        required
        name="category"
        aria-label="Default select example"
        value={selectedCategory}
        onChange={changeCategory}
      >
        <option value="Choose category">카테고리 선택</option>
        {categories?.map((category, idx) => {
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
  );
};

export default EditCategory;
