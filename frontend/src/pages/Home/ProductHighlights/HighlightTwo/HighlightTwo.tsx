import type { JSX } from "react/jsx-runtime";
import Btn from "../../../../components/Btn/Btn";
import { DESKTOP_BP, TABLET_BP } from "../../../../consts/breakpoints";
import { createProductLink } from "../../../../core/linkCreation";
import type { HighlightProps } from "../HighlightRenderer";
import styles from "./HighlightTwo.module.scss";
import clsx from "clsx";

export default function HighlightTwo({
  highlight,
  product,
}: HighlightProps): JSX.Element {
  return (
    <article className={styles.highlightTwo}>
      <h2 className={clsx(styles.title, "h4")}>
        {highlight.alias || product.name}
      </h2>
      <Btn
        color="transparent"
        to={createProductLink(product.slug)}
        aria-label={`View ${product.name}`}
      >
        See Product
      </Btn>
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
