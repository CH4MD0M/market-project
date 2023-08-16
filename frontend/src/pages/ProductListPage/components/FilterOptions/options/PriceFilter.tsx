import { memo, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setPriceFilter } from '@redux/modules/filterSlice';
import numberWithCommas from '@utils/numberWithCommas';

const PriceFilter = () => {
  const priceFilter = useAppSelector(state => state.filter.priceFilter);
  const dispatch = useAppDispatch();

  const debouncedSetPriceFilter = useCallback(
    debounce(price => dispatch(setPriceFilter(price)), 600),
    [dispatch],
  );

  const priceOnChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const price = e.target.value;
      debouncedSetPriceFilter(price);
    },
    [debouncedSetPriceFilter],
  );

  return (
    <>
      <Form.Label>
        <span className="fw-bold">{numberWithCommas(priceFilter)}원 이하:</span>
      </Form.Label>
      <Form.Range min={10000} max={5000000} step={10000} onChange={priceOnChangeHandler} />
    </>
  );
};

export default memo(PriceFilter);
