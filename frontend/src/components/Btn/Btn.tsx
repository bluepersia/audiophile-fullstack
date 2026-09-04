import type { JSX, MouseEvent, PropsWithChildren } from "react";
import { Link } from "react-router";
import styles from "./Btn.module.scss";
import clsx from "clsx";

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
  ...restProps
}: BtnProps): JSX.Element {
  if (to)
    return (
      <Link to={to} className={clsx(styles.btn, className)} {...restProps}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        onClick={onClick}
        className={clsx(styles.btn, className)}
        {...restProps}
      >
        {children}
      </button>
    );

  return <></>;
}
