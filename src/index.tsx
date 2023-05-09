import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import { UserContextProvider } from "./contexts/UserProvider";

type ToastType = "info" | "success" | "warning" | "error" | "default";

export const notify = (message: string, type: ToastType) =>
  toast(message, { type, theme: "dark", position: "bottom-left" });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
      <ToastContainer />
    </UserContextProvider>
  </React.StrictMode>
);
