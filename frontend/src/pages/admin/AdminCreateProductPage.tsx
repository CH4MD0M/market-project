import { Link } from 'react-router-dom';

import { useFetchCategoryInfo } from '@hooks/useFetchCategoryInfo';

import Heading from '@components/atoms/Heading';
import Button from '@components/atoms/Button';
import CreateProductForm from '@components/pageComponents/AdminPage/CreateProductForm';

const CreateProduct = () => {
  useFetchCategoryInfo();
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading size="lg" className="my-[40px]">
          상품 등록
        </Heading>
        <Link to="/admin/products" className="my-3">
          <Button variant="primary" className="mb-2">
            뒤로가기
          </Button>
        </Link>
      </div>
      <CreateProductForm />
    </div>
  );
};

export default CreateProduct;
