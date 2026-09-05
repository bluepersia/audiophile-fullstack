import type { JSX } from "react/jsx-runtime";
import Hero from "./Hero/Hero";
import Categories from "../../components/Categories/Categories";
import styles from "./Home.module.scss";
import ProductHighlights from "./ProductHighlights/ProductHighlights";
import AboutUs from "../../components/AboutUs/AboutUs";

export default function Home(): JSX.Element {
  return (
    <>
      <div className={styles.hero}>
        <Hero />
      </div>
      <div className={styles.categories}>
        <Categories />
      </div>
      <div className={styles.highlights}>
        <ProductHighlights />
      </div>
      <div className={styles.aboutUs}>
        <AboutUs />
      </div>
    </>
  );
}
