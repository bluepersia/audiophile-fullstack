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
    <div
      aria-labelledby="related-products-title"
      className={clsx(styles.related, "container")}
    >
      <h2 id="related-products-title" className={styles.title}>
        You may also like
      </h2>
      <ul className={clsx(styles.list, "resetList")}>
        {product.others.map((other) => (
          <li key={other.slug} className={styles.item}>
            <ProductCard {...other} />
          </li>
        ))}
      </ul>
    </div>
  );
}
