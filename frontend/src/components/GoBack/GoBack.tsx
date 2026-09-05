import { useNavigate } from "react-router";
import type { JSX } from "react/jsx-runtime";
import styles from "./GoBack.module.scss";

export default function GoBack(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles.goBack}>
      <button onClick={() => navigate(-1)} className={styles.btn}>
        Go Back
      </button>
    </div>
  );
}
