import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { ItemType } from "../types";
import styles from "../styles/Items.module.css";
import Button from "./Button";
import Modal from "./Modal";
import axios from "../utils/axios";
import { notify } from "../index";

function DeleteItemModal({
  item,
  setItems,
  deleteModalIsOpen,
  closeDeleteModal,
}: {
  item: ItemType;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  deleteModalIsOpen: boolean;
  closeDeleteModal: () => void;
}) {
  const handleDelete = async () => {
    console.log(item);

    try {
      await axios.delete(`/delete-item/${item._id}`);
      setItems((prev) => prev.filter((_item) => _item._id !== item._id));
      notify("Item has been deleted successfully", "success");
    } catch (error: any) {
      notify(error.message, "error");
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <Modal modalIsOpen={deleteModalIsOpen} closeModal={closeDeleteModal}>
      <div className={styles.modalInnerContainer}>
        <h4>Are you sure?</h4>
        <FontAwesomeIcon
          icon={faXmark}
          style={{
            position: "absolute",
            top: "7",
            right: "7",
            cursor: "pointer",
          }}
          onClick={closeDeleteModal}
        />
        <div className={styles.consent}>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={closeDeleteModal}>No</Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteItemModal;
