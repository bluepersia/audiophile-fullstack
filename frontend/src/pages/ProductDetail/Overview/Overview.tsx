import type { JSX } from "react/jsx-runtime";
import type { ProductData } from "../../../api/products";
import styles from "./Overview.module.scss";
import clsx from "clsx";
import useInView from "../../../hooks/useInView";

type OverviewProps = {
  product: ProductData;
};
export default function Overview({ product }: OverviewProps): JSX.Element {
  const [overviewRef, isVisible] = useInView<HTMLDivElement>();

  return (
    <div
      ref={overviewRef}
      className={clsx(
        styles.overview,
        "container",
        "animatedBase",
        isVisible && "animatedVisible",
      )}
    >
      <section aria-labelledby="features-title" className={styles.features}>
        <h2 id="features-title" className={styles.title}>
          Features
        </h2>
        <p className={styles.featuresText}>{product.features}</p>
      </section>
      <section aria-labelledby="in-the-box-title" className={styles.inTheBox}>
        <h2 id="in-the-box-title" className={styles.title}>
          In The Box
        </h2>
        <ul className={clsx(styles.boxList, "resetList")}>
          {product.includes.map((boxItem) => (
            <li key={boxItem.item} className={styles.boxItem}>
              <p className={styles.boxItemQuantity}>{boxItem.quantity}x</p>
              <p className={styles.boxItemName}>{boxItem.item}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
