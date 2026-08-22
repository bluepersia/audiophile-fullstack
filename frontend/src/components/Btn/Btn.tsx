import clsx from "clsx";
import type { JSX, MouseEvent, PropsWithChildren } from "react";
import { Link } from "react-router";
import styles from "./Btn.module.scss";

type BtnProps = PropsWithChildren & {
  to?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function Btn({
  to,
  onClick,
  className,
  children,
  ...rest
}: BtnProps): JSX.Element {
  if (to)
    return (
      <Link to={to} className={clsx(styles.btn, className)} {...rest}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} className={clsx(styles.btn, className)} {...rest}>
      {children}
    </button>
  );
}
