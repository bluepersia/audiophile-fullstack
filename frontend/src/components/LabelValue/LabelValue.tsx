import type { JSX } from "react/jsx-runtime";
import styles from "./LabelValue.module.scss";
import clsx from "clsx";

type LabelValueProps = {
  label: string;
  value: string;
  className?: string;
};
export default function LabelValue({
  label,
  value,
  className,
}: LabelValueProps): JSX.Element {
  return (
    <div className={clsx(styles.labelValue, className)}>
      <h3 className={styles.label}>{label}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
