import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { resetProductState } from '@redux/modules/productSlice';
import { resetCategoryState } from '@redux/modules/categorySlice';
import { createProduct, uploadProductImageToCloudinary } from '@utils/api';

// Components
import Button from '@components/atoms/Button';
import ImageForm from './ImageForm';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import CategoryForm from './CategoryForm';
import AttrsForm from './AttrsForm';

const CreateProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productFormInputs = useAppSelector(state => state.product.productFormInputs);
  const selectedCategory = useAppSelector(state => state.category.selectedCategory);
  const selectedAttributes = useAppSelector(state => state.product.selectedAttributes);
  const stagedImageFiles = useAppSelector(state => state.product.stagedImageFiles, shallowEqual);

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let uploadImageResponse;

    try {
      // Upload images If there are staged images
      if (stagedImageFiles.length > 0) {
        uploadImageResponse = await uploadProductImageToCloudinary(stagedImageFiles);
      }

      const requestBody = {
        ...productFormInputs,
        category: selectedCategory,
        attributesTable: selectedAttributes,
        images: uploadImageResponse,
      };

      const response = await createProduct(requestBody);

      if (response.status === 200) navigate('/admin/products');
    } catch (error: any) {
      console.log(error);
    }
  };

  // Reset attributes table
  useEffect(() => {
    return () => {
      dispatch(resetProductState());
      dispatch(resetCategoryState());
    };
  }, []);

  return (
    <form
      className="w-full bg-slate-50 p-3"
      onSubmit={handleSubmit}
      onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
    >
      {/* 상품명 */}
      <FormInput name="name" type="text" label="상품명" />

      {/* 상품 설명 */}
      <FormTextArea name="description" label="상품 설명" />

      {/* 재고 */}
      <FormInput name="count" type="number" label="재고" />

      {/* 가격 */}
      <FormInput name="price" type="text" label="가격" />

      {/* 카테고리 */}
      <CategoryForm />

      {/* 속성 */}
      <AttrsForm />

      {/* 이미지 */}
      <ImageForm />

      <Button
        variant="primary"
        hovercolor="default"
        size="full"
        type="submit"
        className="mt-[50px]"
      >
        상품 등록
      </Button>
    </form>
  );
};

export default CreateProductForm;
