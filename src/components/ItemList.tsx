import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import axios from "../utils/axios";
import { ItemType } from "../types";
import styles from "../styles/Items.module.css";
import Item from "./Item";
import AddItemModal from "./AddItemModal";
import { useUserContext } from "../contexts/UserProvider";
import Button from "./Button";
import Input from "./Input";

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
    <div className={styles.itemListContainer}>
      <div className={styles.itemSearchAdd}>
        <div className={styles.search}>
          <label>Search Items</label>
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button
          onClick={() => {
            setSearchTerm("");
            openModal();
          }}
          style={{
            maxWidth: "9.5rem",
            height: "2.2rem",
            backgroundColor: "#bdcae2",
            color: "#000",
          }}
          onMouseOver={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.currentTarget.style.backgroundColor = "#a6b5d6";
          }}
          onMouseOut={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.currentTarget.style.backgroundColor = "#bdcae2";
          }}
        >
          Add A New Item{" "}
          <FontAwesomeIcon
            icon={faPlus}
            color="black"
            style={{ marginLeft: "0.5rem" }}
          />
        </Button>

        <AddItemModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setItems={setItems}
        />
      </div>

      <div className={styles.table}>
        <div className={styles.row}>
          <p>Name</p>
          <p>Created At</p>
          <p>Action</p>
        </div>
        {filteredItems.map((item) => (
          <Item key={item._id} item={item} setItems={setItems} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
