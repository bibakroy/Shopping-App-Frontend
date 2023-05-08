import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

import { ItemType } from "../types";
import styles from "../styles/Items.module.css";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";

function Item({
  item,
  setItems,
}: {
  item: ItemType;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) {
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
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
        <button className={styles.button} onClick={openEditModal}>
          <FontAwesomeIcon icon={faPenToSquare} fontSize={16} />
        </button>
        <button className={styles.button} onClick={openDeleteModal}>
          <FontAwesomeIcon icon={faTrash} fontSize={16} />
        </button>
      </div>
      <EditItemModal
        item={item}
        setItems={setItems}
        editModalIsOpen={editModalIsOpen}
        closeEditModal={closeEditModal}
      />
      <DeleteItemModal
        item={item}
        setItems={setItems}
        deleteModalIsOpen={deleteModalIsOpen}
        closeDeleteModal={closeDeleteModal}
      />
    </div>
  );
}

export default React.memo(Item);
