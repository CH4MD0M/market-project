import { memo, useCallback, useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setPriceFilter } from '@redux/modules/filterSlice';

const PriceFilter = () => {
  const dispatch = useAppDispatch();
  const priceFilter = useAppSelector(state => state.filter.priceFilter, shallowEqual);

  const [minPrice, setMinPrice] = useState<number>(priceFilter.minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(priceFilter.maxPrice);

  // debounce setPriceFilter
  const debouncedSetPriceFilter = useCallback(
    debounce((minPrice, maxPrice) => dispatch(setPriceFilter({ minPrice, maxPrice })), 600),
    [],
  );

  useEffect(() => {
    debouncedSetPriceFilter(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  // price filter input change handler
  const priceOnChangeHandler = useCallback(
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (type === 'minPrice') setMinPrice(Number(value));
      else if (type === 'maxPrice') setMaxPrice(Number(value));
    },
    [],
  );

  // set minPrice and maxPrice when priceFilter changes
  useEffect(() => {
    setMinPrice(priceFilter.minPrice);
    setMaxPrice(priceFilter.maxPrice);
  }, [priceFilter.minPrice, priceFilter.maxPrice]);

  return (
    <div className="flex my-3 pb-3 lg:block">
      <span className="flex-[0_0_100px] font-semibold mr-[20px]">가격필터</span>
      <div className="flex items-center gap-1 lg:flex-col">
        <div className="flex">
          <input
            type="text"
            value={minPrice}
            placeholder="0"
            onChange={priceOnChangeHandler('minPrice')}
            className="w-full"
          />
          <span>원</span>
        </div>
        <span className="lg:self-start lg:ml-3">~</span>
        <div className="flex">
          <input
            type="text"
            value={maxPrice}
            placeholder="0"
            onChange={priceOnChangeHandler('maxPrice')}
            className="w-full"
          />
          <span>원</span>
        </div>
      </div>
    </div>
  );
};

export default memo(PriceFilter);
