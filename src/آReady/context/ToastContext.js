import { createContext, useState } from "react";
import MySnakBar from "../MySnakBar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnakBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};
