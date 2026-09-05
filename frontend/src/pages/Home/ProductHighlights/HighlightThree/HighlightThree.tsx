import type { JSX } from "react/jsx-runtime";
import type { HighlightProps } from "../HighlightRenderer";
import styles from "./HighlightThree.module.scss";
import Btn from "../../../../components/Btn/Btn";
import { createProductLink } from "../../../../core/linkCreation";
import { DESKTOP_BP, TABLET_BP } from "../../../../consts/breakpoints";
import clsx from "clsx";

export default function HighlightThree({
  highlight,
  product,
}: HighlightProps): JSX.Element {
  return (
    <article className={styles.highlightThree}>
      <div className={styles.content}>
        <h2 className={clsx(styles.title, "h4")}>
          {highlight.alias || product.name}
        </h2>
        <Btn
          to={createProductLink(product.slug)}
          color="transparent"
          aria-label={`View ${product.name}`}
          className={styles.btn}
        >
          See Product
        </Btn>
      </div>
      <picture className={styles.picture}>
        <source
          srcSet={highlight.image.desktop}
          media={`(min-width:${DESKTOP_BP}px)`}
        />
        <source
          srcSet={highlight.image.tablet}
          media={`(min-width:${TABLET_BP}px)`}
        />
        <img
          src={highlight.image.mobile}
          alt={highlight.alt}
          className={styles.img}
        />
      </picture>
    </article>
  );
}
