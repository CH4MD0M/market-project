import React from 'react';
import { useParams } from 'react-router';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  return <div>ProductDetailPage</div>;
};

export default ProductDetailPage;
