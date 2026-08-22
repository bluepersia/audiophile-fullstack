import { useQuery } from "@tanstack/react-query";
import { type JSX } from "react/jsx-runtime";
import getHomeHero from "../../../api/home-sections/home-hero";
import { getProductBySlug } from "../../../api/products";
import useProgQuery from "../../../hooks/useProgQuery";
import styles from "./Hero.module.scss";
import clsx from "clsx";
import NewProduct from "../../../components/NewProduct/NewProduct";
import Btn from "../../../components/Btn/Btn";
import { createProductLink } from "../../../utils/linkCreation";
import { BP_DESKTOP, BP_TABLET } from "../../../consts/breakpoints";

export default function Hero(): JSX.Element {
  const heroQuery = useQuery({ queryKey: ["home-hero"], queryFn: getHomeHero });
  const productSlug = heroQuery.data?.productSlug || "";
  const productQuery = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: heroQuery.isSuccess,
  });

  const { progQueryStatus, jsxToRender } = useProgQuery(
    renderProduct,
    heroQuery,
    productQuery,
  );

  function renderProduct() {
    const hero = heroQuery.data!;
    const product = productQuery.data!;
    return (
      <>
        <h1 id="hero-title" className={styles.title}>
          {product.name}
        </h1>
        <NewProduct isNew={product.new} className={styles.new} />
        <p className={styles.desc}>{hero.description}</p>
        <Btn
          aria-label={`View ${product.name}`}
          to={createProductLink(product.slug)}
          className={styles.btn}
        >
          See Product
        </Btn>

        <picture className={styles.picture}>
          <source
            srcSet={hero.image.desktop}
            media={`(min-width:${BP_DESKTOP}px)`}
          />
          <source
            srcSet={hero.image.tablet}
            media={`(min-width:${BP_TABLET}px)`}
          />
          <img src={hero.image.mobile} alt={hero.alt} className={styles.img} />
        </picture>
      </>
    );
  }

  return (
    <article aria-labelledby="hero-title" className={styles.hero}>
      <p className="srOnly" aria-live="polite">
        {progQueryStatus.type === "pending" ? "Loading hero." : ""}
      </p>
      <p className="srOnly" aria-live="polite">
        {progQueryStatus.type === "error" ? progQueryStatus.message : ""}
      </p>
      <div className={clsx(styles.inner, "container")}>{jsxToRender}</div>
    </article>
  );
}
