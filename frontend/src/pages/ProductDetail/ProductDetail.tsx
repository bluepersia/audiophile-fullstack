import type { JSX } from "react/jsx-runtime";
import GoBack from "../../components/GoBack/GoBack";
import Details from "./Details/Details";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, type ProductData } from "../../api/products";
import ProgQuery from "../../components/ProgQuery/ProgQuery";
import styles from "./ProductDetail.module.scss";
import Overview from "./Overview/Overview";
import Gallery from "./Gallery/Gallery";
import Related from "./Related/Related";
import Categories from "../../components/Categories/Categories";
import AboutUs from "../../components/AboutUs/AboutUs";

export default function ProductDetail(): JSX.Element {
  const { slug } = useParams();

  const productQuery = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
  });

  return (
    <ProgQuery
      queries={[productQuery]}
      outer={(content, queriesStatus) => (
        <>
          <p className="srOnly" aria-live="polite">
            {queriesStatus.type === "pending"
              ? "Loading product."
              : queriesStatus.type === "error"
                ? queriesStatus.message
                : ""}
          </p>
          <GoBack />
          <article className={styles.detail}>{content}</article>
        </>
      )}
    >
      {(product: ProductData) => (
        <>
          <div className={styles.details}>
            <Details product={product} />
          </div>
          <div className={styles.overview}>
            <Overview product={product} />
          </div>
          <div className={styles.gallery}>
            <Gallery product={product} />
          </div>
          <div className={styles.related}>
            <Related product={product} />
          </div>
          <div className={styles.categories}>
            <Categories />
          </div>
          <AboutUs />
        </>
      )}
    </ProgQuery>
  );
}
