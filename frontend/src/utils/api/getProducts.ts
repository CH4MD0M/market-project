import { instance } from './instance';
import { API_URL } from '@utils/constants';
import proceedFilters from '@utils/proceedFilters';

const getAllProducts = async (
  categoryName = '',
  pageNumParam: string | null = null,
  filters: Filters,
  sortOption = '',
) => {
  const filtersUrl = proceedFilters(filters);

  const category = categoryName ? `category/${categoryName}/` : '';
  const url = `/api/products/${category}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}`;
  const { data } = await instance.get(url);
  return data;
};

const getSingleProduct = async (productId: string) => {
  const response = await instance.get(API_URL.PRODUCT.GET_SINGLE_PRODUCT(productId));
  return response;
};

export { getAllProducts, getSingleProduct };
