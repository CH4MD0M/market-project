import { useModal } from '@hooks/useModal';
import { ModalType } from '@redux/modules/modalSlice/types';

interface ModalProps {
  modalType: ModalType;
  children: React.ReactNode;
}

const Modal = ({ modalType, children }: ModalProps) => {
  const { closeModal } = useModal();
  return (
    <div>
      <div
        className="fixed w-full h-full p-4 left-0 top-0 bg-[hsla(0,40%,2%,0.4)]"
        onClick={() => closeModal(modalType)}
      />
      <div className="fixed -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
        <div className="w-[80vw] h-auto pt-10 p-4 bg-white rounded-xl md:w-[60vw] lg:w-[30vw]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
