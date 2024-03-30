import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setCategoryAttributes } from '@redux/modules/productSlice';
import { addNewCategoryThunk, deleteCategoryThunk } from '@redux/modules/categorySlice/thunk';
import { setSelectedCategory } from '@redux/modules/categorySlice';

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const productData = useAppSelector(state => state.product.productData);
  const isEditMode = useAppSelector(state => state.product.isEditMode);
  const categoryDataList = useAppSelector(state => state.category.categoryDataList);
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
    const selectedCategoryData = categoryDataList.find(
      category => category.name === selectedCategory,
    );
    dispatch(setCategoryAttributes(selectedCategoryData?.attrs || []));
  }, [selectedCategory, dispatch, categoryDataList]);

  return (
    <div className="mt-[30px] p-3 border border-gray-300 rounded-md">
      <span className="block min-w-[120px] font-semibold text-[20px]">카테고리</span>
      <div className="flex items-center">
        <select
          id="cats"
          disabled={isEditMode}
          value={selectedCategory}
          onChange={categoryOnchangeHandler}
          className="h-8 w-[300px] border border-gray-300 rounded-md px-2 mr-[15px]"
        >
          <option value="">카테고리 선택</option>
          {categoryDataList?.map((category, idx) => {
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
        </select>
        {!isEditMode && (
          <div className="flex items-center group cursor-pointer">
            <XMarkIcon
              className="w-5 h-5 duration-150 group-hover:text-[red]"
              onClick={deleteCategoryHandler}
            />
            <span className="duration-150 group-hover:text-[red]">(선택 카테고리 삭제)</span>
          </div>
        )}
      </div>

      {/* 새 카테고리 추가 */}
      {!isEditMode && (
        <div className="mt-[20px]">
          <span className="block min-w-[160px] font-semibold text-[18px]">새 카테고리 추가</span>
          <input
            className="px-2 border border-gray-300 rounded-md h-8 w-[300px]"
            onKeyUp={addNewCategoryHandler}
            onChange={e => setNewCategoryInput(e.currentTarget.value)}
            value={newCategoryInput}
            name="newCategory"
            type="text"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
