import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { removeFromCart } from '@redux/modules/cartSlice';
import { selectCartSubtotal } from '@redux/modules/cartSlice/selector';
import { postOrder, updateOrder } from '@utils/api';

export const useOrderHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(state => state.cart.cartItems);
  const cartSubtotal = useAppSelector(selectCartSubtotal);
  const [directOrderItem, setDirectOrderItem] = useState<OrderProduct>();

  const [orderItemList, setOrderItemList] = useState<OrderProduct[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const setDirectPurchaseItem = (item: OrderProduct) => {
    setDirectOrderItem(item);
  };

  // Order handler
  const orderHandler = async (isDirectPurchase: boolean = false) => {
    const orderData: OrderData = {
      orderTotal: {
        cartSubtotal: orderTotal,
      },
      cartItems: orderItemList,
    };

    try {
      const response = await postOrder(orderData);
      if (response.status === 201) {
        // only cart purchase will remove items from cart
        if (!isDirectPurchase) {
          orderItemList.forEach(({ _id }) => {
            dispatch(removeFromCart({ productId: _id }));
          });
        }
        updateOrder(response.data._id);
        navigate(`/user/my-orders/${response.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Prepare order item list
  useEffect(() => {
    if (directOrderItem) {
      setOrderItemList([directOrderItem]);
      setOrderTotal(directOrderItem.price * directOrderItem.quantity);
    } else {
      setOrderItemList(cartItems);
      setOrderTotal(cartSubtotal);
    }
  }, [directOrderItem, cartItems, cartSubtotal]);

  return { orderHandler, setDirectPurchaseItem, orderItemList, orderTotal };
};
