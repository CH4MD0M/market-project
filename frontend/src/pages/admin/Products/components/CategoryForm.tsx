import { useEffect, useState } from 'react';
import { CloseButton, Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setCategoryAttributes } from '@redux/modules/productSlice';
import { addNewCategoryThunk, deleteCategoryThunk } from '@redux/modules/categorySlice/thunk';
import { setSelectedCategory } from '@redux/modules/categorySlice';

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const productData = useAppSelector(state => state.product.productData);
  const isEditMode = useAppSelector(state => state.product.isEditMode);
  const categoriesDataList = useAppSelector(state => state.category.categoriesDataList);
  const selectedCategory = useAppSelector(state => state.category.selectedCategory);

  const [newCategoryInput, setNewCategoryInput] = useState<string>('');

  // Add new category
  const addNewCategoryHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget?.value) {
      dispatch(addNewCategoryThunk(newCategoryInput));
      dispatch(setSelectedCategory(newCategoryInput));
      setNewCategoryInput('');
    }
  };

  // Delete category
  const deleteCategoryHandler = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteCategoryThunk(selectedCategory));
    }
  };

  // Category onchange handler
  const categoryOnchangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  // When category is selected or added, set attributes of that category
  useEffect(() => {
    const selectedCategoryData = categoriesDataList.find(
      category => category.name === selectedCategory,
    );
    dispatch(setCategoryAttributes(selectedCategoryData?.attrs || []));
  }, [selectedCategory, dispatch, categoriesDataList]);

  return (
    <>
      {/* 카테고리 선택 */}
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>
          카테고리
          {!isEditMode && (
            <>
              <CloseButton onClick={deleteCategoryHandler} />(<small>선택 카테고리 삭제</small>)
            </>
          )}
        </Form.Label>
        <Form.Select
          id="cats"
          required
          name="category"
          aria-label="Default select example"
          disabled={isEditMode}
          value={selectedCategory}
          onChange={categoryOnchangeHandler}
        >
          <option value="">카테고리 선택</option>
          {categoriesDataList?.map((category, idx) => {
            return productData?.category === category.name ? (
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

      {/* 새 카테고리 추가 */}
      {!isEditMode && (
        <Form.Group className="mb-3" controlId="formBasicNewCategory">
          <Form.Label>새 카테고리 추가</Form.Label>
          <Form.Control
            onKeyUp={addNewCategoryHandler}
            onChange={e => setNewCategoryInput(e.currentTarget.value)}
            value={newCategoryInput}
            name="newCategory"
            type="text"
          />
        </Form.Group>
      )}
    </>
  );
};

export default CategoryForm;
