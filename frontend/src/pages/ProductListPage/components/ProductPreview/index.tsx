import { memo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import numberWithCommas from '@utils/numberWithCommas';

// CSS
import * as S from './style';

interface ProductPreviewProps {
  product: Product;
}

const ProductPreview = ({ product }: ProductPreviewProps) => {
  const { images, name, description, price, rating, reviewsNumber, _id: productId } = product;
  const [detailShow, setDetailShow] = useState(false);

  return (
    <S.ProductPreviewWrapper>
      <LazyLoadImage src={images[0]?.path} alt={name} effect="blur" width="200px" height="200px" />
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

export default memo(ProductPreview);
