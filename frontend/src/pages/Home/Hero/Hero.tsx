import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react/jsx-runtime";
import getHomeHero from "../../../api/home-sections/home-hero";
import { getProductBySlug, type ProductData } from "../../../api/products";
import ProgQuery from "../../../components/ProgQuery/ProgQuery";
import type { SectionData } from "../../../api/home-sections/home-sections.types";
import styles from "./Hero.module.scss";
import clsx from "clsx";
import NewProduct from "../../../components/NewProduct/NewProduct";
import Btn from "../../../components/Btn/Btn";
import { createProductLink } from "../../../core/linkCreation";
import { DESKTOP_BP, TABLET_BP } from "../../../consts/breakpoints";

export default function Hero(): JSX.Element {
  const heroQuery = useQuery({ queryKey: ["home-hero"], queryFn: getHomeHero });
  const productSlug = heroQuery.data?.productSlug || "";
  const productQuery = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: heroQuery.isSuccess,
  });

  return (
    <ProgQuery
      queries={[heroQuery, productQuery]}
      outer={(content, queriesStatus) => (
        <article className={styles.hero}>
          <p className="srOnly" aria-live="polite">
            {queriesStatus.type === "pending"
              ? "Loading hero."
              : queriesStatus.type === "error"
                ? queriesStatus.message
                : ""}
          </p>
          <div className={clsx(styles.inner, "container")}>{content}</div>
        </article>
      )}
    >
      {(hero: SectionData, product: ProductData) => (
        <>
          <div className={styles.content}>
            <h1 className={styles.title}>{hero.alias || product.name}</h1>
            <NewProduct isNew={product.new} className={styles.new} />
            <p className={styles.desc}>{hero.description}</p>
            <Btn
              to={createProductLink(product.slug)}
              className={styles.btn}
              aria-label={`View ${product.name}`}
            >
              See Product
            </Btn>
          </div>

          <picture className={styles.picture}>
            <source
              srcSet={hero.image.desktop}
              media={`(min-width:${DESKTOP_BP}px)`}
            />
            <source
              srcSet={hero.image.tablet}
              media={`(min-width:${TABLET_BP}px)`}
            />
            <img
              src={hero.image.mobile}
              alt={hero.alt}
              className={styles.img}
            />
          </picture>
        </>
      )}
    </ProgQuery>
  );
}
