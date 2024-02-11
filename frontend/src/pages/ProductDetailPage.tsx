import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { useAppDispatch } from '@hooks/reduxHooks';
import { addToCart } from '@redux/modules/cartSlice';
import { getSingleProduct } from '@utils/api';
import addCommasToNumber from '@utils/addCommasToNumber';

import LoadingPage from '@pages/LoadingPage';
import CartMessage from './ProductDetailPage/components/CartMessage';
import ProductReview from './ProductDetailPage/components/ProductReview';
import CenterWrapper from '@components/atoms/CenterWrapper';
import Button from '@components/atoms/Button';
import ProductDetailImage from '@/components/ProductDetailImage';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [cartMessageShow, setCartMessageShow] = useState<boolean>(false);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);

  // Add to cart handler
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product!, quantity }));
    setCartMessageShow(true);
  };

  // Quantity change handler
  const quantityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    getSingleProduct(id!).then(({ data }) => {
      setProduct(data);
      setIsProductLoading(false);
    });
  }, [id]);

  if (isProductLoading) return <LoadingPage />;

  return (
    <CenterWrapper size="lg">
      <section className="flex justify-between flex-wrap mt-[50px] tablet:flex-col tablet:justify-center tablet:flex-1 mobile:px-10">
        <ProductDetailImage imageList={product!.images} />
        <div className="w-[500px] tablet:w-full tablet:mt-[30px] mobile:w-full mobile:mt-[30px]">
          <div>
            <h1 className="text-[22px]">{product?.name}</h1>
            <span className="text-[30px] font-bold">{addCommasToNumber(product!.price)}원</span>
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
          <div className="mt-[30px]">
            <div>수량</div>
            <div className="grid grid-cols-[repeat(2,1fr)] gap-1">
              <Button variant="primary">장바구니</Button>
              <Button variant="primary">바로구매</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 상품 설명 */}
      <section></section>

      {/* 리뷰 */}
      <section></section>
      <div className="container">
        <div className="mt-5">
          <div>
            <div>
              {/* 상품이름, 가격, 설명, 별점 */}
              <div>
                {/* <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product?.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={product?.rating} />(
                  {product?.reviewsNumber || 0})
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">{product?.price}</span>
                </ListGroup.Item>
                <ListGroup.Item>{product?.description}</ListGroup.Item>
              </ListGroup> */}
              </div>

              {/* 상품 상태, 상품 수량 */}
              <div>
                {/* <ListGroup>
                <ListGroup.Item>재고 상태: {`${product?.count}개 남음` || '품절'}</ListGroup.Item>
                <ListGroup.Item>
                  가격: <span className="fw-bold">{numberWithCommas(product?.price)}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  수량:
                  <Form.Select
                    value={quantity}
                    onChange={quantityChangeHandler}
                    size="lg"
                    aria-label="Default select example"
                  >
                    {[...Array(product?.count).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="w-100"
                    onClick={addToCartHandler}
                    type="button"
                    style={{ background: '#86CEEB', border: 'none' }}
                  >
                    장바구니
                  </Button>
                </ListGroup.Item>
              </ListGroup> */}
              </div>
            </div>

            {/* 리뷰 */}
          </div>
        </div>
      </div>
    </CenterWrapper>
  );
};

export default ProductDetailPage;
