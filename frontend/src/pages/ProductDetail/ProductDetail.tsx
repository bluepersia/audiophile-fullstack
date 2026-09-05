import type { JSX } from "react/jsx-runtime";
import GoBack from "../../components/GoBack/GoBack";
import Details from "./Details/Details";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, type ProductData } from "../../api/products";
import ProgQuery from "../../components/ProgQuery/ProgQuery";
import styles from "./ProductDetail.module.scss";

export default function ProductDetail(): JSX.Element {
  const { slug } = useParams();

  const productQuery = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
  });

  return (
    <ProgQuery
      queries={[productQuery]}
      outer={(content) => (
        <div className="container">
          <GoBack />
          <article>{content}</article>
        </div>
      )}
    >
      {(product: ProductData) => (
        <>
          <div className={styles.details}>
            <Details product={product} />
          </div>
        </>
      )}
    </ProgQuery>
  );
}
