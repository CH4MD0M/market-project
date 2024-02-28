import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useModal } from '@hooks/useModal';
import { postReview } from '@utils/api';
import { reviewSchema, ReviewSchemaType } from '@schemas/reviewSchema';

import Modal from '@components/atoms/Modal';
import Button from '@components/atoms/Button';

interface ReviewModalProps {
  productId: string;
}

const ReviewModal = ({ productId }: ReviewModalProps) => {
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
  });

  const createReviewHandler: SubmitHandler<ReviewSchemaType> = async data => {
    const response = await postReview(productId, data);
    if (response.status === 200) {
      closeModal('CREATE_REVIEW');
      // refresh the page for disabling the review button
      window.location.reload();
    }
  };
  return (
    <Modal modalType="CREATE_REVIEW">
      <h1 className="text-[20px] mb-[10px]">리뷰 작성하기</h1>
      <form className="flex flex-col gap-y-7" onSubmit={handleSubmit(createReviewHandler)}>
        <div>
          <textarea {...register('comment')} className="border min-h-[200px] px-2 w-full" />
        </div>
        <div>
          <select {...register('rating')} className="border py-2 w-full">
            <option value="">별점</option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            <option value="4">⭐️⭐️⭐️⭐️</option>
            <option value="3">⭐️⭐️⭐️</option>
            <option value="2">⭐️⭐️</option>
            <option value="1">⭐️</option>
          </select>
        </div>
        <Button
          disabled={!isDirty || !isValid}
          type="submit"
          size="full"
          className="bg-[#b06ab3] text-white py-3"
        >
          리뷰 작성하기
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
