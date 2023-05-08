import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import jwt_decode from "jwt-decode";

import { User } from "../types";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  logOut: () => void;
};

const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  console.log({ user, loading });

  const logOut = () => {
    setUser({} as User);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: User = jwt_decode(token);

        setUser((prevUser) => ({
          ...prevUser,
          userId: decoded.userId,
          name: decoded.name,
          email: decoded.email,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, logOut, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
