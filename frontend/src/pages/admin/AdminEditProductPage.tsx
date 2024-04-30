import { memo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { getSingleProductThunk } from '@redux/modules/productSlice/thunk';
import { setEditMode } from '@redux/modules/productSlice';

// Components
import EditProductForm from '@components/pageComponents/AdminPage/EditProductForm';
import Heading from '@components/atoms/Heading';
import Button from '@components/atoms/Button';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const productFetchErrorMessage = useAppSelector(state => state.product.errorMessage);

  // Get single product
  useEffect(() => {
    dispatch(getSingleProductThunk(id!));
    dispatch(setEditMode(true));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading size="lg" className="my-[40px]">
          상품 수정
        </Heading>
        <Link to="/admin/products" className="my-3">
          <Button variant="primary" className="mb-2">
            뒤로가기
          </Button>
        </Link>
      </div>
      {productFetchErrorMessage && <p className="text-danger mt-3">{productFetchErrorMessage}</p>}
      <EditProductForm productId={id!} />
    </div>
  );
};

export default memo(EditProduct);
