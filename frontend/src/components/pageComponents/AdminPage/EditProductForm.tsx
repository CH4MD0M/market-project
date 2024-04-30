import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { resetProductState } from '@redux/modules/productSlice';
import { resetCategoryState } from '@redux/modules/categorySlice';
import { deleteProductImage, updateProduct, uploadProductImageToCloudinary } from '@utils/api';

// Components
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import CategoryForm from './CategoryForm';
import AttrsForm from './AttrsForm';
import ImageForm from './ImageForm';

interface EditProductFormProps {
  productId: string;
}

const EditProductForm = ({ productId }: EditProductFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productData = useAppSelector(state => state.product.productData);

  const productFormInputs = useAppSelector(state => state.product.productFormInputs);
  const selectedCategory = useAppSelector(state => state.category.selectedCategory);
  const selectedAttributes = useAppSelector(state => state.product.selectedAttributes);
  const stagedImageFiles = useAppSelector(state => state.product.stagedImageFiles, shallowEqual);
  const imageFilesToDelete = useAppSelector(state => state.product.imageFilesToDelete);

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent updating product if category is changed by user forcefully
    if (selectedCategory !== productData?.category) return;

    let uploadImageResponse;

    if (e.currentTarget.checkValidity()) {
      try {
        // Upload images If there are staged images
        if (stagedImageFiles.length > 0) {
          uploadImageResponse = await uploadProductImageToCloudinary(stagedImageFiles);
        }

        // Delete images If there are images to delete
        if (imageFilesToDelete.length > 0) {
          await Promise.all(
            imageFilesToDelete.map(image =>
              deleteProductImage(image.path, productId!, image.publicId),
            ),
          );
        }

        const requestBody = {
          ...productFormInputs,
          category: selectedCategory,
          attributesTable: selectedAttributes,
          images: uploadImageResponse,
        };

        const response = await updateProduct(productId!, requestBody);

        if (response.status === 200) navigate('/admin/products');
      } catch (error) {
        console.log(error);
      }
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
      <FormInput name="name" type="text" label="상품명" defaultValue={productData?.name || ''} />

      {/* 상품 설명 */}
      <FormTextArea
        name="description"
        label="상품 설명"
        defaultValue={productData?.description || ''}
      />

      {/* 재고 */}
      <FormInput name="count" type="number" label="재고" defaultValue={productData?.count || ''} />

      {/* 가격 */}
      <FormInput name="price" type="text" label="가격" defaultValue={productData?.price || ''} />

      {/* 카테고리 */}
      <CategoryForm />

      {/* 속성 */}
      <AttrsForm />

      {/* 이미지 */}
      <ImageForm />

      <button type="submit">상품 업데이트</button>
    </form>
  );
};

export default EditProductForm;
