import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useAppDispatch } from '@hooks/reduxHooks';
import { resetProductState } from '@redux/modules/productSlice';
import { resetCategoryState } from '@redux/modules/categorySlice';
import { getProductsForAdmin, deleteProduct } from '@utils/api';

import AdminLayout from '@layout/AdminLayout';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
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

  // reset attributes table
  useEffect(() => {
    dispatch(resetProductState());
    dispatch(resetCategoryState());
  }, []);

  return (
    <AdminLayout>
      <h1>
        상품 관리
        <LinkContainer to="/admin/create-new-product">
          <Button variant="primary" size="lg">
            상품 추가
          </Button>
        </LinkContainer>
      </h1>
      <Table striped bordered hover responsive>
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
                <LinkContainer to={`/admin/edit-product/${item._id}`}>
                  <Button className="btn-sm">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </LinkContainer>
                {' / '}
                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(item._id)}>
                  <i className="bi bi-x-circle"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default ProductsPage;
