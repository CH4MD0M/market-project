import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@hooks/reduxHooks';
import { setEditMode, setSelectedAttributes } from '@redux/modules/productSlice';
import { setProductData } from '@redux/modules/productSlice';
import { setSelectedCategory } from '@redux/modules/categorySlice';
import { getSingleProduct } from '@utils/api';

import ProductForm from '../Products/components/ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [getProductErrorMessage, setErrorMessage] = useState<string>('');

  // Get single product
  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await getSingleProduct(id!);
        const { attrs, category } = response.data;
        dispatch(setProductData(response.data));
        dispatch(setSelectedCategory(category));
        dispatch(setSelectedAttributes(attrs));
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    };
    getProductData();

    dispatch(setEditMode(true));
  }, [id, dispatch]);

  return <ProductForm productId={id} errorMessage={getProductErrorMessage} />;
};

export default memo(EditProduct);
