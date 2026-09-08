import { createContext } from "react";

type ToastContextType = {
  message: string;
  isVisible: boolean;
  show: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export { ToastContext };
