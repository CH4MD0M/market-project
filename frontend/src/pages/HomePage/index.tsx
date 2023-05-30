import React from 'react';
import { Container, Row } from 'react-bootstrap';

import { useAppSelector } from '@hooks/reduxHooks';

import CategoryCard from '@components/common/CategoryCard';

const HomePage = () => {
  const { categories } = useAppSelector(state => state.category);
  return (
    <div>
      <Container className="mt-5">
        <Row md={3}>
          {categories.map((category, idx) => (
            <CategoryCard key={idx} category={category} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
