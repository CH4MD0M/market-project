import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import CategoryCard from '@components/common/CategoryCard';
import { resetFilter } from '@/redux/modules/filterSlice';
import CarouselComponent from './components/CarouselComponent';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  useEffect(() => {
    dispatch(resetFilter());
  }, []);

  return (
    <>
      <CarouselComponent />
      <Container style={{ marginTop: '100px' }}>
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
