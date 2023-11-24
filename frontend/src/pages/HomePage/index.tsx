import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import { resetFilter } from '@redux/modules/filterSlice';
import CategoryCard from '@components/common/CategoryCard';
import CarouselComponent from './components/CarouselComponent';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const categoriesDataList = useAppSelector(state => state.category.categoriesDataList);
  const categoryLoading = useAppSelector(state => state.category.categoryLoading);

  useEffect(() => {
    dispatch(resetFilter());
  }, []);

  return (
    <>
      <CarouselComponent />
      <Container style={{ marginTop: '100px' }}>
        {categoryLoading && <div>로딩중</div>}
        <Row md={3}>
          {categoriesDataList.map((category, idx) => (
            <CategoryCard key={idx} category={category} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
