import React from 'react';
import { Container, Row } from 'react-bootstrap';

import ProductCarousel from '@components/common/Carousel';
import CategoryCard from '@components/common/CategoryCard';

const HomePage = () => {
  const categories = [
    'Tablets',
    'Monitors',
    'Games',
    'Printers',
    'Software',
    'Cameras',
    'Books',
    'Videos',
  ];
  return (
    <div>
      <ProductCarousel />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {categories.map((category, idx) => (
            <CategoryCard key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
