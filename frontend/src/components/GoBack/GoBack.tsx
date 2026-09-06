import { useNavigate } from "react-router";
import type { JSX } from "react/jsx-runtime";
import styles from "./GoBack.module.scss";
import clsx from "clsx";

export default function GoBack(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={clsx(styles.goBack, "container")}>
      <button onClick={() => navigate(-1)} className={styles.btn}>
        Go Back
      </button>
    </div>
  );
}
