import { createContext } from "react";
import type { ModalType } from "./ModalContext.types";

type ModalContextType = {
  currentModal: ModalType;
  toggleModal: (type: ModalType) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export { ModalContext };
