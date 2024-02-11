import { useCallback, useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { resetProductState, setProductFormInput } from '@redux/modules/productSlice';
import { resetCategoryState } from '@redux/modules/categorySlice';
import {
  createProduct,
  deleteProductImage,
  updateProduct,
  uploadProductImageToCloudinary,
} from '@utils/api';

// Components
import ImageForm from './ImageForm';
import FormInput from './FormInput';
import CategoryForm from './CategoryForm';
import AttrsForm from './AttrsForm';

interface ProductFormProps {
  productId?: string;
  errorMessage?: string;
}

const ProductForm = ({ productId, errorMessage }: ProductFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productData = useAppSelector(state => state.product.productData);
  const isEditMode = useAppSelector(state => state.product.isEditMode);
  const productFormInputs = useAppSelector(state => state.product.productFormInputs);
  const selectedCategory = useAppSelector(state => state.category.selectedCategory);
  const selectedAttributes = useAppSelector(state => state.product.selectedAttributes);
  const stagedImageFiles = useAppSelector(state => state.product.stagedImageFiles, shallowEqual);
  const imageFilesToDelete = useAppSelector(state => state.product.imageFilesToDelete);

  const [validated, setValidated] = useState<boolean>(false);

  // Handle input onChange
  const handleInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name as keyof ProductFormInputType;
      const value = e.target.value;
      dispatch(setProductFormInput({ field: name, value }));
    }, 200),
    [dispatch],
  );

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent updating product if category is changed by user forcefully
    if (isEditMode && selectedCategory !== productData?.category) return;

    setValidated(true);

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

        const response = isEditMode
          ? await updateProduct(productId!, requestBody)
          : await createProduct(requestBody);

        if (response.status === 200) navigate('/admin/products');
      } catch (error: any) {
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
    <div className="container">
      <div className="justify-content-md-center mt-5">
        <div>
          <Link to="/admin/products" className="btn btn-info my-3">
            뒤로가기
          </Link>
        </div>
        <div>
          <h1>상품 수정</h1>
          <form
            noValidate
            // validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
          >
            {/* 상품명 */}
            <FormInput
              name="name"
              type="text"
              controlId="formBasicName"
              label="상품명"
              defaultValue={productData?.name || ''}
              handleInputChange={handleInputChange}
            />

            {/* 상품 설명 */}
            <FormInput
              name="description"
              type="text"
              controlId="exampleForm.ControlTextarea1"
              as="textarea"
              label="상품 설명"
              defaultValue={productData?.description || ''}
              handleInputChange={handleInputChange}
            />

            {/* 재고 */}
            <FormInput
              name="count"
              type="number"
              controlId="formBasicCount"
              label="재고"
              defaultValue={productData?.count || ''}
              handleInputChange={handleInputChange}
            />

            {/* 가격 */}
            <FormInput
              name="price"
              type="text"
              controlId="formBasicPrice"
              label="가격"
              defaultValue={productData?.price || ''}
              handleInputChange={handleInputChange}
            />

            {/* 카테고리 */}
            <CategoryForm />

            {/* 속성 */}
            <AttrsForm />

            {/* 이미지 */}
            <ImageForm />

            <button type="submit">{isEditMode ? '상품 업데이트' : '상품 등록'}</button>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
