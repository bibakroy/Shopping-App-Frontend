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
      <p>{item.name}</p>
      <p>{new Date(item.created_at).toLocaleString()}</p>
      <p>
        <FontAwesomeIcon
          icon={faPenToSquare}
          fontSize={15}
          onClick={openEditModal}
          className={styles.icon}
        />
        <FontAwesomeIcon
          icon={faTrash}
          fontSize={15}
          onClick={openDeleteModal}
          className={styles.icon}
        />
      </p>
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
