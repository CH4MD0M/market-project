import React, { useEffect, useState } from 'react';

import ProductPreview from '../ProductPreview';
import { getAllProducts } from '@utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.products))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {products.map(product => (
        <ProductPreview
          key={product._id}
          images={product.images}
          name={product.name}
          description={product.description}
          price={product.price}
          rating={product.rating}
          reviewsNumber={product.reviewsNumber}
          productId={product._id}
        />
      ))}
    </>
  );
};

export default ProductList;
