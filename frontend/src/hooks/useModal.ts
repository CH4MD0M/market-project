import { useAppDispatch } from '@hooks/reduxHooks';
import { closeModal, openModal } from '@redux/modules/modalSlice';
import { ModalType, OpenModalPayload } from '@redux/modules/modalSlice/types';

export const useModal = () => {
  const dispatch = useAppDispatch();

  const handleOpenModal = ({ modalType, modalComponent }: OpenModalPayload) => {
    dispatch(openModal({ modalType, modalComponent }));
  };

  const handleCloseModal = (modalType: ModalType) => {
    dispatch(closeModal(modalType));
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
};
