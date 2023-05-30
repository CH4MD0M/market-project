import React, { Fragment } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setRatingsFromFilter } from '@/redux/modules/filterSlice';

const RatingFilter = () => {
  const dispatch = useAppDispatch();
  const { ratingsFromFilter } = useAppSelector(state => state.filter);

  const ratingOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    dispatch(setRatingsFromFilter({ ...ratingsFromFilter, [5 - idx]: e.target.checked }));
  };

  return (
    <>
      <span className="fw-bold">별점</span>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Fragment key={idx}>
          <Form.Check type="checkbox" id={`check-api-${idx}`}>
            <Form.Check.Input
              type="checkbox"
              isValid
              onChange={e => ratingOnChangeHandler(e, idx)}
            />
            <Form.Check.Label style={{ cursor: 'pointer' }}>
              <Rating readonly size={20} initialValue={5 - idx} />
            </Form.Check.Label>
          </Form.Check>
        </Fragment>
      ))}
    </>
  );
};

export default RatingFilter;
