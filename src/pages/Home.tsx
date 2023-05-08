import Button from "../components/Button";
import { useUserContext } from "../contexts/UserProvider";
import withAuth from "../HOC/withAuth";
import ItemList from "../components/ItemList";

function Home() {
  const { user, logOut } = useUserContext();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "20px",
          gap: "1rem",
        }}
      >
        <p>Welcome, {user?.name}</p>
        <Button
          onClick={logOut}
          style={{
            width: "5rem",
            fontSize: "14px",
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
