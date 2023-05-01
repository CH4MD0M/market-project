import React from 'react';

import ProductPreview from '../ProductPreview';

const ProductList = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <ProductPreview
          key={idx}
          images={['games', 'monitors', 'tablets', 'games', 'monitors']}
          idx={idx}
        />
      ))}
    </>
  );
};

export default ProductList;
