import { memo } from 'react';
import { Form } from 'react-bootstrap';

import { useAppDispatch } from '@hooks/reduxHooks';
import { setSortOption } from '@redux/modules/filterSlice';

const SortOptions = () => {
  const dispatch = useAppDispatch();

  const sortOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value));
  };

  return (
    <Form.Select aria-label="Default select example" onChange={sortOnChangeHandler}>
      <option>정렬</option>
      <option value="price_1">낮은 가격순</option>
      <option value="price_-1">높은 가격순</option>
      <option value="rating_-1">판매점순</option>
      <option value="name_1">상품명: 오름차순</option>
      <option value="name_-1">상품명: 내림차순</option>
    </Form.Select>
  );
};

export default memo(SortOptions);
