import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { useModal } from '@hooks/useModal';
import { useAppDispatch } from '@hooks/reduxHooks';
import { addToCart } from '@redux/modules/cartSlice';
import { getSingleProduct } from '@utils/api';
import addCommasToNumber from '@utils/addCommasToNumber';

import LoadingPage from '@pages/LoadingPage';

import CenterWrapper from '@components/atoms/CenterWrapper';
import Button from '@components/atoms/Button';
import CartModal from '@/components/Modal/CartModal';
import ProductDetailImage from '@components/pageComponents/ProductDetailPage/ProductDetailImage';
import ProductReview from '@components/pageComponents/ProductDetailPage/ProductReview';
import QuantityInput from '@components/pageComponents/CartOrderPage/QuantityInput';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);

  // Add to cart handler
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product!, quantity }));
    openModal({ modalType: 'ADD_CART', modalComponent: <CartModal /> });
  };

  // Quantity change handler
  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // 최소값을 1로 제한
  };
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const quantityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) setQuantity(newValue);
    else if (newValue < 1) setQuantity(1); // 입력 값이 1보다 작은 경우, quantity를 1로 설정
  };

  useEffect(() => {
    getSingleProduct(id!).then(({ data }) => {
      setProduct(data);
      setIsProductLoading(false);
    });
  }, [id]);

  if (isProductLoading) return <LoadingPage />;

  return (
    <CenterWrapper size="lg" className="px-[40px]">
      <section className="grid mt-[100px] md:grid-cols-[repeat(2,1fr)] md:gap-[100px]">
        <ProductDetailImage imageList={product!.images} />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-[22px] mb-3 mt-10 md:mt-0">{product?.name}</h1>
            <span className="text-[30px] font-bold mb-1">
              {addCommasToNumber(product!.price)}원
            </span>
            <div className="flex items-center">
              <Rating
                readonly
                size={20}
                initialValue={product?.rating}
                SVGstyle={{ display: 'inline' }}
                fillColor="#4565cc"
              />
              <span className="text-[18px] text-[#4565cc] ml-1">
                ({product?.reviewsNumber || 0})
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-[20px] my-10 md:mt-0">
              <span className="block text-[18px] font-medium text-gray-900 min-w-fit">수량:</span>

              <QuantityInput
                qunatityValue={quantity}
                maxQuantity={product!.count}
                onDecrement={decrementQuantity}
                onIncrement={incrementQuantity}
                onChange={quantityChangeHandler}
              />
            </div>
            <div className="grid grid-cols-[repeat(2,1fr)] gap-2">
              <Button variant="default" hovercolor="default" onClick={addToCartHandler}>
                장바구니
              </Button>
              <Link
                to="/purchase"
                state={{ productId: id, isDirectPurchase: true, quantity: quantity }}
              >
                <Button variant="primary" size="full" className="bg-[#b06ab3]">
                  바로구매
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="mt-[30px] md:mt-[60px]" />
      {/* 상품 설명 */}
      <section className="my-[80px]">
        <h2 className="text-[30px] mt-10 mb-5">상품 상세 정보</h2>
        <p>{product?.description}</p>
      </section>

      <hr />
      {/* 리뷰 */}
      <section className="my-[80px]">
        <h2 className="text-[30px] mb-5">상품 리뷰</h2>
        <ProductReview productReviewList={product?.reviews} />
      </section>
    </CenterWrapper>
  );
};

export default ProductDetailPage;
