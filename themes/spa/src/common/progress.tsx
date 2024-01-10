import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Progress({ loadingModalIsOpen }: { loadingModalIsOpen: boolean }) {
  return (
    <Modal ariaHideApp={false} isOpen={loadingModalIsOpen} style={customStyles}>
      <progress></progress>
    </Modal>
  );
}

export default Progress;
