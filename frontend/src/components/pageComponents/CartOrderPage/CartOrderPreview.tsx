import { useAppDispatch } from '@hooks/reduxHooks';
import { removeFromCart, updateCart } from '@redux/modules/cartSlice';
import addCommasToNumber from '@utils/addCommasToNumber';

import Button from '@components/atoms/Button';
import QuantityInput from '@components/pageComponents/CartOrderPage/QuantityInput';
import { TrashIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';

interface ItemPreviewProps {
  item: OrderProduct;
  isPurchasePage?: boolean;
}

const ItemPreview = ({ item, isPurchasePage }: ItemPreviewProps) => {
  const { _id, quantity, count, image, name, price } = item;
  const dispatch = useAppDispatch();

  // Quantity change handler
  const incrementQuantity = () => {
    dispatch(updateCart({ ...item, quantity: Math.min(quantity + 1, count) }));
  };
  const decrementQuantity = () => {
    dispatch(updateCart({ ...item, quantity: Math.max(1, quantity - 1) }));
  };
  const quantityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    const updatedQuantity = Math.min(Math.max(1, newQuantity), count);
    dispatch(updateCart({ ...item, quantity: updatedQuantity }));
  };

  // Remove cart item handler
  const removeCartItemHandler = () => {
    dispatch(removeFromCart({ productId: _id }));
  };

  return (
    <div className="grid md:grid-cols-[25%_1fr] items-center mb-[40px]">
      <div>
        <img src={image.path} alt={name} className="w-[150px] h-[150px]" />
      </div>
      <div className="grid lg:grid-cols-[1fr_25%] lg:gap-[20px] md:ml-[30px] lg:ml-0">
        <div className="flex flex-col mt-[20px] lg:mt-0">
          <span className="block">{name}</span>
          <span className="block flex-shrink-0 text-[25px] mt-[10px] font-semibold">
            {addCommasToNumber(price)}원
          </span>
        </div>
        <div className="mt-[20px] lg:mt-0 grid grid-cols-[1fr_20%] lg:grid-cols-none gap-[10px] items-center">
          <QuantityInput
            qunatityValue={quantity}
            maxQuantity={count}
            onDecrement={decrementQuantity}
            onIncrement={incrementQuantity}
            onChange={quantityChangeHandler}
            isPurchasePage={isPurchasePage}
          />
          {!isPurchasePage && (
            <Button variant="default" hovercolor="default" onClick={removeCartItemHandler}>
              <TrashIcon width={20} height={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

interface ItemPreviewContainerProps {
  itemList: OrderProduct[];
  isPurchasePage?: boolean;
}
const ItemPreviewContainer = ({ itemList, isPurchasePage }: ItemPreviewContainerProps) => {
  return (
    <ul>
      {itemList?.map(item => (
        <ItemPreview item={item} key={item._id} isPurchasePage={isPurchasePage} />
      ))}
    </ul>
  );
};

export default memo(ItemPreviewContainer);
