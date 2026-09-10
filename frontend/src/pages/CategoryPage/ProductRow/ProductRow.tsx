import type { JSX } from "react/jsx-runtime";
import NewProduct from "../../../components/NewProduct/NewProduct";
import Btn from "../../../components/Btn/Btn";
import { DESKTOP_BP, TABLET_BP } from "../../../consts/breakpoints";
import styles from "./ProductRow.module.scss";
import { createProductLink } from "../../../core/linkCreation";
import clsx from "clsx";
import { useId } from "react";

type ProductRowProps = {
  name: string;
  desc: string;
  isNew: boolean;
  slug: string;

  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  alt: string;

  inverse: boolean;
};

export default function ProductRow({
  name,
  desc,
  isNew,
  slug,
  image,
  alt,
  inverse,
}: ProductRowProps): JSX.Element {
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      className={clsx(
        styles.productRow,
        inverse && styles["productRow--inverse"],
        "container",
      )}
    >
      <div className={styles.content}>
        <h2 id={titleId} className={styles.title}>
          {name}
        </h2>
        <p className={styles.desc}>{desc}</p>
        <NewProduct isNew={isNew} className={styles.new} />
        <Btn
          to={createProductLink(slug)}
          aria-label={`View ${name}`}
          className={styles.btn}
        >
          See Product
        </Btn>
      </div>
      <picture className={styles.picture}>
        <source srcSet={image.desktop} media={`(min-width:${DESKTOP_BP}px)`} />
        <source srcSet={image.tablet} media={`(min-width:${TABLET_BP}px)`} />
        <img src={image.mobile} alt={alt} className={styles.img} />
      </picture>
    </article>
  );
}
