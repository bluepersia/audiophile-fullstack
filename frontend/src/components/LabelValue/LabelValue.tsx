import type { JSX } from "react/jsx-runtime";
import styles from "./LabelValue.module.scss";
import clsx from "clsx";

type LabelValueProps = {
  label: string;
  value: string;
  valueColor?: "default" | "accent";
  className?: string;
};
export default function LabelValue({
  label,
  value,
  valueColor = "default",
  className,
}: LabelValueProps): JSX.Element {
  return (
    <div className={clsx(styles.labelValue, className)}>
      <h3 className={styles.label}>{label}</h3>
      <p className={clsx(styles.value, styles[`value--${valueColor}`])}>
        {value}
      </p>
    </div>
  );
}
