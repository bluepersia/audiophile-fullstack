import type { JSX } from "react/jsx-runtime";
import type { ProductData } from "../../../api/products";
import styles from "./Related.module.scss";
import ProductCard from "./ProductCard/ProductCard";
import clsx from "clsx";

type RelatedProps = {
  product: ProductData;
};
export default function Related({ product }: RelatedProps): JSX.Element {
  return (
    <section className={styles.related}>
      <h2 className={styles.title}>You may also like</h2>
      <ul className={clsx(styles.list, "resetList")}>
        {product.others.map((other) => (
          <li key={other.slug} className={styles.item}>
            <ProductCard {...other} />
          </li>
        ))}
      </ul>
    </section>
  );
}
