import SortOptionMenu from './SortOptionMenu';
import FilterNav from './FilterNav';

const ProductListHeader = () => {
  return (
    <div className="mx-7 lg:mx-0">
      <FilterNav />
      <SortOptionMenu />
    </div>
  );
};

export default ProductListHeader;
