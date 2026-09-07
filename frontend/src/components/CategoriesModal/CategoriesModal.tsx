import type { JSX } from "react/jsx-runtime";
import Categories from "../Categories/Categories";
import styles from "./CategoriesModal.module.scss";
import { useContext, useSyncExternalStore } from "react";
import { ModalContext } from "../../contexts/ModalContext/ModalContext";

export default function CategoriesModal(): JSX.Element {
  const modalContext = useContext(ModalContext);

  const windowWidth = useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => window.innerWidth,
  );

  if (windowWidth >= 1200) {
    modalContext?.closeModal();
  }
  return (
    <div className={styles.categoriesModal}>
      <Categories />
    </div>
  );
}
