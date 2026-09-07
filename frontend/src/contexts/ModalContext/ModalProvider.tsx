import { useEffect, useState, type JSX, type PropsWithChildren } from "react";
import type { ModalType } from "./ModalContext.types";
import { ModalContext } from "./ModalContext";
import { useLocation } from "react-router";

export default function ModalProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const location = useLocation();
  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  useEffect(() => {
    closeModal();
  }, [location.pathname]);

  function toggleModal(type: ModalType) {
    if (currentModal?.type === type?.type) {
      setCurrentModal(null);
      return;
    }
    setCurrentModal(type);
  }

  function closeModal() {
    setCurrentModal(null);
  }
  return (
    <ModalContext.Provider value={{ currentModal, toggleModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
