import type { JSX } from "react/jsx-runtime";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import SiteInfo from "./SiteInfo/SiteInfo";
import styles from "./Footer.module.scss";
import clsx from "clsx";
import SocialMedia from "./SocialMedia/SocialMedia";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.inner, "container")}>
        <Logo className={styles.logo} />
        <Nav
          className={styles.nav}
          listClassName={styles.navList}
          variant="footer"
        />
        <SiteInfo
          descClassName={styles.desc}
          coprightClassName={styles.copyright}
        />
        <SocialMedia className={styles.socialMedia} />
      </div>
    </footer>
  );
}
