import type { JSX } from "react/jsx-runtime";
import type { ProductData } from "../../../api/products";
import styles from "./Overview.module.scss";
import clsx from "clsx";

type OverviewProps = {
  product: ProductData;
};
export default function Overview({ product }: OverviewProps): JSX.Element {
  return (
    <section className={clsx(styles.overview, "container")}>
      <div className={styles.features}>
        <h2 className={styles.title}>Features</h2>
        <p className={styles.featuresText}>{product.features}</p>
      </div>
      <div className={styles.inTheBox}>
        <h2 className={styles.title}>In The Box</h2>
        <ul className={clsx(styles.boxList, "resetList")}>
          {product.includes.map((boxItem) => (
            <li key={boxItem.item} className={styles.boxItem}>
              <p className={styles.boxItemQuantity}>{boxItem.quantity}x</p>
              <p className={styles.boxItemName}>{boxItem.item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
