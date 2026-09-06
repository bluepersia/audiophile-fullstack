import { useContext } from "react";
import type { JSX } from "react/jsx-runtime";
import { ModalContext } from "../../contexts/ModalContext/ModalContext";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Modal.module.scss";
import Cart from "../Cart/Cart";

export default function Modal(): JSX.Element {
  const modalContext = useContext(ModalContext);

  function renderModal() {
    switch (modalContext?.currentModal?.type) {
      case "cart":
        return <Cart />;
    }
  }

  return (
    <Dialog.Root
      open={modalContext?.currentModal !== null}
      onOpenChange={(value) => {
        if (!value) modalContext?.closeModal();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}></Dialog.Overlay>
        <Dialog.Content className={styles.content}>
          {renderModal()}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
