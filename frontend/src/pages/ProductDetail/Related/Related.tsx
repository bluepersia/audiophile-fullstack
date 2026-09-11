import type { JSX } from "react/jsx-runtime";
import type { ProductData } from "../../../api/products";
import styles from "./Related.module.scss";
import ProductCard from "./ProductCard/ProductCard";
import clsx from "clsx";
import useInView from "../../../hooks/useInView";

type RelatedProps = {
  product: ProductData;
};
export default function Related({ product }: RelatedProps): JSX.Element {
  const [relatedRef, isVisible] = useInView();

  return (
    <section
      aria-labelledby="related-products-title"
      ref={relatedRef}
      className={clsx(
        styles.related,
        "container",
        "animatedBase",
        isVisible && "animatedVisible",
      )}
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
    </section>
  );
}
