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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function toggleModal(type: ModalType) {
    if (currentModal?.type === type?.type) {
      closeModal();
      return;
    }
    setCurrentModal(type);
  }

  function closeModal() {
    setCurrentModal(null);
    if (currentModal?.onClose) {
      currentModal.onClose();
    }
  }

  function openModal(type: ModalType) {
    setCurrentModal(type);
  }
  return (
    <ModalContext.Provider
      value={{ currentModal, toggleModal, closeModal, openModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
