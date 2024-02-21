import { memo } from 'react';
import { Link } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import addCommasToNumber from '@utils/addCommasToNumber';
import HoverCard from '@components/atoms/HoverCard';

interface ProductItemPreviewProps {
  product: Product;
}

const ProductItemPreview = ({ product }: ProductItemPreviewProps) => {
  const { images, name, description, price, rating, reviewsNumber, _id: productId } = product;

  return (
    <div className="flex px-3 my-[30px] gap-[25px]">
      <div className="min-w-[180px] min-h-[180px] overflow-hidden rounded-xl z-10">
        <LazyLoadImage src={images[0]?.path} alt={name} effect="blur" width={180} height={180} />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <Link to={`/product-details/${productId}`}>
            <span className="text-[20px]">{name}</span>
          </Link>

          <HoverCard
            logo={<InformationCircleIcon width={20} height={20} />}
            title="상세정보"
            description={description}
            direction="bottom"
          />
        </div>

        <div>
          <div>
            <span className="font-bold text-[25px]">{addCommasToNumber(price)}원</span>
            <div className="flex items-center gap-2 text-neutral-400">
              <p className="flex items-center text-black">
                <StarIcon width={20} height={20} className="mr-1" fill="#4565cc" />
                {rating || 0}
              </p>
              리뷰 {reviewsNumber || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItemPreview);
