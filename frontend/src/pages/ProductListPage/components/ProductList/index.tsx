import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { getAllProducts } from '@utils/api';

import ProductPreview from '../ProductPreview';
import { setMaxPageNum, setPageNum } from '@/redux/modules/productSlice';

interface ProductListProps {
  categoryName: string;
  searchQuery: string;
  pageNumParam: string;
}

const ProductList = ({ categoryName, searchQuery, pageNumParam }: ProductListProps) => {
  const dispatch = useAppDispatch();
  const { filters, sortOption } = useAppSelector(state => state.filter);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts(categoryName, pageNumParam, searchQuery, filters, sortOption)
      .then(res => {
        setProducts(res.products);
        dispatch(setPageNum(res.pageNum));
        dispatch(setMaxPageNum(res.maxPageNum));
      })
      .catch(err => console.log(err));
  }, [categoryName, pageNumParam, searchQuery, filters, sortOption]);

  return (
    <>
      {products.map(product => (
        <ProductPreview
          key={product._id}
          images={product.images}
          name={product.name}
          description={product.description}
          price={product.price}
          rating={product.rating}
          reviewsNumber={product.reviewsNumber}
          productId={product._id}
        />
      ))}
    </>
  );
};

export default ProductList;
