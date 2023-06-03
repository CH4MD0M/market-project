import styled from 'styled-components';

export const ProductPreviewWrapper = styled.div`
  max-width: 900px;
  display: flex;
  gap: 20px;
  margin-bottom: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 20px 0 20px 10px;
`;

export const ProductPreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px !important;
`;

export const ProductPreviewInfo = styled.div`
  width: 100%;
  padding: 0 40px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductDescriptionToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: auto;
`;

export const ProductTitle = styled.h4`
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const InfoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-self: flex-end;
`;

export const ProductPrice = styled.p`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 7px;
`;

export const ProductReviewRating = styled.div`
  i {
    color: skyblue;
  }
  span {
    color: #9e9e9e;
  }
`;

// Skeleton style
export const SkeletonImage = styled.div`
  width: 200px;
  height: 200px;
  background-color: #f7f9fa;
`;
