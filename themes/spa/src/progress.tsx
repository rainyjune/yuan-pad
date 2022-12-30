import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function Progress(props: any) {
  return (
    <Modal ariaHideApp={false} isOpen={props.loadingModalIsOpen} style={customStyles} >
      <progress></progress>
    </Modal>
  );
}

export default Progress;