import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { getProductsForAdmin, deleteProduct } from '@utils/api';

import Heading from '@components/atoms/Heading';
import Button from '@components/atoms/Button';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDeleted, setProductDeleted] = useState(false);

  const deleteHandler = async (productId: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await deleteProduct(productId);

        if (response.status === 200) {
          setProductDeleted(prevState => !prevState);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchProducts = async () => {
      const { data } = await getProductsForAdmin(abortController.signal);
      setProducts(data);
    };
    fetchProducts();

    return () => abortController.abort();
  }, [productDeleted]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading size="lg" className="my-[40px]">
          상품 관리
        </Heading>
        <Link to="/admin/create-new-product">
          <Button variant="primary" className="mb-2">
            상품 추가
          </Button>
        </Link>
      </div>
      <table className="w-full border-t-2 border-t-[#969696] border-solid border-collapse">
        <thead>
          <tr>
            <th>상품 번호</th>
            <th>상품명</th>
            <th>가격</th>
            <th>카테고리</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, idx) => (
            <tr
              key={idx}
              className="[&_td]:py-3.5 [&_td]:text-center border-b-[1px] border-b-[#969696] border-solid"
            >
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <Link to={`/admin/edit-product/${item._id}`}>
                  <button>
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                </Link>
                {' / '}
                <button onClick={() => deleteHandler(item._id)}>
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
