import { CloseButton, Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setAttributesFromDb } from '@redux/modules/productSlice';
import { setSelectedCategory } from '@redux/modules/categorySlice';
import { addNewCategoryThunk, deleteCategoryThunk } from '@redux/modules/categorySlice/thunk';

const CreateCatgegory = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(state => state.category.categories);
  const selectedCategory = useAppSelector(state => state.category.selectedCategory);

  // Category Handler
  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const choosenCategory = e.target.value;
    const categoryData = categories.find(cat => cat.name === choosenCategory);

    dispatch(setAttributesFromDb(categoryData.attrs || []));
    dispatch(setSelectedCategory(choosenCategory));
  };

  const newCategoryHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget?.value) {
      const newCategory = e.currentTarget.value;
      dispatch(addNewCategoryThunk(newCategory));
      dispatch(setSelectedCategory(newCategory));
      e.currentTarget.value = '';
    }
  };

  const deleteCategoryHandler = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteCategoryThunk(selectedCategory));
    }
  };

  return (
    <>
      {/* 카테고리 선택 */}
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>
          카테고리
          <CloseButton onClick={deleteCategoryHandler} />(<small>선택 지우기</small>)
        </Form.Label>
        <Form.Select
          id="cats"
          required
          name="category"
          aria-label="Default select example"
          value={selectedCategory}
          onChange={changeCategory}
        >
          <option value="">카테고리 선택</option>
          {categories?.map((category, idx) => (
            <option key={idx} value={category.name}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* 새 카테고리 추가 */}
      <Form.Group className="mb-3" controlId="formBasicNewCategory">
        <Form.Label>새 카테고리 추가</Form.Label>
        <Form.Control onKeyUp={newCategoryHandler} name="newCategory" type="text" />
      </Form.Group>
    </>
  );
};

export default CreateCatgegory;
