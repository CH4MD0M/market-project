import React, { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setMaxPageNum, setPageNum } from '@/redux/modules/productSlice';
import { getAllProducts } from '@utils/api';

import ProductPreview from '../ProductPreview';

interface ProductListProps {
  categoryName: string;
  searchQuery: string;
  pageNumParam: string;
}

const ProductList = ({ categoryName, searchQuery, pageNumParam }: ProductListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sortOption = useAppSelector(state => state.filter.sortOption);
  const categoryFilter = useAppSelector(state => state.filter.categoryFilter, shallowEqual);
  const attrsFilter = useAppSelector(state => state.filter.attrsFilter);
  const priceFilter = useAppSelector(state => state.filter.priceFilter);
  const ratingFilter = useAppSelector(state => state.filter.ratingFilter);

  const [products, setProducts] = useState<Product[] | null>(null);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  // get products
  useEffect(() => {
    const filters = {
      category: categoryFilter,
      attrs: attrsFilter,
      price: priceFilter,
      rating: ratingFilter,
    };

    const fetchProducts = async () => {
      setIsProductsLoading(true);

      try {
        const res = await getAllProducts(
          categoryName,
          pageNumParam,
          searchQuery,
          filters,
          sortOption,
        );

        setProducts(res.products);
        dispatch(setPageNum(res.pageNum));
        dispatch(setMaxPageNum(res.maxPageNum));
      } catch (err) {
        console.log(err);
      } finally {
        setIsProductsLoading(false);
      }
    };

    fetchProducts();
  }, [pageNumParam, sortOption, categoryFilter, attrsFilter, priceFilter, ratingFilter]);

  // Redirect to the first page when the category name changes
  // or when the filters change
  useEffect(() => {
    const newPath = categoryName ? `/products/category/${categoryName}` : '/products';
    navigate(newPath);
  }, [categoryName, sortOption, categoryFilter, attrsFilter, priceFilter, ratingFilter]);

  return (
    <>
      {!isProductsLoading &&
        products?.map(product => <ProductPreview key={product._id} product={product} />)}
    </>
  );
};

export default ProductList;
