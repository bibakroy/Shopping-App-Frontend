import Button from "../components/Button";
import { useUserContext } from "../contexts/UserProvider";
import withAuth from "../HOC/withAuth";
import ItemList from "../components/ItemList";
import styles from "../styles/Home.module.css";

function Home() {
  const { user, logOut } = useUserContext();

  return (
    <div>
      <div className={styles.user}>
        <p>
          Welcome,{" "}
          <span
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            {user?.name}
          </span>
        </p>
        <Button
          onClick={logOut}
          style={{
            width: "5rem",
            height: "2rem",
          }}
        >
          Log out
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ItemList />
      </div>
    </div>
  );
}

export default withAuth(Home);
