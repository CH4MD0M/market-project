import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { useAppSelector } from '@hooks/reduxHooks';
import { getAllProducts } from '@utils/api';

import LoadingPage from '@pages/LoadingPage';
import ProductItemPreview from '@components/pageComponents/ProductListPage/ProductItemPreview';

interface ProductListProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setMaxPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductList = ({ setCurrentPage, setMaxPage }: ProductListProps) => {
  const { pageNumParam, categoryName } = useParams();
  const navigate = useNavigate();

  const categoryFilter = useAppSelector(state => state.filter.categoryFilter, shallowEqual);
  const sortOption = useAppSelector(state => state.filter.sortOption);
  const priceFilter = useAppSelector(state => state.filter.priceFilter, shallowEqual);
  const ratingFilter = useAppSelector(state => state.filter.ratingFilter, shallowEqual);
  const attrsFilter = useAppSelector(state => state.filter.attrsFilter, isEqual);

  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  // get products
  useEffect(() => {
    const abortController = new AbortController();

    const fetchProducts = async () => {
      setIsProductsLoading(true);

      try {
        const filters = {
          category: categoryFilter,
          attrs: attrsFilter,
          price: priceFilter,
          rating: ratingFilter,
        };
        const res = await getAllProducts(categoryFilter, pageNumParam, filters, sortOption);

        setProducts(res.products);
        setCurrentPage(res.pageNum);
        setMaxPage(res.maxPageNum);
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

  const prevFiltersRef = useRef({
    categoryFilter,
    sortOption,
    attrsFilter,
    priceFilter,
    ratingFilter,
  });

  // update url when  ONLY filters change
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const filtersChanged =
      prevFilters.categoryFilter !== categoryFilter ||
      prevFilters.sortOption !== sortOption ||
      prevFilters.attrsFilter !== attrsFilter ||
      prevFilters.priceFilter !== priceFilter ||
      prevFilters.ratingFilter !== ratingFilter;

    if (filtersChanged) {
      const newPath = categoryName ? `/products/category/${categoryName}` : '/products';
      navigate(newPath, { replace: true });
    }

    prevFiltersRef.current = { categoryFilter, sortOption, attrsFilter, priceFilter, ratingFilter };
  }, [categoryFilter, sortOption, attrsFilter, priceFilter, ratingFilter]);

  if (isProductsLoading) return <LoadingPage />;

  return (
    <div>
      {products.length ? (
        products.map(product => <ProductItemPreview key={product._id} product={product} />)
      ) : (
        <h1 className="text-[30px] text-center my-[100px]">해당하는 상품이 없습니다 🥲</h1>
      )}
    </div>
  );
};

export default ProductList;
