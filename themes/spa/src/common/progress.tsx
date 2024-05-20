import Modal from 'react-modal';
import customStyles from './ModalStyles';
import { ProgressProps } from './types';

function Progress({ loadingModalIsOpen }: ProgressProps) {
  return (
    <Modal ariaHideApp={false} isOpen={loadingModalIsOpen} style={customStyles}>
      <progress></progress>
    </Modal>
  );
}

export default Progress;
