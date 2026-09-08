import { useContext } from "react";
import type { JSX } from "react/jsx-runtime";
import { ToastContext } from "../../contexts/ToastContext/ToastContext";
import styles from "./Toast.module.scss";
import clsx from "clsx";

export default function Toast(): JSX.Element {
  const toastContext = useContext(ToastContext);

  return (
    <p
      className={clsx(
        styles.toast,
        styles[`toast--${toastContext?.isVisible ? "visible" : "hidden"}`],
      )}
    >
      {toastContext?.message}
    </p>
  );
}
