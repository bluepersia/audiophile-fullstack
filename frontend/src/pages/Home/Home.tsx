import type { JSX } from "react/jsx-runtime";
import Hero from "./Hero/Hero";
import styles from "./Home.module.scss";
import Categories from "../../components/Categories/Categories";

export default function Home(): JSX.Element {
  return (
    <>
      <div className={styles.hero}>
        <Hero />
      </div>
      <div className={styles.categories}>
        <Categories />
      </div>
    </>
  );
}
