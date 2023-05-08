import Button from "../components/Button";
import { useUserContext } from "../contexts/UserProvider";
import withAuth from "../HOC/withAuth";

function Home() {
  const { user, logOut, loading } = useUserContext();

  return (
    <div>
      <h1>Home</h1>
      <hr />
      <h2>Welcome "{user?.name}"</h2>
      <p>{loading ? "Loading" : "Not loading"}</p>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default withAuth(Home);
