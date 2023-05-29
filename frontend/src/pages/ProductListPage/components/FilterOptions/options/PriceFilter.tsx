import React from 'react';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setPriceFromFilter } from '@redux/modules/filterSlice';
import numberWithCommas from '@utils/numberWithCommas';

const PriceFilter = () => {
  const { priceFromFilter } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const priceOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = e.target.value;
    dispatch(setPriceFromFilter(price));
  };

  return (
    <>
      <Form.Label>
        <span className="fw-bold">{numberWithCommas(priceFromFilter)}원 이하:</span>
      </Form.Label>
      <Form.Range min={1000} max={5000000} step={1000} onChange={priceOnChangeHandler} />
    </>
  );
};

export default PriceFilter;
