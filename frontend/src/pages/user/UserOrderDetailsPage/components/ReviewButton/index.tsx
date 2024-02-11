import { useState } from 'react';
import { Link } from 'react-router-dom';

import ReviewComponent from '../ReviewComponent';

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
    <div className="flex flex-col items-start justify-center">
      <button
        className="mb-2"
        type="button"
        disabled={!disabled}
        style={{ color: 'white' }}
        onClick={openModalHandler}
      >
        리뷰 작성하기
      </button>

      {modalOpen && <ReviewComponent productId={productId} setModalOpen={setModalOpen} />}

      <Link to="/user/service">
        <button type="button">문의하기</button>
      </Link>
    </div>
  );
};

export default ReviewButton;
