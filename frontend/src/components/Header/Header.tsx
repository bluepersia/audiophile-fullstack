import clsx from "clsx";
import type { JSX } from "react/jsx-runtime";
import styles from "./Header.module.scss";
import MenuBtn from "./MenuBtn/MenuBtn";
import Logo from "../Logo/Logo";
import CartBtn from "./CartBtn/CartBtn";
import Nav from "../Nav/Nav";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={clsx(styles.inner, "container")}>
        <MenuBtn className={styles.menuBtn} />
        <Logo className={styles.logo} />
        <Nav className={styles.nav} />
        <CartBtn />
      </div>
    </header>
  );
}
