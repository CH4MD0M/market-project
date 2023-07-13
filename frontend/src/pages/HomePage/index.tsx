import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import { resetFilter } from '@redux/modules/filterSlice';
import CategoryCard from '@components/common/CategoryCard';
import CarouselComponent from './components/CarouselComponent';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.categories);
  const catLoading = useAppSelector(state => state.category.catLoading);

  useEffect(() => {
    dispatch(resetFilter());
  }, []);

  return (
    <>
      <CarouselComponent />
      <Container style={{ marginTop: '100px' }}>
        {catLoading && <div>로딩중</div>}
        <Row md={3}>
          {categories.map((category, idx) => (
            <CategoryCard key={idx} category={category} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
