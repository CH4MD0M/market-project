import { Fragment, memo, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setRatingFilter } from '@redux/modules/filterSlice';

const RatingFilter = () => {
  const dispatch = useAppDispatch();
  const rating = useAppSelector(state => state.filter.ratingFilter, shallowEqual);

  const ratingOnChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
      dispatch(setRatingFilter({ ...rating, [5 - idx]: e.target.checked }));
    },
    [dispatch, rating],
  );

  return (
    <>
      <span className="fw-bold">별점</span>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Fragment key={`rat-${idx}`}>
          <Form.Check type="checkbox" id={`check-api-${idx}`}>
            <Form.Check.Input
              type="checkbox"
              isValid
              checked={rating[5 - idx] || false} // set the checked status based on the rating at the specific index
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

export default memo(RatingFilter);
