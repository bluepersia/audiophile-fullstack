import type { JSX } from "react/jsx-runtime";
import type { HighlightProps } from "../HighlightRenderer";
import styles from "./HighlightOne.module.scss";
import Btn from "../../../../components/Btn/Btn";
import { createProductLink } from "../../../../core/linkCreation";
import { DESKTOP_BP, TABLET_BP } from "../../../../consts/breakpoints";

export default function HighlightOne({
  highlight,
  product,
}: HighlightProps): JSX.Element {
  return (
    <article className={styles.highlightOne}>
      <div className={styles.content}>
        <h2 className={styles.title}>{highlight.alias || product.name}</h2>
        <p className={styles.desc}>{highlight.description}</p>
        <Btn
          to={createProductLink(product.slug)}
          color="black"
          className={styles.btn}
          aria-label={`View ${product.name}`}
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
