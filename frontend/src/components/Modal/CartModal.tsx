import { Link } from 'react-router-dom';

import { useModal } from '@hooks/useModal';
import Modal from '@components/atoms/Modal';
import Button from '@components/atoms/Button';

const CartModal = () => {
  const { closeModal } = useModal();

  return (
    <Modal modalType="ADD_CART">
      <span className="text-[20px]">장바구니에 상품이 추가되었습니다.</span>
      <div className="grid grid-cols-[repeat(2,1fr)] gap-2 mt-5">
        <Link to="/cart">
          <Button
            variant="default"
            size="full"
            hovercolor="default"
            onClick={() => closeModal('ADD_CART')}
          >
            장바구니 이동
          </Button>
        </Link>
        <Button
          variant="primary"
          size="full"
          className="bg-[#b06ab3]"
          onClick={() => closeModal('ADD_CART')}
        >
          쇼핑 계속하기
        </Button>
      </div>
    </Modal>
  );
};

export default CartModal;
