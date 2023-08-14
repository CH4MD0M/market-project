import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { postReview } from '@utils/api';

// CSS
import * as S from './style';

interface ReviewComponentProps {
  productId: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewComponent = ({ productId, setModalOpen }: ReviewComponentProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const sendReviewHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as typeof e.target & {
      comment: { value: string };
      rating: { value: number };
    };

    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    try {
      const response = await postReview(productId, formInputs);
      console.log(response);
      if (response.status === 200) {
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handler = () => {
      if (!modalRef.current?.contains(event.target as Node)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <S.ModalContainer ref={modalRef}>
      <Form onSubmit={sendReviewHandler} className="d-flex align-items-center">
        <div className="w-100 me-5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>리뷰 작성</Form.Label>
            <Form.Control name="comment" required as="textarea" rows={3} />
          </Form.Group>
          <Form.Select name="rating" required aria-label="Default select example">
            <option value="">별점</option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            <option value="4">⭐️⭐️⭐️⭐️</option>
            <option value="3">⭐️⭐️⭐️</option>
            <option value="2">⭐️⭐️</option>
            <option value="1">⭐️</option>
          </Form.Select>
        </div>
        <Button
          type="submit"
          className="w-25"
          style={{
            height: '110px',
            background: 'transparent',
            color: '#0A58CA',
            border: '1px solid #0A58CA',
          }}
        >
          리뷰 등록
        </Button>
      </Form>
    </S.ModalContainer>
  );
};

export default ReviewComponent;
