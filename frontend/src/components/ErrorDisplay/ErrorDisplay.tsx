import type { JSX } from "react/jsx-runtime";
import styles from "./ErrorDisplay.module.scss";
import Btn from "../Btn/Btn";

type ErrorDisplayProps = {
  message: string;
  retry?: () => void;
};

export default function ErrorDisplay({
  message,
  retry,
}: ErrorDisplayProps): JSX.Element {
  return (
    <div className={styles.errorDisplay}>
      <p className={styles.message}>{message}</p>
      {retry && <Btn onClick={retry}>Retry</Btn>}
    </div>
  );
}
