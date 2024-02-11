import { memo } from 'react';
import { Rating } from 'react-simple-star-rating';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setRatingFilter } from '@redux/modules/filterSlice';

const RatingFilter = () => {
  const dispatch = useAppDispatch();
  const rating = useAppSelector(state => state.filter.ratingFilter);

  const ratingOnChangeHandler = (rate: number) => {
    dispatch(setRatingFilter(rate));
  };

  return (
    <div className="flex my-3 pb-3 lg:block">
      <span className="flex-[0_0_100px] font-semibold mr-[20px]">별점</span>
      <div className="flex items-center gap-1">
        <Rating onClick={ratingOnChangeHandler} size={27} SVGstyle={{ display: 'inline' }} />
        <span>{rating}점 이상</span>
      </div>
    </div>
  );
};

export default memo(RatingFilter);
