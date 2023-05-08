import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import jwt_decode from "jwt-decode";

import axios from "../utils/axios";
import { UserType } from "../types";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  logOut: () => void;
};

const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: UserType = jwt_decode(token);

        setUser((prevUser) => ({
          ...prevUser,
          userId: decoded.userId,
          name: decoded.name,
          email: decoded.email,
        }));

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
