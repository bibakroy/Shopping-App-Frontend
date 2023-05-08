import React, { useState } from "react";
import axios from "../utils/axios";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Items.module.css";
import { ItemType } from "../types";
import { notify } from "../index";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/add-item", formData);
      console.log(res.data);
      setItems((prev) => [res.data, ...prev]);
      notify("A new item has been added successfully", "success");
      setFormData({ name: "" });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <div>
          <button
            className={styles.button}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              padding: "0.5rem",
            }}
            onClick={closeModal}
            type="button"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </Modal>
  );
};

export default AddItemModal;
