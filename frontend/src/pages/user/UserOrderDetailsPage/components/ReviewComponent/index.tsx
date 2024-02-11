import { useEffect, useRef } from 'react';

import { postReview } from '@utils/api';

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

      if (response.status === 200) {
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handler = () => {
      // if (!modalRef.current?.contains(event.target as Node)) {
      //   setModalOpen(false);
      // }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="absolute bg-white w-3/5 h-[300px] border -translate-x-2/4 -translate-y-2/4 z-[999] p-12 rounded-[5px] border-solid border-black left-2/4 top-2/4"
    >
      <form onSubmit={sendReviewHandler} className="d-flex align-items-center">
        <div className="w-100 me-5">
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          </Form.Select> */}
        </div>
        <button
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
        </button>
      </form>
    </div>
  );
};

export default ReviewComponent;
