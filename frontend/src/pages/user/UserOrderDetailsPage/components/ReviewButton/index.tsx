import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import ReviewComponent from '../ReviewComponent';

// CSS
import * as S from './style';

interface ReviewButtonProps {
  productId: string;
  disabled: boolean;
}

const ReviewButton = ({ productId, disabled }: ReviewButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  return (
    <S.ButtonWrapper>
      <Button
        className="mb-2"
        type="button"
        size="sm"
        disabled={!disabled}
        variant="info"
        style={{ color: 'white' }}
        onClick={openModalHandler}
      >
        리뷰 작성하기
      </Button>

      {modalOpen && <ReviewComponent productId={productId} setModalOpen={setModalOpen} />}

      <LinkContainer to="/user/service">
        <Button type="button" size="sm" variant="outline-info">
          문의하기
        </Button>
      </LinkContainer>
    </S.ButtonWrapper>
  );
};

export default ReviewButton;
