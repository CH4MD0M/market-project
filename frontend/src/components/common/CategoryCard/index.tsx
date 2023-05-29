import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface CategoryCardProps {
  category: Category;
  idx: number;
}

const CategoryCard = ({ category, idx }: CategoryCardProps) => {
  const { image, name } = category;
  return (
    <Card>
      <Card.Img crossOrigin="anonymous" variant="top" src={image} style={{ maxWidth: '120px' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <LinkContainer to={`/products/category/${name}`}>
          <Button variant="primary">카테고리로 이동</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
