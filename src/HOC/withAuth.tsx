import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/UserProvider";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading, setLoading } = useUserContext();

    useEffect(() => {
      const pathname = location.pathname;

      if (
        !loading &&
        !user &&
        pathname !== "/register" &&
        pathname !== "/login"
      ) {
        return navigate("/login");
      }
      setLoading(false);
    }, [user, loading, navigate, location.pathname, setLoading]);

    if (loading) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
