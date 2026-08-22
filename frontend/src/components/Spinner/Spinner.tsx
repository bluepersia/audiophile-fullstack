import type { JSX } from "react/jsx-runtime";
import spinnerImg from "/src/assets/shared/desktop/spinner.svg";
import styles from "./Spinner.module.scss";

export default function Spinner(): JSX.Element {
  return <img src={spinnerImg} alt="Loading." className={styles.spinner} />;
}
