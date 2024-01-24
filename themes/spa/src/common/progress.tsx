import Modal from 'react-modal';
import customStyles from './ModalStyles';

function Progress({ loadingModalIsOpen }: { loadingModalIsOpen: boolean }) {
  return (
    <Modal ariaHideApp={false} isOpen={loadingModalIsOpen} style={customStyles}>
      <progress></progress>
    </Modal>
  );
}

export default Progress;
