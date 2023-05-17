import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  setAttributesFromDb,
  setAttributesTable,
  setCategoryChoosen,
} from '@/redux/modules/productSlice';

interface EditCategoryProps {
  product: any;
}

const EditCategory = ({ product }: EditCategoryProps) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  useEffect(() => {
    let categoryOfEditedProduct = categories?.find(item => item.name === product.category);

    if (categoryOfEditedProduct) {
      const mainCategoryOfEditedProduct = categoryOfEditedProduct.name.split('/')[0];
      const mainCategoryOfEditedProductAllData = categories.find(
        categoryOfEditedProduct => categoryOfEditedProduct.name === mainCategoryOfEditedProduct,
      );

      if (mainCategoryOfEditedProductAllData?.attrs.length > 0) {
        dispatch(setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs));
      }
    }

    dispatch(setCategoryChoosen(product.category));
    dispatch(setAttributesTable(product.attrs));
  }, [categories, dispatch, product]);

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const highLevelCategory = e.target.value.split('/')[0];
    const highLevelCategoryAllData = categories.find(cat => cat.name === highLevelCategory);
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
      dispatch(setAttributesFromDb(highLevelCategoryAllData.attrs));
    } else {
      dispatch(setAttributesFromDb([]));
    }
    dispatch(setCategoryChoosen(e.target.value));
  };

  return (
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
