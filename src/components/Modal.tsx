import { ReactNode } from "react";
import Modal from "react-modal";

function CustomModal({
  modalIsOpen,
  closeModal,
  children,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;

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
