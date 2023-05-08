import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

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

  return (
    <Modal modalIsOpen={editModalIsOpen} closeModal={closeEditModal}>
      <h3>Update Item Title</h3>
      <button
        className={styles.button}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "0.5rem",
        }}
        onClick={closeEditModal}
        type="button"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <form onSubmit={handleUpdate}>
        <Input
          placeholder="Edit the title"
          value={updatedItem.name}
          onChange={(e) =>
            setUpdatedItem({
              ...updatedItem,
              name: e.target.value,
            })
          }
        />
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
}

export default EditItemModal;
