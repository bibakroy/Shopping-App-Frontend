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
      <h3>Are you sure?</h3>
      <button
        className={styles.button}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "0.5rem",
        }}
        onClick={closeDeleteModal}
        type="button"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <Button onClick={handleDelete}>Delete</Button>
    </Modal>
  );
}

export default DeleteItemModal;
