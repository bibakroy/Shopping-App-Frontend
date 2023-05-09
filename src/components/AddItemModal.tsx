import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import axios from "../utils/axios";
import Modal from "./Modal";
import styles from "../styles/Items.module.css";
import { ItemType } from "../types";
import { notify } from "../index";
import Button from "./Button";
import Input from "./Input";

const AddItemModal = ({
  modalIsOpen,
  closeModal,
  setItems,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleClose = () => {
    setFormData({ name: "" });
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/add-item", formData);
      console.log(res.data);
      setItems((prev) => [res.data, ...prev]);
      notify("A new item has been added successfully", "success");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal modalIsOpen={modalIsOpen} closeModal={handleClose}>
      <div className={styles.modalInnerContainer}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "7",
            right: "7",
            cursor: "pointer",
          }}
        />
        <h3>New Item</h3>
        <form onSubmit={handleSubmit} className={styles.itemForm}>
          <label>Title</label>
          <Input
            placeholder="Add a title"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
          <Button type="submit">Add Item</Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddItemModal;
