import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useModal } from '@hooks/useModal';
import addCommasToNumber from '@utils/addCommasToNumber';

import Button from '@components/atoms/Button';
import ReviewModal from '@components/Modal/ReviewModal';

interface OrderProductPreviewProps {
  orderProductData: OrderProduct;
}

const OrderProductPreview = ({ orderProductData }: OrderProductPreviewProps) => {
  const { _id: productId, name, quantity, price, image, isReviewed } = orderProductData;
  const { openModal } = useModal();

  const reviewButtonHandler = () => {
    openModal({
      modalType: 'CREATE_REVIEW',
      modalComponent: <ReviewModal productId={productId} />,
    });
  };

  return (
    <div className="flex gap-3 p-3 border bg-white mt-4 rounded-lg border-solid border-[rgb(238,238,238)]">
      <div>
        <LazyLoadImage src={image.path} effect="blur" width={120} height={120} />
      </div>
      <div className="grid grid-cols-[1fr_30%] ml-5 w-full pt-4">
        <div>
          <span className="block mb-2 text-[18px]">{name}</span>
          <div className="w-full flex text-[rgb(85,85,85)] items-center justify-start">
            <span>{addCommasToNumber(price)}원</span>
            <span className="relative inline-flex justify-center items-center w-0.5 h-[1em] align-middle mx-2">
              <span className="w-0.5 h-0.5 bg-[rgb(17,17,17)] opacity-20 rounded-[50%]"></span>
            </span>
            <span>{quantity} 개</span>
          </div>
        </div>

        <Button
          disabled={isReviewed}
          onClick={reviewButtonHandler}
          hovercolor="default"
          className="w-fit h-fit md:py-3 md:px-10 justify-self-end text-[14px] hover:bg-[rgb(155,201,232)] hover:text-white"
        >
          리뷰 작성하기
        </Button>
      </div>
    </div>
  );
};

export default OrderProductPreview;
