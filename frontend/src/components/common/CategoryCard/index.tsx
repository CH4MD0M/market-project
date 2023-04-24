import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface CategoryCardProps {
  category: string;
  idx: number;
}

const CategoryCard = ({ category, idx }: CategoryCardProps) => {
  const images = [
    '/images/tablets-category.png',
    '/images/monitors-category.png',
    '/images/games-category.png',
    '/images/tablets-category.png',
    '/images/tablets-category.png',
    '/images/tablets-category.png',
    '/images/tablets-category.png',
    '/images/tablets-category.png',
  ];

  return (
    <Card>
      <Card.Img crossOrigin="anonymous" variant="top" src={images[idx]} />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </Card.Text>
        <LinkContainer to={`/products`}>
          <Button variant="primary">카테고리로 이동</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;