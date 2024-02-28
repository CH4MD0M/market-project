export type ModalType = 'DELETE_PRODUCT' | 'DELETE_USER' | 'ADD_CART' | 'CREATE_REVIEW';

export interface ModalComponentType {
  modalComponent: React.ReactNode;
}

type OpenedModalType = {
  [key in ModalType]?: ModalComponentType;
};

export type ModalState = {
  openedModal: OpenedModalType;
};

export type OpenModalPayload = ModalComponentType & {
  modalType: ModalType;
};
