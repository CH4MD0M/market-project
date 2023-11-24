import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import { useAppSelector } from '@hooks/reduxHooks';
import { getAllProducts } from '@utils/api';

import ProductPreview from '../ProductPreview';

interface ProductListProps {
  categoryName: string;
  searchQuery: string;
  pageNumParam: string;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const ProductList = ({
  categoryName,
  searchQuery,
  pageNumParam,
  setCurrentPageNumber,
  setTotalPages,
}: ProductListProps) => {
  const navigate = useNavigate();

  const sortOption = useAppSelector(state => state.filter.sortOption);
  const priceFilter = useAppSelector(state => state.filter.priceFilter);
  const categoryFilter = useAppSelector(state => state.filter.categoryFilter, shallowEqual);
  const ratingFilter = useAppSelector(state => state.filter.ratingFilter, shallowEqual);
  const attrsFilter = useAppSelector(state => state.filter.attrsFilter, isEqual);

  const [products, setProducts] = useState<Product[] | null>(null);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  // get products
  useEffect(() => {
    const abortController = new AbortController();
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
        setCurrentPageNumber(res.pageNum);
        setTotalPages(res.maxPageNum);
      } catch (err) {
        console.log("Couldn't fetch products", err);
      } finally {
        setIsProductsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      abortController.abort();
    };
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
