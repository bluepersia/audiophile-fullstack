import type { JSX } from "react/jsx-runtime";
import MenuBtn from "./MenuBtn/MenuBtn";
import styles from "./Header.module.scss";
import clsx from "clsx";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import CartBtn from "./CartBtn/CartBtn";

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
