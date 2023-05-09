import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { ItemType } from "../types";
import styles from "../styles/Items.module.css";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import axios from "../utils/axios";
import { notify } from "../index";

function EditItemModal({
  item,
  setItems,
  editModalIsOpen,
  closeEditModal,
}: {
  item: ItemType;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  editModalIsOpen: boolean;
  closeEditModal: () => void;
}) {
  const [updatedItem, setUpdatedItem] = useState<ItemType>(item);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`/update-item/${item._id}`, { name: updatedItem.name });
      setItems((prev) => {
        const index = prev.findIndex((item) => item._id === updatedItem._id);
        const newArray = [...prev];
        newArray[index] = updatedItem;
        return newArray;
      });

      notify("Item has been updated successfully", "success");
    } catch (error: any) {
      notify(error.message, "error");
    } finally {
      closeEditModal();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedItem({
      ...updatedItem,
      name: e.target.value,
    });
  };

  return (
    <Modal modalIsOpen={editModalIsOpen} closeModal={closeEditModal}>
      <div className={styles.modalInnerContainer}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={closeEditModal}
          style={{
            position: "absolute",
            top: "7",
            right: "7",
            cursor: "pointer",
          }}
        />
        <h3>Edit Item</h3>
        <form onSubmit={handleUpdate} className={styles.itemForm}>
          <label>Title</label>
          <Input
            placeholder="Edit the title"
            value={updatedItem.name}
            onChange={handleChange}
          />
          <Button type="submit">Update</Button>
        </form>
      </div>
    </Modal>
  );
}

export default EditItemModal;
