import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Rating } from 'react-simple-star-rating';

import numberWithCommas from '@/utils/numberWithCommas';

// CSS
import * as S from './style';

interface ProductPreviewProps {
  images: any[];
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsNumber: number;
  productId: string;
}

const ProductPreview = ({
  images,
  name,
  description,
  price,
  rating,
  reviewsNumber,
  productId,
}: ProductPreviewProps) => {
  const [detailShow, setDetailShow] = useState(false);

  return (
    <S.ProductPreviewWrapper>
      <S.ProductPreviewImage crossOrigin="anonymous" src={images[0] ? images[0].path : ''} />
      <S.ProductPreviewInfo>
        <LinkContainer to={`/product-details/${productId}`}>
          <S.ProductTitle>{name}</S.ProductTitle>
        </LinkContainer>
        <S.ProductDescriptionToggle onClick={() => setDetailShow(prev => !prev)}>
          <span>상세정보 보기</span>{' '}
          {detailShow ? (
            <i className="bi bi-arrow-up-short" />
          ) : (
            <i className="bi bi-arrow-down-short" />
          )}
        </S.ProductDescriptionToggle>
        {detailShow && <Card.Text>{description}</Card.Text>}
        <S.InfoFooter>
          <div>
            <S.ProductPrice>{numberWithCommas(price)}원</S.ProductPrice>
            <S.ProductReviewRating>
              <i className="bi bi-star-fill" />
              {rating || 0} <span>리뷰{reviewsNumber || 0}</span>
            </S.ProductReviewRating>
          </div>
        </S.InfoFooter>
      </S.ProductPreviewInfo>
    </S.ProductPreviewWrapper>
  );
};

export default ProductPreview;
