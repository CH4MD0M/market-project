import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import OrderProductPreview from './OrderProductPreview';

interface OrderPreviewProps {
  orderDetailsData: OrderDetailsData;
}

const OrderDetailsPreview = ({ orderDetailsData }: OrderPreviewProps) => {
  const { _id, createdAt, orderItems: orderProductList } = orderDetailsData;

  return (
    <div className="shadow-[rgba(0,0,0,0.08)_0px_2px_4px_0px,rgba(0,0,0,0.16)_0px_0px_1px_0px] bg-white mb-5 pt-6 pb-4 px-6 rounded-xl">
      <div className="flex justify-between mb-3">
        <div>
          <span className="text-[18px] font-semibold">
            {dayjs(createdAt).format('YYYY.MM.DD')} 주문
          </span>
        </div>

        <Link to={`/user/my-orders/${_id}`} className="flex items-center gap-1 text-[#4565cc]">
          주문 상세보기 <ArrowRightIcon width={18} height={18} />
        </Link>
      </div>
      <div className="mt-4">
        {orderProductList.map(orderProductData => (
          <OrderProductPreview key={orderProductData._id} orderProductData={orderProductData} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPreview;
