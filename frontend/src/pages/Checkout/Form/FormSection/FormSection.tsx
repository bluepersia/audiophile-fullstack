import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import styles from "./FormSection.module.scss";

type FormSectionProps = PropsWithChildren & {
  title: string;
  childrenClassName?: string;
};

export default function FormSection({
  title,
  childrenClassName,
  children,
}: FormSectionProps): JSX.Element {
  return (
    <div className={styles.formSection}>
      <h3 className={styles.title}>{title}</h3>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
