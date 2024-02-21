import { Rating } from 'react-simple-star-rating';

interface ProductReviewProps {
  productReviewList?: ReviewData[];
}

const ProductReview = ({ productReviewList }: ProductReviewProps) => {
  return (
    <>
      {productReviewList?.length === 0 && <p>리뷰가 없습니다.</p>}
      <ul>
        {productReviewList?.map((review, idx) => (
          <li key={idx} className="mb-[30px]">
            {review.user.name} <br />
            <Rating
              readonly
              size={20}
              initialValue={review.rating}
              SVGstyle={{ display: 'inline' }}
            />
            <br />
            {review.createdAt?.substring(0, 10)} <br />
            {review.comment}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductReview;
