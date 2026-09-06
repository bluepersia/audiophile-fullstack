import type { JSX } from "react/jsx-runtime";
import styles from "./FieldGroup.module.scss";
import { useId, type ChangeEvent } from "react";
import clsx from "clsx";

type FieldGroupProps = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  capitalizeLabel?: boolean;
  className?: string;
};

export default function FieldGroup({
  name,
  label,
  type,
  placeholder,
  value,
  error,
  handleChange,
  maxLength,
  inputMode,
  capitalizeLabel = true,
  className,
}: FieldGroupProps): JSX.Element {
  const id = useId();

  const hasError = !!error;

  return (
    <div
      className={clsx(
        styles.fieldGroup,
        hasError && styles["fieldGroup--error"],
        className,
      )}
    >
      <div className={styles.top}>
        <label
          htmlFor={id}
          className={clsx(styles.label, capitalizeLabel && styles.capitalize)}
        >
          {label}
        </label>
        <p className={styles.error}>{error}</p>
      </div>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        className={styles.input}
        onChange={handleChange}
        maxLength={maxLength}
        inputMode={inputMode}
      />
    </div>
  );
}
