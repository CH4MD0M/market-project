import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getProductsForAdmin, deleteProduct } from '@utils/api';

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
    <>
      <h1>
        상품 관리
        <Link to="/admin/create-new-product">
          <button>상품 추가</button>
        </Link>
      </h1>
      <table>
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
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <Link to={`/admin/edit-product/${item._id}`}>
                  <button className="btn-sm">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </Link>
                {' / '}
                <button className="btn-sm" onClick={() => deleteHandler(item._id)}>
                  <i className="bi bi-x-circle"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductsPage;
