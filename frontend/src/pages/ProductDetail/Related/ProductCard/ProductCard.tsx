import type { JSX } from "react/jsx-runtime";
import styles from "./ProductCard.module.scss";
import { DESKTOP_BP, TABLET_BP } from "../../../../consts/breakpoints";
import Btn from "../../../../components/Btn/Btn";
import { createProductLink } from "../../../../core/linkCreation";
import clsx from "clsx";

type ProductCardProps = {
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  alt: string;
  name: string;
  slug: string;
};
export default function ProductCard({
  image,
  alt,
  name,
  slug,
}: ProductCardProps): JSX.Element {
  return (
    <div className={styles.productCard}>
      <h3 className={clsx(styles.title, "h5")}>{name}</h3>
      <picture className={styles.picture}>
        <source srcSet={image.desktop} media={`(min-width:${DESKTOP_BP}px)`} />
        <source srcSet={image.tablet} media={`(min-width:${TABLET_BP}px)`} />
        <img src={image.mobile} alt={alt} className={styles.img} />
      </picture>
      <Btn
        to={createProductLink(slug)}
        className={styles.btn}
        aria-label={`View ${name}`}
      >
        See Product
      </Btn>
    </div>
  );
}
