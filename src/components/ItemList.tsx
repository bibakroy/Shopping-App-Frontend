import { useState, useEffect } from "react";

import axios from "../utils/axios";
import { ItemType } from "../types";
import styles from "../styles/Items.module.css";
import Item from "./Item";
import AddItemModal from "./AddItemModal";
import { useUserContext } from "../contexts/UserProvider";

const ItemList = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { user } = useUserContext();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await axios.get("/get-items");
        setItems(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getItems();
  }, [user]);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm]);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          onClick={() => {
            setSearchTerm("");
            openModal();
          }}
        >
          Add Item
        </button>
        <AddItemModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setItems={setItems}
        />
        <div className={styles.table}>
          <div className={styles.row}>
            <div>Name</div>
            <div>Created At</div>
            <div>Action</div>
          </div>
          {filteredItems.map((item) => (
            <Item key={item._id} item={item} setItems={setItems} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
