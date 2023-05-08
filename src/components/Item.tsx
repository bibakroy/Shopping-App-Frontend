import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

import { ItemType } from "../types";
import styles from "../styles/Items.module.css";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import axios from "../utils/axios";
import { notify } from "../index";

function Item({
  item,
  setItems,
}: {
  item: ItemType;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) {
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [updatedItem, setUpdatedItem] = useState<ItemType>(item);

  console.log(item.name);

  const openUpdateModal = () => {
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

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
      closeUpdateModal();
    }
  };

  const handleDelete = async () => {
    console.log(item);

    try {
      await axios.delete(`/delete-item/${item._id}`);
      setItems((prev) => prev.filter((item) => item._id !== updatedItem._id));
      notify("Item has been deleted successfully", "success");
    } catch (error: any) {
      notify(error.message, "error");
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className={styles.row}>
      <div>{item.name}</div>
      <div>{new Date(item.created_at).toLocaleString()}</div>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
        }}
      >
        <button className={styles.button} onClick={openUpdateModal}>
          <FontAwesomeIcon icon={faPenToSquare} fontSize={16} />
        </button>
        <button className={styles.button} onClick={openDeleteModal}>
          <FontAwesomeIcon icon={faTrash} fontSize={16} />
        </button>
      </div>
      <Modal modalIsOpen={updateModalIsOpen} closeModal={closeUpdateModal}>
        <h3>Update Item Title</h3>
        <button
          className={styles.button}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "0.5rem",
          }}
          onClick={closeUpdateModal}
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
    </div>
  );
}

export default React.memo(Item);
