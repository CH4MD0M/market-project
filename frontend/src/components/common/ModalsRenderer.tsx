import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from '@hooks/reduxHooks';

const ModalsRenderer = () => {
  const openedModalList = useAppSelector(state => state.modal.openedModal, shallowEqual);

  const renderModal = Object.entries(openedModalList).map(openedModal => {
    const [modalType, { modalComponent }] = openedModal;
    return <Fragment key={modalType}>{modalComponent}</Fragment>;
  });

  return createPortal(<>{renderModal}</>, document.getElementById('modal') as Element);
};

export default ModalsRenderer;
